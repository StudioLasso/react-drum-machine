import React, { Component } from 'react';

import Timeline from './Timeline';

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.DrumMachine.subscribe(() => {
			this.setState({
				time: this.props.DrumMachine.getState().song.time
			});
		});
	}

	render() {
		return <Timeline {...this.state} DrumMachine={this.props.DrumMachine} />
	}
}