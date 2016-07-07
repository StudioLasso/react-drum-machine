import React from 'react';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux'
import 'babel-polyfill';

import 'pubsub-js';

import Drumkit from './components/Drumkit';
import createStore from './store';
import * as actions from './actions';
import * as time from './utils/time';
import { getWebAudioTime } from './services';

export default class App extends React.Component {
	static propTypes = {
		onChange: React.PropTypes.func,
		onLoaded: React.PropTypes.func,
		divisionSize: React.PropTypes.number,
		song: React.PropTypes.object,
		id: React.PropTypes.string
	};
	static defaultProps = {
		onChange: () => true,
		onLoaded: () => true,
		divisionSize: 20,
		song: null,
		id: null
	};

	constructor(props) {
		super(props);

		this.store = createStore();

		this.store.dispatch(actions.setDivisionSize(this.props.divisionSize));
		this.store.subscribe(() => {
			props.onChange(this.store.getState());
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.song !== this.props.song) {
			if (nextProps.song) {
				this.store.dispatch(actions.loadSong(nextProps.song));
			}
		}
	}

	componentDidMount() {
		this.store.dispatch(actions.initDrumkit());

		if (this.props.song) {
			this.store.dispatch(actions.loadSong(this.props.song));
		}

		this.props.onLoaded(
			this.getState(),
			this.getActions(),
			this.getInfoAPI());

		const dispatchAction = (m,d) => {
			if (d.action && typeof actions[d.action] === 'function') {
				this.store.dispatch(actions[d.action](d.args));
			} 
		};

		PubSub.subscribe('drum', dispatchAction);
		if (this.props.id) {
			PubSub.subscribe(`${this.props.id}`, dispatchAction);			
		}
	}

	componentWillUnmount() {
		PubSub.unsubscribe('drum');
		if (this.props.id) {
			PubSub.unsubscribe(`${this.props.id}`);			
		}
	}

	static getInitialState() {
		return createStore().getState();
	}

	static getInitialActions() {
		return actions;
	}

	getInfoAPI() {
		return {
			getElapsedTime: this.getElapsedTime.bind(this),
			getCurrentBeat: this.getCurrentBeat.bind(this),
			getCurrentDivision: this.getCurrentDivision.bind(this),
			elapsedTimeToSize: this.elapsedTimeToSize.bind(this),
			sizeToTime: this.sizeToTime.bind(this),
			getSongSize: this.getSongSize.bind(this)
		}
	}

	getActions() {
		return bindActionCreators(actions, this.store.dispatch);
	}
	getState() {
		return this.store.getState();
	}
	subscribe(cb) {
		return this.store.subscribe(cb);
	}
	getElapsedTime() {
		return time.getElapsedTime(this.store.getState().player, getWebAudioTime());
	}
	getCurrentBeat() {
		const state = this.store.getState();
		return time.getCurrentBeat(state.player, state.song, getWebAudioTime());
	}
	getCurrentDivision() {
		const state = this.store.getState();
		return time.getCurrentDivision(state.player, state.song, getWebAudioTime());
	}
	elapsedTimeToSize() {
		const elapsedTime = time.getElapsedTime(this.store.getState().player, getWebAudioTime());
		const state = this.store.getState();
		return time.timeToSize(elapsedTime, state.player, state.song);
	}
	sizeToTime(size) {
		const state = this.store.getState();
		return time.sizeToTime(size, state.player, state.song);
	}
	getSongSize() {
		const state = this.store.getState();
		return time.getSongSize(state.player, state.song);
	}

	render() {
		return (
			<Provider store={this.store}>
				<Drumkit {...this.props} />
			</Provider>
		);
	}
}