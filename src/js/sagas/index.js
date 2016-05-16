import { take, call, cps, put, fork, select } from 'redux-saga/effects';
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
} from 'services';
import * as actions from 'actions';
import { getSong, getStartTime, getStatus, getPausedTime } from './selectors';
import * as time from '../utils/time';

let lastDiv=-1;

export function* loadSound(instrument) {
	const buffer = yield call(fetchSound, instrument.soundurl);
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

export function* watchDrumkitInit() {
	const { payload: { id } } = yield take('INIT_DRUMKIT');
	yield call(loadAudioContext);
	const songs = yield call(fetchSongs);
	yield put(actions.initSong({ song: songs[id] }));
	yield call(loadSounds);
	yield call(initTimer);
	yield fork(runScheduler);
	yield put(actions.songLoaded());
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

export function* watchControlPlayer() {
	yield take('SONG_LOADED');
	yield [
		fork(play),
		fork(pause),
		fork(stop),
		fork(seek)
	];
}

export default function* root() {

	yield [
		fork(watchDrumkitInit),
		fork(watchControlPlayer)
	];
}