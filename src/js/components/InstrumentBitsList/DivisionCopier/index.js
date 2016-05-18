import React from 'react';
import s from './styles.css';

export default props => {
	const rowStyle= {
		'width': props.measureSize
	};

    const rows = [];

    for (let i = 0; i < props.measureNumber; i++) {
        rows.push(
			<div key={i} className={s.measure} style={rowStyle}>
				<div className={s.cell}>
					<button onClick={props.copyMeasure.bind(this, i)} value={i}>Copy</button>
				</div>
				<div className={s.cell}>
					<button onClick={props.pasteMeasure.bind(this, i)} value={i}>Paste</button>
				</div>
				<div className={s.cell}>
					<button onClick={props.clearMeasure.bind(this, i)} value={i}>Clear</button>
				</div>
				<div className={s.cell}>
					<span>{i}</span>
				</div>
			</div>
        );
    }

    return (
		<div className={s.container} >
			{rows}
			<div style={{'clear':'both'}}></div>
		</div>
    );
}