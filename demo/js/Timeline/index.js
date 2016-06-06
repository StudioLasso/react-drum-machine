import React, { Component } from 'react';

import Timeline from './Timeline';

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.Drumkit.subscribe(() => {
			this.setState({
				width: this.props.Drumkit.getState().player.width,
				time: this.props.Drumkit.getState().song.time
			});
		});
	}

	render() {
		return <Timeline {...this.state} Drumkit={this.props.Drumkit} />
	}
}