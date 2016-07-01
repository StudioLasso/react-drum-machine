import React, { Component } from 'react';
import Console from './Console';

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			elapsedTime: 0,
			currentBeat: 0,
			currentDivision: 0
		};
	}
	componentDidMount() {
		const refresh = () => {
			this.setState({
				elapsedTime: this.props.drumTime.getElapsedTime(),
				currentBeat: this.props.drumTime.getCurrentBeat(),
				currentDivision: this.props.drumTime.getCurrentDivision()
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
		return <Console 
			elapsedTime={Math.round(this.state.elapsedTime * 100) / 100}
			currentBeat={this.state.currentBeat}
			currentDivision={this.state.currentDivision}
			drumState={this.props.drumState} 
			drumActions={this.props.drumActions} />;
	}
}