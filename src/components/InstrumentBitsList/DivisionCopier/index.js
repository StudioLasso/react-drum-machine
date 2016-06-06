import React from 'react';

const s = {
	container: {
		overflow: 'hidden',
		whiteSpace: 'nowrap'
	},

	measure: {
		height: '24px',
		display: 'inline-block'
	},

	cell: {
		float: 'left'
	}
};

export default props => {
	s.measure = {
		...s.measure,
		width: props.measureSize
	};

    const rows = [];

    for (let i = 0; i < props.measureNumber; i++) {
        rows.push(
			<div key={i} style={s.measure}>
				<div style={s.cell}>
					<button onClick={props.copyMeasure.bind(this, i)} value={i}>Copy</button>
				</div>
				<div style={s.cell}>
					<button onClick={props.pasteMeasure.bind(this, i)} value={i}>Paste</button>
				</div>
				<div style={s.cell}>
					<button onClick={props.clearMeasure.bind(this, i)} value={i}>Clear</button>
				</div>
				<div style={s.cell}>
					<span>{i}</span>
				</div>
			</div>
        );
    }

    return (
		<div style={s.container} >
			{rows}
			<div style={{'clear':'both'}}></div>
		</div>
    );
}