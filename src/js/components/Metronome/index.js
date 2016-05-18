import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Metronome from './Metronome';
import * as actions from 'actions';
import { getWebAudioTime } from 'services';
import * as time from 'utils/time';

class MetronomeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentBeat: 0
		};
	}

	componentDidMount() {
		const refresh = () => {
			const webAudioTime = getWebAudioTime();
			
			this.setState({
				currentBeat: time.getCurrentBeat(this.props.player, this.props.song, webAudioTime)
			});
			
			setTimeout(() => requestAnimationFrame(refresh), 100);
		};

		requestAnimationFrame(refresh);
	}

	render() {
		return <Metronome currentBeat={this.state.currentBeat} />;
	}
}

export default connect((state, props) => ({
  player: state.player,
  song: state.song
}))(MetronomeContainer);
