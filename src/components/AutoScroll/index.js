import React from 'react';
import { connect } from 'react-redux';

import * as time from '../../utils/time';
import { getWebAudioTime } from '../../services';

class AutoScroll extends React.Component {
	componentDidMount() {
		const el = this.props.getRootElement();
		const width = el.getBoundingClientRect().width;
		const refresh = () => {
			const elapsedTime = time.getElapsedTime(this.props.player, getWebAudioTime());
			const size = time.timeToSize(elapsedTime, this.props.player, this.props.song);
			el.scrollLeft = size > width / 2 ? size - width / 2 : 0;
			
			this.nextRefresh = setTimeout(() => window.requestAnimationFrame(refresh), 20);
		};
		window.requestAnimationFrame(refresh);
	}

	componentWillUnmount() {
		if (this.nextRefresh) {
			clearTimeout(this.nextRefresh);
		}
	}
	
	render() {
		return null;
	}
}

export default connect(state => ({
	player: state.player,
	song: state.song	
}))(AutoScroll);