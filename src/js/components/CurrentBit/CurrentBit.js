import React from 'react';
import s from './styles.css';
import * as time from '../../utils/time';

export default props => {
	const beatSize = time.getBeatSize(props.song, props.timeWidth);

	const container = {
		'backgroundSize': time.getMeasureSize(props.song, props.timeWidth) * 2,
		'width': props.timeWidth
	}
	const beat = {
		'width': beatSize,
		'left': beatSize * props.currentBeat
	}
	return (
		<div className={s.container} style={container}>
			<div className={s.beat} style={beat}></div>
		</div>
	);
}