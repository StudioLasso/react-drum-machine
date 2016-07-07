import { take, call, put, fork, select } from 'redux-saga/effects';
import { 
	fetchSongs, 
	loadAudioContext, 
	fetchSound,
	getWebAudioTime,
	playSound,
	waitTimer,
	initTimer,
	startTimer,
	stopTimer
} from '../services';
import * as actions from '../actions';
import { getSong, getStartTime, getStatus, getPausedTime, getInstrument } from './selectors';
import * as time from '../utils/time';

let lastDiv=-1;

export function* loadSound(instrument) {
	const buffer = yield call(fetchSound, instrument.sound, instrument.bearer);
	yield put(actions.soundLoaded({buffer, instrument}));
}

export function* loadSounds() {
	const song = yield select(getSong);
	yield song.instruments.filter(i => !i.disabled).map(i => call(loadSound, i));
}	

export function* getNotes(elapsedTime, aheadTime) {
	const song = yield select(getSong);
	const bitDuration = song.time / (song.bpm * song.time / 60 * song.divisionperbeat); 
	const startDiv = time.timeToDivision(song, elapsedTime);
	const endDiv = time.timeToDivision(song, elapsedTime+aheadTime);

	// Do not replay already listened notes
	if (startDiv <= lastDiv) {
		return [];
	}
	lastDiv = endDiv;

	return song.instruments.filter(i => !i.disabled).map(i => {
		const n = {
			bitDuration,
			offset: time.divisionToTime(song, startDiv) - elapsedTime,
			name: i.name,
			buffer: i.buffer,
			bits: i.bits.slice(startDiv, endDiv+1)
		};

		return n;
	});
}

export function* scheduleNotes(notes) {
	yield notes.map(function*(note) {
		yield note.bits.map(function* (bit, i) {
			if (bit) {
				return yield call(playSound, note.buffer, note.offset + i * note.bitDuration);				
			}
		});
	});
}

export function* runScheduler() {
	while (true) {
		yield call(waitTimer);
		let webAudioTime = yield call(getWebAudioTime);
		const startTime = yield select(getStartTime);
		const notes = yield getNotes(webAudioTime - startTime, 0.1);
		yield fork(scheduleNotes, notes);
	}
}

export function* watchInitSong() {
	while (true) {
		const { payload: song } = yield take('LOAD_SONG');
		yield put(actions.initSong({ song }));
		yield call(loadSounds);
		yield call(initTimer);
		yield fork(runScheduler);
		yield put(actions.songLoaded());		
	}
}

export function* watchDrumkitInit() {
	yield take('INIT_DRUMKIT');
	yield call(loadAudioContext);
}

export function* play() {
	while (true) {
		yield take('PLAY');
		const status = yield select(getStatus);
		const currentTime = yield call(getWebAudioTime);
		if (status === 'stop') {
			const notes = yield getNotes(0, 0.1);
			yield fork(scheduleNotes, notes);
			yield put(actions.setStartTime(currentTime));
		}
		else if (status === 'pause') {
			const pausedTime = yield select(getPausedTime);
			yield put(actions.setStartTime(currentTime - pausedTime));			
		}
		yield put(actions.setPlayerStatus('play'));
		yield call(startTimer);
	}
}

export function *pause() {
	while (true) {
		yield take('PAUSE');
		const status = yield select(getStatus);
		if (status !== 'play') {
			continue;
		}
		const currentTime = yield call(getWebAudioTime);
		const startTime = yield select(getStartTime);
		yield put(actions.setPlayerStatus('pause'));
		yield call(stopTimer);
		lastDiv = -1;
		yield put(actions.setPausedTime(currentTime - startTime));
	}
}

export function *stop() {
	while (true) {
		yield take('STOP');
		yield put(actions.setPlayerStatus('stop'));
		yield call(stopTimer);
		lastDiv = -1;
		yield put(actions.setPausedTime(0));
	}
}

export function *seek() {
	while (true) {
		const { payload : time } = yield take('CHANGE_TIME');
		const currentTime = yield call(getWebAudioTime);
		lastDiv = -1;
		const status = yield select(getStatus);
		if (status === 'play') {
			yield put(actions.setStartTime(currentTime - time));			
		}
		else if (status === 'stop' || status === 'pause') {
			status === 'stop' && (yield put(actions.setPlayerStatus('pause')));				
			yield put(actions.setPausedTime(time));
		}
	}
}

export function *watchControlPlayer() {
	yield take('SONG_LOADED');
	yield [
		fork(play),
		fork(pause),
		fork(stop),
		fork(seek)
	];
}

export function *changeBit() {
	while (true) {
		const { 
			payload: {
				bitIndex, 
				instrumentIndex
			}
		} = yield take('CHANGE_BIT');

		const i = yield select(getInstrument, instrumentIndex);
		if (!i.bits[bitIndex]) {
			yield call(playSound, i.buffer);
		}
		yield put(actions.bitChanged({
			bitIndex,
			instrumentIndex
		}));
	}
}

export function *copyPasteMeasure() {
	while (true) {
		const { payload: copyIndex } = yield take('COPY_MEASURE');
		const song = yield select(getSong);
		const startCopyIndex = copyIndex * song.beatpermeasure * song.divisionperbeat;
		const endCopyIndex = startCopyIndex + song.beatpermeasure * song.divisionperbeat;
		const copiedBits = song.instruments.map(i => {
			return i.bits.slice(startCopyIndex, endCopyIndex);
		});
		const { payload: pasteIndex } = yield take('PASTE_MEASURE');
		yield put(actions.measurePasted({
			bits: copiedBits,
			pasteIndex
		}));
	}
}

export function *watchEditInstruments() {
	yield take('SONG_LOADED');
	yield [
		fork(changeBit),
		fork(copyPasteMeasure)
	];
}

export default function *root() {
	yield [
		fork(watchDrumkitInit),
		fork(watchInitSong),
		fork(watchControlPlayer),
		fork(watchEditInstruments)
	];
}