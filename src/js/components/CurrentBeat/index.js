import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import CurrentBeat from './CurrentBeat';
import * as actions from '../../actions';
import { getWebAudioTime } from '../../services';
import * as time from '../../utils/time';

class CurrentBeatContainer extends Component {
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
		return <CurrentBeat 
			timeWidth={this.props.timeWidth}
			divisionPerBeat={this.props.divisionPerBeat}
			divisionNumber={this.props.divisionNumber}
			beatPerMeasure={this.props.beatPerMeasure}
			currentBeat={this.state.currentBeat} />;
	}
}

export default connect((state, props) => ({
	timeWidth: props.timeWidth,
	divisionPerBeat: state.song.divisionperbeat,
	divisionNumber: state.song.divisionnumber,
	beatPerMeasure: state.song.beatpermeasure,
	player: state.player,
	song: state.song
}), dispatch => ({
	actions: bindActionCreators(actions, dispatch)
}))(CurrentBeatContainer);