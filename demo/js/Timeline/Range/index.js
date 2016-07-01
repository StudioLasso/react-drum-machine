import React, { Component } from 'react';

import Range from './Range';

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			elapsedTimeToSize: 0
		};
	}

	componentDidMount() {
		const refresh = () => {
			this.setState({
				elapsedTimeToSize: this.props.drumTime.elapsedTimeToSize()
			});
			this.nextRefresh = setTimeout(() => requestAnimationFrame(refresh), 20);
		};

		requestAnimationFrame(refresh);
	}

	componentWillUnmount() {
		if (this.nextRefresh) {
			clearTimeout(this.nextRefresh);
		}
	}

	handleChange(e) {
		this.props.drumActions.changeTime(
			this.props.drumTime.sizeToTime(
				e.target.value));
	}

	render() {
		return <Range 
			elapsedTimeToSize={this.state.elapsedTimeToSize} 
			size={this.props.drumTime ? this.props.drumTime.getSongSize() : 1} 
			handleChange={this.handleChange.bind(this)} />;
	}
}