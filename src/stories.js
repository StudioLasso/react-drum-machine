import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ReactDrumMachine from '.';

import example1 from '../songs/example1.json';
import musclemuseum from '../songs/musclemuseum.json';

storiesOf('basic', module)
	.addDecorator(story => (
		<div>
			<button onClick={() => PubSub.publish('drum.action',{action:'play'})}>Play</button>
			<button onClick={() => PubSub.publish('drum.action',{action:'stop'})}>Stop</button>
			{story()}
		</div>
	))
	.addWithInfo(
		'divisionSize set to default (20px)', 
		'simple usage', 
		() => <ReactDrumMachine song={example1} />)
	.addWithInfo(
		'divisionSize set to 4px',
		'',
		() => <ReactDrumMachine divisionSize={4} song={example1} />)
	.addWithInfo(
		'divisionSize set to 40px',
		'',
		() => <ReactDrumMachine divisionSize={40} song={example1} />)
	.addWithInfo(
		'big song',
		'simple usage with a big song',
		() => <ReactDrumMachine song={musclemuseum} />);

storiesOf('other', module)
	.addWithInfo(
		'Publish actions using specific id',
		'Control drum machine with specific id',
		() => (
		<div>
			<button onClick={() => PubSub.publish('dm1.action',{action:'play'})}>Play</button>
			<button onClick={() => PubSub.publish('dm1.action',{action:'stop'})}>Stop</button>
			<ReactDrumMachine song={example1} id="dm1" />
		</div>
	));