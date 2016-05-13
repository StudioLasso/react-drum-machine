import React from 'react';

const styles = {
	'height':"12px",
	'marginTop':'5px',
	'marginBottom':'20px'
};

function getSecondsWidth(timeWidth, songTime) {
	return timeWidth/songTime;
}

function getElapsedTime(timeWidth, songTime, elapsedTime) {
	return songTime / timeWidth * elapsedTime;
}

function getElapsedTimeWidth(timeWidth, songTime, elapsedTime){
	if(timeWidth / songTime * elapsedTime){
		return timeWidth / songTime * elapsedTime;
	}
	else {
		return 0;
	}
}

export default props => {
	const second = {
		'borderLeft': '1px solid',
		'width':getSecondsWidth(props.timeWidth, props.songTime),
		'height':'8',
		'float':'left',
		'display':'block'
    };

	const handleChange = e => {
		props.actions.changeTime(getElapsedTime(props.timeWidth, props.songTime, e.target.value))
	};

    const rows = [];
    for (var i = 0; i < props.songTime; i++) {
		rows.push(
			<div key={i} style={second}>
				<span style={{'fontSize':'xx-small'}}>
					{i}
				</span>
			</div>
      	);
    }
    return (
		<div className="timeLine" style={styles}>
			<input
				type="range"
				value={getElapsedTimeWidth(props.timeWidth, props.songTime, props.elapsedTime)}
				onChange={handleChange}
				max={props.timeWidth}
				min="0"
				step="1">
			</input>
			{rows}
		</div>
    );
}
