import React from 'react';
import s from './styles.css';

export default props => {
	return (
		<input
			className={s.range}
			type="range"
			value={props.elapsedTimeToValue}
			onChange={props.handleChange}
			max={props.timeWidth}
			min="0"
			step="1">
		</input>
	);
}