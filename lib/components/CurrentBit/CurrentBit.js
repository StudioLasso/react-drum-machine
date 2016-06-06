'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _time = require('../../utils/time');

var time = _interopRequireWildcard(_time);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s = {
	container: {
		position: 'absolute',
		height: '100%',
		backgroundColor: '#555',
		background: 'linear-gradient(to right, #555 50%, silver 50%)',
		zIndex: '-1',
		opacity: '0.5'
	},

	beat: {
		height: '100%',
		backgroundColor: 'black',
		position: 'absolute'
	}
};

exports.default = function (props) {
	var beatSize = time.getBeatSize(props.song, props.timeWidth);

	s.container = _extends({}, s.container, {
		backgroundSize: time.getMeasureSize(props.song, props.timeWidth) * 2,
		width: props.timeWidth
	});
	s.beat = _extends({}, s.beat, {
		width: beatSize,
		left: beatSize * props.currentBeat
	});
	return _react2.default.createElement(
		'div',
		{ style: s.container },
		_react2.default.createElement('div', { style: s.beat })
	);
};