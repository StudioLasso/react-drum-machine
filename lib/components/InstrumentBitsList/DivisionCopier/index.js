'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s = {
	container: {
		whiteSpace: 'nowrap'
	},

	measure: {
		height: '24px',
		display: 'inline-block',
		overflow: 'hidden'
	}

};

exports.default = function (props) {
	s.measure = _extends({}, s.measure, {
		width: props.measureSize
	});

	var rows = [];

	for (var i = 0; i < props.measureNumber; i++) {
		rows.push(_react2.default.createElement(
			'div',
			{ key: i, style: s.measure },
			_react2.default.createElement(
				'button',
				{ onClick: props.copyMeasure.bind(undefined, i), value: i },
				'Copy'
			),
			_react2.default.createElement(
				'button',
				{ onClick: props.pasteMeasure.bind(undefined, i), value: i },
				'Paste'
			),
			_react2.default.createElement(
				'button',
				{ onClick: props.clearMeasure.bind(undefined, i), value: i },
				'Clear'
			),
			_react2.default.createElement(
				'span',
				null,
				i
			)
		));
	}

	return _react2.default.createElement(
		'div',
		{ style: s.container },
		rows,
		_react2.default.createElement('div', { style: { 'clear': 'both' } })
	);
};

module.exports = exports['default'];