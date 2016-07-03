# React drum machine

[![Build Status](https://travis-ci.org/StudioLasso/react-drum-machine.svg?branch=master)](https://travis-ci.org/StudioLasso/react-drum-machine)
[![Dependency Status](https://david-dm.org/studiolasso/react-drum-machine.svg)](https://david-dm.org/studiolasso/react-drum-machine)
[![devDependency Status](https://david-dm.org/studiolasso/react-drum-machine/dev-status.svg)](https://david-dm.org/studiolasso/react-drum-machine#info=devDependencies)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

# Getting started

## Installation

```bash
npm install react-drum-machine
```

## How to use it ?

Here is a simple react app :

```javascript
import React from 'react';
import ReactDom from 'react-dom';

import DrumMachine from 'react-drum-machine';

const song = {
	"title": "example",
	"beatpermeasure": 4,
	"bpm": 79,
	"divisionperbeat": 4,
	"instruments": [
  	{
		"title": "hihat",
		"image": "img/hihat.png",
		"sound": "https://content.dropboxapi.com/1/files/auto/CyCdh_K3ClHat-01.wav",
		"bearer": "JfnDpAnZcQ8AAAAAAAABYbt6Zvq6-U10DeFgzcZEbz7XYZrTv9ugPuuRl0ai9BFR",
		"bits": [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1]
  	},
  	{
		"title": "snare",
		"image": "http://i.imgur.com/NwDw9lZ.png",
		"sound": "https://content.dropboxapi.com/1/files/auto/snare.mp3",
		"bearer": "JfnDpAnZcQ8AAAAAAAABYbt6Zvq6-U10DeFgzcZEbz7XYZrTv9ugPuuRl0ai9BFR",
		"bits": [0,0,0,0,1,1,1,1,1,0,0,0,0,1,1,1,1]
  	},
  	{
		"title": "kick",
		"image": "http://i.imgur.com/CmsdE9k.png",
		"sound": "https://content.dropboxapi.com/1/files/auto/kick.mp3",
		"bearer": "JfnDpAnZcQ8AAAAAAAABYbt6Zvq6-U10DeFgzcZEbz7XYZrTv9ugPuuRl0ai9BFR",
		"bits": [1,1,1,1,0,1,0,1,0,0,0,0,0,1,1,1,1]
  	}
  ]
}

ReactDom.render(
	<div>
		<button onClick={() => PubSub.publish('drum.action',{action:'play'})}>Play</button>
		<button onClick={() => PubSub.publish('drum.action',{action:'stop'})}>Stop</button>
		<DrumMachine song={song} />
	</div>,
	document.getElementById('main')
);
```

Ensure you have an element with id `main` in your html file

# Run demo

1. Clone repository `git clone https://github.com/studiolasso/react-drum-machine.git`

2. Install dependencies `cd react-drum-machine && npm i && cd demo && npm i`

3. Execute demo `npm start`

# License

This project is licensed under the GPL3 license