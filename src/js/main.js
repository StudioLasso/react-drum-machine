import React from 'react';
import ReactDom from 'react-dom';

// Not ideal to use createFactory, but don't know how to use JSX to solve this
// Posted question at: https://gist.github.com/sebmarkbage/ae327f2eda03bf165261
var DrumKit = require('./components/DrumKit.js');

ReactDom.render(
  <DrumKit url="/api/getdrumkit" />,
  document.getElementById('main')
);
