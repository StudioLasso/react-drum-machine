import React, { Component } from 'react';

const s = {
	bit: {
		height: '100%',
		margin: '1px',
		boxSizing: 'border-box'
	},

	bitOn: {
		border: '1px solid #CCC',
		background: 'silver'
	},

	bitOff: {
	},

	bits: {
	    height: '18px'
	},

	content: {
		display: 'inline-block',
		height: '100%'
	},

	bitContent: {
		float: 'left',
		borderRight: '1px solid #CCC',
		height: '100%',
		boxSizing: 'border-box',
		padding: '1px'
	}
}

s.bitOn = {
	...s.bit,
	...s.bitOn
};
s.bitOff = {
	...s.bit,
	...s.bitOff
};

export default class InstrumentBits extends Component {

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.beats != nextProps.beats;
	}

	bitClicked(bitIndex, e) {
		this.props.changeBit({
			instrumentIndex: this.props.instrumentIndex,
			bitIndex: bitIndex
		});
	}

	render() {

		s.bits = {
			...s.bits,
			width: this.props.songSize
		};
		s.bitContent = {
			...s.bitContent,
			width:this.props.divisionSize
		};

		const bits = this.props.beats.map(((bit,i) => (
			<div 
				style={s.bitContent}
				key={i} 
				onClick={this.bitClicked.bind(this, i)}>
				<div style={bit ? s.bitOn : s.bitOff}></div>
			</div>
		)).bind(this));

		return (
			<div 
				style={s.bits} 
				data-style={this.props.instindex}>
				<div style={s.content}>
					{bits}
				</div>
			</div>
		);
	}
}