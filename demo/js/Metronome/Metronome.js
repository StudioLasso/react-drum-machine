import React, { Component } from 'react';
import s from './styles.css';

export default class Metronome extends Component {
	moveMetronome(currentBeat){
		if (currentBeat % 2 == 0) {
			$(`.${s.point}`).animate({'left': '0px'}, 20);
		}
		else {
			$(`.${s.point}`).animate({'left': '15px'}, 20);
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.currentBeat != this.props.currentBeat) {
			this.moveMetronome(nextProps.currentBeat);
		}
	}

	render(){
		return (
			<div className={s.container}>
				<div className={s.metronome}>
					<div className={s.point}></div>
				</div>
			</div>
		);
	}
}