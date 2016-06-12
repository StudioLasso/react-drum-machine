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

ReactDom.render(
	<div>
		<DrumMachine />
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