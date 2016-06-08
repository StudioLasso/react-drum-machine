import React from 'react';
import ReactDom from 'react-dom';
import 'babel-polyfill';

import DrumMachine from 'react-drum-machine';

import Console from './Console';
import Metronome from './Metronome';
import Timeline from './Timeline';

ReactDom.render(
	<div>
		<Console Drumkit={DrumMachine} />
		<div>
			<div style={{display:'inline-block', float: 'left'}}>
				<Metronome Drumkit={DrumMachine} />
			</div> 
			<div style={{float: 'left'}}>
				<Timeline Drumkit={DrumMachine} />
			</div>
		</div>
		<div style={{clear:'both'}}>			
			<DrumMachine />
		</div>
	</div>,
	document.getElementById('main')
);
