import React, { Component } from 'react';

import InstrumentList from './InstrumentList';

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			instruments: []
		}
	}

	componentDidMount() {
		this.props.DrumMachine.subscribe(() => {
			this.setState({
				instruments: this.props.DrumMachine.getState().song.instruments
			});
		});
	}

	render() {
		return <InstrumentList instruments={this.state.instruments} />;
	}
}