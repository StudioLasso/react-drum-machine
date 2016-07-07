'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InstrumentBits = require('./InstrumentBits');

var _InstrumentBits2 = _interopRequireDefault(_InstrumentBits);

var _DivisionCopier = require('./DivisionCopier');

var _DivisionCopier2 = _interopRequireDefault(_DivisionCopier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
	return _react2.default.createElement(
		'div',
		null,
		props.instruments.length === 0 && _react2.default.createElement(
			'div',
			null,
			'no song loaded'
		),
		props.instruments.map(function (ins, i) {
			return _react2.default.createElement(_InstrumentBits2.default, {
				key: i,
				instrumentIndex: i,
				beats: ins.bits,
				songSize: props.songSize,
				divisionSize: props.divisionSize,
				changeBit: props.changeBit });
		}),
		_react2.default.createElement(_DivisionCopier2.default, {
			measureNumber: props.measureNumber,
			measureSize: props.measureSize,
			copyMeasure: props.copyMeasure,
			pasteMeasure: props.pasteMeasure,
			clearMeasure: props.clearMeasure })
	);
};

module.exports = exports['default'];