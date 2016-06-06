import React from 'react';
import InstrumentBits from './InstrumentBits';
import DivisionCopier from './DivisionCopier';

export default props => {
	return (
		<div>
			{props.instruments.map((ins, i) => (
				<InstrumentBits 
					key={i}
					instrumentIndex={i}
					beats={ins.bits}
					timeWidth={props.timeWidth}
					divisionSize={props.divisionSize}
					changeBit={props.changeBit} />
			))}
			<DivisionCopier
				measureNumber={props.measureNumber}
				measureSize={props.measureSize}
				copyMeasure={props.copyMeasure}
				pasteMeasure={props.pasteMeasure}
				clearMeasure={props.clearMeasure} />
		</div>
	);
}
