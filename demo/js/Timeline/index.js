import React from 'react';
import Range from './Range';
import s from './styles.css';

export default props => {
	const second = {
		'width': (100 / props.drumState.song.time)+'%'
    };

    const rows = [];
    for (var i = 0; i < props.drumState.song.time; i++) {
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
			<Range {...props} />
			{rows}
		</div>
    );
}
