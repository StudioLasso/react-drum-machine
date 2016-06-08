import React from 'react';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux'

import Drumkit from './components/Drumkit';
import store from './store';
import * as actions from './actions';
import * as time from './utils/time';
import { getWebAudioTime } from './services';

export default class App extends React.Component {
	static getActions() {
		return bindActionCreators(actions, store.dispatch);
	}
	static getState() {
		return store.getState();
	}
	static subscribe(cb) {
		return store.subscribe(cb);
	}
	static getElapsedTime() {
		return time.getElapsedTime(store.getState().player, getWebAudioTime());
	}
	static getCurrentBeat() {
		const state = store.getState();
		return time.getCurrentBeat(state.player, state.song, getWebAudioTime());
	}
	static getCurrentDivision() {
		const state = store.getState();
		return time.getCurrentDivision(state.player, state.song, getWebAudioTime());
	}
	static elapsedTimeToSize() {
		const elapsedTime = time.getElapsedTime(store.getState().player, getWebAudioTime());
		const state = store.getState();
		return time.timeToSize(elapsedTime, state.player.width, state.song.time);
	}
	static sizeToTime(size) {
		const state = store.getState();
		return time.sizeToTime(size, state.player.width, state.song.time);
	}

	static getBitsOffset() {
		return Drumkit.getBitsOffset();
	}

	render() {
		return (
			<Provider store={store}>
				<Drumkit ref="drumkit" {...this.props} />
			</Provider>
		);
	}
}