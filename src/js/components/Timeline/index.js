import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { getWebAudioTime } from '../../services';
import Timeline from './Timeline';
import * as actions from '../../actions';

class TimelineContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			elapsedTime: 0
		};
	}

	componentDidMount() {
		this.timer = setInterval(() => {
			getWebAudioTime().then(time => {
				this.setState({
					elapsedTime: this.props.pausedTime || (time - this.props.startTime)
				});				
			})
		}, 50);
	}

	render() {
		return <Timeline {...this.props} elapsedTime={this.state.elapsedTime} />
	}
}

export default connect(state => ({
	songTime: state.song.time,
	timeWidth: 6200,
	startTime: state.player.startTime,
	pausedTime: state.player.pausedTime
}), dispatch => ({
	actions: bindActionCreators(actions, dispatch)
}))(TimelineContainer);