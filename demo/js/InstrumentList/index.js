import React, { Component } from 'react';

import InstrumentList from './InstrumentList';

export default class extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <InstrumentList instruments={this.props.drumState.song.instruments} />;
	}
}