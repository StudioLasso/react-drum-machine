import React from 'react';
import Range from './Range';
import s from './styles.css';

export default props => {
	const second = {
		'width': props.width / props.time
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
		<div className={s.container} style={{left: props.Drumkit.getBitsOffset()}}>
			<Range Drumkit={props.Drumkit} />
			{rows}
		</div>
    );
}
