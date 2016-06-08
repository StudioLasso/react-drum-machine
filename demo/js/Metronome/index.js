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
				currentBeat: this.props.Drumkit.getCurrentBeat()
			});
			
			setTimeout(() => requestAnimationFrame(refresh), 100);
		};

		requestAnimationFrame(refresh);
	}

	render() {
		return <Metronome 
			currentBeat={this.state.currentBeat} 
			leftOffset={this.props.Drumkit.getBitsOffset()} />;
	}
}