import React from 'react';
import ReactDom from 'react-dom';

var DrumKit = require('./components/DrumKit.js');

ReactDom.render(
  <DrumKit url="/api/getdrumkit" />,
  document.getElementById('main')
);
