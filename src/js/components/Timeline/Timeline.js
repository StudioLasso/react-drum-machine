import React from 'react';
import Range from './Range';
import s from './styles.css';

export default props => {
	const second = {
		'width':props.timeWidth / props.songTime
    };

    const rows = [];
    for (var i = 0; i < props.songTime; i++) {
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
			<Range timeWidth={props.timeWidth} />
			{rows}
		</div>
    );
}
