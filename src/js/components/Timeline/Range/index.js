import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { getWebAudioTime } from '../../../services';
import Range from './Range';
import * as actions from '../../../actions';
import * as time from '../../../utils/time';

class RangeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			elapsedTime: 0
		};
	}

	componentDidMount() {
		const refresh = () => {
			const webAudioTime = getWebAudioTime();
			this.setState({
				elapsedTime: time.getElapsedTime(this.props.player, webAudioTime)
			});
			setTimeout(() => requestAnimationFrame(refresh), 60);
		};

		requestAnimationFrame(refresh);
	}

	handleChange(e) {
		this.props.actions.changeTime(
			time.sizeToTime(
				e.target.value,
				this.props.timeWidth, 
				this.props.songTime));
	}

	render() {
		const value = time.timeToSize(
			this.state.elapsedTime, 
			this.props.timeWidth, 
			this.props.songTime);

		return <Range 
			elapsedTimeToValue={value} 
			timeWidth={this.props.timeWidth} 
			handleChange={this.handleChange.bind(this)} />;
	}
}

export default connect((state, props) => ({
	songTime: state.song.time,
	timeWidth: props.timeWidth,
	player: state.player
}), dispatch => ({
	actions: bindActionCreators(actions, dispatch)
}))(RangeContainer);