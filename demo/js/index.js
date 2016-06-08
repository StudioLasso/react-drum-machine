import React from 'react';
import ReactDom from 'react-dom';
import 'babel-polyfill';

import DrumKit from 'Drumkit';

import Console from './Console';
import Metronome from './Metronome';
import Timeline from './Timeline';

ReactDom.render(
	<div>
		<Console Drumkit={DrumKit} />
		<div>
			<div style={{display:'inline-block', float: 'left'}}>
				<Metronome Drumkit={DrumKit} />
			</div> 
			<div style={{float: 'left'}}>
				<Timeline Drumkit={DrumKit} />
			</div>
		</div>
		<div style={{clear:'both'}}>			
			<DrumKit />
		</div>
	</div>,
	document.getElementById('main')
);
