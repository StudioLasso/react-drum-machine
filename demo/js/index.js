import React from 'react';
import ReactDom from 'react-dom';
import 'babel-polyfill';

import DrumKit from '../../react-drum-machine/lib';

import Console from './Console';
import Metronome from './Metronome';
import Timeline from './Timeline';

window.DK = DrumKit;

ReactDom.render(
	<div>
		<div style={{maxWidth: '100px'}}>
			<Metronome Drumkit={DrumKit} />
		</div>
		<Console Drumkit={DrumKit} />
		<Timeline Drumkit={DrumKit} />
		<DrumKit />
	</div>,
	document.getElementById('main')
);
