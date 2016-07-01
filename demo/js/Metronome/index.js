import React, { Component } from 'react';

import Metronome from './Metronome';

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentBeat: 0
		};
	}

	componentDidMount() {
		const refresh = () => {
			this.setState({
				currentBeat: this.props.drumTime.getCurrentBeat()
			});
			
			this.nextRefresh = setTimeout(() => requestAnimationFrame(refresh), 100);
		};

		requestAnimationFrame(refresh);
	}

	componentWillUnmount() {
		if (this.nextRefresh) {
			clearTimeout(this.nextRefresh);
		}
	}

	render() {
		return <Metronome 
			currentBeat={this.state.currentBeat} />;
	}
}