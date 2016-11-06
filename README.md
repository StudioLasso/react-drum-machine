# React drum machine [![Build Status](https://travis-ci.org/StudioLasso/react-drum-machine.svg?branch=master)](https://travis-ci.org/StudioLasso/react-drum-machine) [![Dependency Status](https://david-dm.org/studiolasso/react-drum-machine.svg)](https://david-dm.org/studiolasso/react-drum-machine) [![devDependency Status](https://david-dm.org/studiolasso/react-drum-machine/dev-status.svg)](https://david-dm.org/studiolasso/react-drum-machine#info=devDependencies)

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

The UMD build is also available on unpkg:
```html
<script src="https://unpkg.com/react-drum-machine/lib/react-drum-machine.min.js"></script>
```
You can find the library on window.ReactDrumMachine.

Also you have to import React, ReactDOM and perhaps babel-polyfill from CDNs.
```html
<head>
...
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.9.1/polyfill.js"></script>
<script src="https://fb.me/react-15.2.0.js"></script>
<script src="https://fb.me/react-dom-15.2.0.js"></script>
<script src="https://unpkg.com/react-drum-machine/lib/react-drum-machine.min.js"></script>
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
		<button onClick={() => PubSub.publish('drum',{action:'play'})}>Play</button>
		<button onClick={() => PubSub.publish('drum',{action:'stop'})}>Stop</button>
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

# API

## `<ReactDrumMachine />`
Drum machine component. Display and play songs

### Props

#### `song`
An object representing the song. [Here](https://github.com/StudioLasso/react-drum-machine/blob/master/songs/musclemuseum.json) is an example.

Song structure :

```js
{
	"title": <String>, // song title
	"beatpermeasure": <Number>, // beats per measure
	"bpm": <Number>,
	"divisionperbeat": <Number>, // divisions per beat
	"instruments": [
	{
		"title": <String>, // instrument name
		"image": <String>, // image url, optional
		"sound": <String>, // sound url
		"bearer": <String> // token to get sound, optional,
		"bits": <[<Number>]> // array of bits (0 or 1)
	}]
}
```

After component is mounted, song can be changed.

#### `divisionSize`
Size in pixel of a division. Default is `20` pixels.

#### `id`
Drum machine can be controlled with publish/subscribe mechanism. 

If you have multiple instances of drum machine, you can define an id for each one and target a specific instance when you publish an action. Here is an example :

```
<ReactDrumMachine id="dm1" />
<ReactDrumMachine id="dm2" />

...

PubSub.publish('dm1', {action:'play'});
PubSub.publish('dm2', {action:'stop'});
```

#### `onLoaded`
Callback triggered when `<ReactDrumMachine />` is mounted. It passes 3 arguments :
- state: actual state of the component. Read [reducers](https://github.com/StudioLasso/react-drum-machine/tree/master/src/reducers) code to have more details on structure 
- actions: [all actions](https://github.com/StudioLasso/react-drum-machine/blob/master/src/actions/index.js). Useful to interact with drum machine.
- infoAPI: a set of methods to get informations about elapsed time, current beat, song size, etc ...
  - `getElapsedTime()` : returns elapsed time in seconds
  - `getCurrentBeat()` : returns current beat
  - `getCurrentDivision()` : returns current division
  - `elapsedTimeToSize()` : returns convertion of elapsed time to pixels 
  - `sizeToTime(<Number>)` : returns convertion of size in argument into seconds
  - `getSongSize()` : returns size of song in pixels

#### `onChange`
Callback triggered when state changes. It passes state in argument.

## `PubSub`
publish/subscribe object to trigger drum machine [actions](https://github.com/StudioLasso/react-drum-machine/blob/master/src/actions/index.js). Here is some examples:

```js
// trigger action play
PubSub.publish('drum',{action:'play'});

// trigger action stop
PubSub.publish('drum',{action:'stop'});
```

First argument of `PubSub.publish()` helps to target drum machine instances. `<ReactDrumMachine />` have `'drum'` as default id. It can specified using `id` props (ex: `<ReactDrumMachine id="dm1" />`)

Second argument of `PubSub.publish()` take a object like this :
```js
{
	action: <string> // action method name
	args: <object> // action payload 
}
```

Read [reducers](https://github.com/StudioLasso/react-drum-machine/tree/master/src/reducers) code to have details on payload sturctures

# License

This project is licensed under the GPL3 license
