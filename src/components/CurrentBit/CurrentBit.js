import React from 'react';
import * as time from '../../utils/time';

const s = {
	container: {
		position:'absolute',
		height: '100%',
		backgroundColor:'#555',
		background: 'linear-gradient(to right, #555 50%, silver 50%)',
		zIndex: '-1',
		opacity: '0.5'
	},

	beat: {
		height: '100%',
		backgroundColor: 'black',
		position: 'absolute'
	}
}

export default props => {
	s.container = {
		...s.container,
		backgroundSize: props.beatSize * props.beatPerMeasure * 2,
		width: props.songSize
	}
	s.beat = {
		...s.beat,
		width: props.beatSize,
		left: props.beatSize * props.currentBeat
	}

	return (
		<div style={s.container}>
			<div style={s.beat}></div>
		</div>
	);
}