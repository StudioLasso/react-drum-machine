import React, { Component } from 'react';
import s from './styles.css';

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
		const inlineStyles = {
			bits: {
				'width': this.props.timeWidth
			},
			bitContent: {
				'width':this.props.divisionSize,
			}
		};

		const bits = this.props.beats.map(((bit,i) => (
			<div 
				className={s.bitContent}
				style={inlineStyles.bitContent} 
				key={i} 
				onClick={this.bitClicked.bind(this, i)}>
				<div className={bit ? s.bitOn : s.bitOff}></div>
			</div>
		)).bind(this));

		return (
			<div 
				className={s.bits} 
				style={inlineStyles.bits} 
				data-index={this.props.instindex}>
				<div className={s.content}>
					{bits}
				</div>
			</div>
		);
	}
}