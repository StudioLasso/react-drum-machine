import React from 'react';
import Range from './Range';
import s from './styles.css';

export default props => {
	const second = {
		'width': (100 / props.time)+'%'
    };

    const rows = [];
    for (var i = 0; i < props.time; i++) {
		rows.push(
			<div key={i} className={s.second} style={second}>
				<span className={s.secondLbl}>
					{i}
				</span>
			</div>
      	);
    }
    return (
		<div className={s.container}>
			<Range DrumMachine={props.DrumMachine} />
			{rows}
		</div>
    );
}
