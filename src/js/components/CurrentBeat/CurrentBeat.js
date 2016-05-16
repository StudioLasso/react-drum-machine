import React from 'react';

function getElapsedTimeWidth(beatWidth, currentBeat) {
	if(beatWidth * currentBeat) {
		return beatWidth * currentBeat
	}
	else {
		return 0;
	}
}

function getMeasureWidth(beatWidth, beatPerMeasure) {
	if(beatWidth * beatPerMeasure) {
		return beatWidth * beatPerMeasure * 2;
	}
	else {
		return 0;
	}
}

function getBeatWidth(timeWidth, divisionNumber, divisionPerBeat) {
  return timeWidth / divisionNumber * divisionPerBeat;
}

export default props => {
	const beatWidth = getBeatWidth(props.timeWidth, props.divisionNumber, props.divisionPerBeat);

	const s = {
		'position':'absolute',
		'height': '100%',
		'backgroundColor':'#555',
		'background': 'linear-gradient(to right, #555 50%, silver 50%)',
		'backgroundSize': getMeasureWidth(beatWidth, props.beatPerMeasure),
		'width': props.timeWidth,
		'zIndex': '-1',
		'opacity':'0.5'
	}
	const sBeat = {
		'height': '100%',
		'width': beatWidth,
		'backgroundColor': 'black',
		'left': getElapsedTimeWidth(beatWidth, props.currentBeat),
		'position': 'absolute',
	}
	return (
		<div className="currentBitDisplayer" style={s}>
			<div style={sBeat}></div>
		</div>
	);
}