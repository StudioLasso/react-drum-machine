# React drum machine

[![Build Status](https://travis-ci.org/StudioLasso/react-drum-machine.svg?branch=master)](https://travis-ci.org/StudioLasso/react-drum-machine)
[![Dependency Status](https://david-dm.org/studiolasso/react-drum-machine.svg)](https://david-dm.org/studiolasso/react-drum-machine)
[![devDependency Status](https://david-dm.org/studiolasso/react-drum-machine/dev-status.svg)](https://david-dm.org/studiolasso/react-drum-machine#info=devDependencies)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

Drum machine made with :heart: and :muscle:. 

Can be used in ReactJS applications.

Supports [browsers with web audio](http://caniuse.com/#search=web%20audio)

# How to use it ?

## NPM

With [npm](https://npmjs.com):

```
npm install --save react-drum-machine
```

Then, you can use a module bundler like [webpack](webpack.github.io) or [browserify](http://browserify.org/) to import package

```js
// using an ES6 transpiler, like babel
import ReactDrumMachine from 'react-drum-machine'

// not using an ES6 transpiler
var ReactDrumMachine = require('react-drum-machine');
```

## UMD

The UMD build is also available on npmcdn:
```html
<script src="https://npmcdn.com/react-drum-machine/lib/react-drum-machine.min.js"></script>
```
You can find the library on window.ReactDrumMachine.

Also you have to import React, ReactDOM and perhaps babel-polyfill from CDNs.
```html
<head>
...
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.9.1/polyfill.js"></script>
<script src="https://fb.me/react-15.2.0.js"></script>
<script src="https://fb.me/react-dom-15.2.0.js"></script>
<script src="https://npmcdn.com/react-drum-machine/lib/react-drum-machine.min.js"></script>
...
</head>
```

To use [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) syntax, you can use [Babel](https://babeljs.io/)

# Test it now !

Play with drum machine easily with this [JSBin](https://jsbin.com/herafiw)

# Let's code

Here is a simple react app using ES6 module and syntax ([Babel](https://babeljs.io/), [webpack](webpack.github.io) or [browserify](http://browserify.org/) can help you)

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

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

ReactDOM.render(
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
