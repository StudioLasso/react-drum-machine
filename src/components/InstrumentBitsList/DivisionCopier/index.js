import React from 'react';

const s = {
	container: {
		whiteSpace: 'nowrap'
	},

	measure: {
		height: '24px',
		display: 'inline-block',
		overflow: 'hidden'
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
				<button onClick={props.copyMeasure.bind(this, i)} value={i}>Copy</button>
				<button onClick={props.pasteMeasure.bind(this, i)} value={i}>Paste</button>
				<button onClick={props.clearMeasure.bind(this, i)} value={i}>Clear</button>
				<span>{i}</span>
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