import React, { Component} from 'react';
import { connect } from 'react-redux';

import Timeline from './Timeline';

export default connect((state, props) => ({
	songTime: state.song.time,
	timeWidth: props.timeWidth
}))(Timeline);