import React, { Component } from 'react';

import Range from './Range';

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			elapsedTime: 0,
			elapsedTimeToSize: 0
		};
	}

	componentDidMount() {
		const refresh = () => {
			this.setState({
				elapsedTimeToSize: this.props.Drumkit.elapsedTimeToSize()
			});
			setTimeout(() => requestAnimationFrame(refresh), 20);
		};

		requestAnimationFrame(refresh);
	}

	handleChange(e) {
		this.props.Drumkit.getActions().changeTime(
			this.props.Drumkit.sizeToTime(
				e.target.value));
	}

	render() {
		return <Range 
			elapsedTimeToSize={this.state.elapsedTimeToSize} 
			width={this.props.Drumkit.getState().player.width} 
			handleChange={this.handleChange.bind(this)} />;
	}
}