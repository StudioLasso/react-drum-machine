import React, { Component } from 'react';

const s = {
	bitOn: {
		border: '1px solid #CCC',
		width: '80%',
		height: '80%',
		margin: 'auto',
		background: 'silver'
	},

	bitOff: {
		width: '50%',
		height: '80%',
		margin: 'auto'	
	},

	bits: {
	    height: '24px',
	    display: 'table'
	},

	content: {
		display: 'table-cell',
	    verticalAlign: 'middle'
	},

	bitContent: {
		float: 'left',
		borderRight: '1px solid #CCC',
		height: '100%'
	}
}

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
			width: this.props.timeWidth
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