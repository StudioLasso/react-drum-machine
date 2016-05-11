import { take, call, cps, put, fork, select } from 'redux-saga/effects';
import { fetchSongs, loadAudioContext, fetchSound } from 'services';
import * as actions from 'actions';
import { getSong } from './selectors';

export function* watchTest() {
	while(true) {
		const { data } = yield take('TEST');
		console.log('hey test');
	}
}

export function* loadSound(instrument) {
	const buffer = yield call(fetchSound, instrument.soundurl);
	yield put(actions.soundLoaded({buffer, instrument}));
}

export function* loadSounds() {
	const song = yield select(getSong);
	yield song.instruments.map(i => call(loadSound, i));
}

export function* watchDrumkitInit() {
	const { payload: { id } } = yield take('INIT_DRUMKIT');
	yield call(loadAudioContext);
	const songs = yield call(fetchSongs);
	yield put(actions.initSong({ song: songs[id] }));
	yield call(loadSounds)
	yield put(actions.songLoaded());
}	

export default function* root() {
	yield [
		fork(watchDrumkitInit),
		fork(watchTest)
	];
}