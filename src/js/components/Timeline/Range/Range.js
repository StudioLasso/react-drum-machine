import React from 'react';

export default props => {
	return (
		<input
			type="range"
			value={props.elapsedTimeToValue}
			onChange={props.handleChange}
			max={props.timeWidth}
			min="0"
			step="1">
		</input>
	);
}