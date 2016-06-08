import React, { Component } from 'react';
import Console from './Console';

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drumkitState: this.props.Drumkit.getState(),
			elapsedTime: 0,
			currentBeat: 0,
			currentDivision: 0
		};
	}
	componentDidMount() {
		this.props.Drumkit.subscribe(() => {
			this.setState({
				drumkitState: this.props.Drumkit.getState(),
				drumkitActions: this.props.Drumkit.getActions()
			});
		});
		const refresh = () => {
			this.setState({
				elapsedTime: this.props.Drumkit.getElapsedTime(),
				currentBeat: this.props.Drumkit.getCurrentBeat(),
				currentDivision: this.props.Drumkit.getCurrentDivision()
			});
			setTimeout(() => requestAnimationFrame(refresh), 100);
		};

		requestAnimationFrame(refresh);
	}
	render() {
		return <Console 
			elapsedTime={Math.round(this.state.elapsedTime * 100) / 100}
			currentBeat={this.state.currentBeat}
			currentDivision={this.state.currentDivision}
			drumkitState={this.state.drumkitState} 
			drumkitActions={this.state.drumkitActions} />;
	}
}