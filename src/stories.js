import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ReactDrumMachine from '.';

const example1 = require('json!../songs/example1.json');
const musclemuseum = require('json!../songs/musclemuseum');

storiesOf('Drum-Machine', module)
	.add('divisionSize set to default (20px)', () => <ReactDrumMachine song={example1} />)
	.add('divisionSize set to 4px', () => <ReactDrumMachine divisionSize={4} song={example1} />)
	.add('divisionSize set to 40px', () => <ReactDrumMachine divisionSize={40} song={example1} />)
	.add('big song', () => <ReactDrumMachine song={musclemuseum} />)
;
