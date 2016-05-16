import React from 'react';
import Range from './Range';

const styles = {
	'height':"12px",
	'marginTop':'5px',
	'marginBottom':'20px'
};

export default props => {
	const second = {
		'borderLeft': '1px solid',
		'width':props.timeWidth / props.songTime,
		'height':'8',
		'float':'left',
		'display':'block'
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
			<Range timeWidth={props.timeWidth} />
			{rows}
		</div>
    );
}
