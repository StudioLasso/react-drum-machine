import React from 'react';
import ReactDom from 'react-dom';

import DrumMachine from 'react-drum-machine';

import Console from './Console';
import Metronome from './Metronome';
import InstrumentList from './InstrumentList';
import Timeline from './Timeline';

ReactDom.render(
	<div>
		<Console DrumMachine={DrumMachine} />
		<div>
			<div style={{display:'inline-block', float: 'left'}}>
				<Metronome DrumMachine={DrumMachine} />
				<InstrumentList 
					DrumMachine={DrumMachine} />
			</div> 
			<div style={{float: 'left', width: '800px'}}>
				<Timeline DrumMachine={DrumMachine} />
				<DrumMachine />
			</div>
		</div>
	</div>,
	document.getElementById('main')
);
