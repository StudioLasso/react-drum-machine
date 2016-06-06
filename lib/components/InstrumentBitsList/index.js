'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _InstrumentBitsList = require('./InstrumentBitsList');

var _InstrumentBitsList2 = _interopRequireDefault(_InstrumentBitsList);

var _actions = require('../../actions');

var actions = _interopRequireWildcard(_actions);

var _time = require('../../utils/time');

var time = _interopRequireWildcard(_time);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactRedux.connect)(function (state, props) {
	return {
		timeWidth: props.timeWidth,
		instruments: state.song.instruments,
		divisionSize: time.getDivisionSize(state.song, props.timeWidth),
		measureSize: time.getMeasureSize(state.song, props.timeWidth),
		measureNumber: time.getMeasureNumber(state.song)
	};
}, function (dispatch) {
	return {
		changeBit: (0, _redux.bindActionCreators)(actions.changeBit, dispatch),
		copyMeasure: (0, _redux.bindActionCreators)(actions.copyMeasure, dispatch),
		pasteMeasure: (0, _redux.bindActionCreators)(actions.pasteMeasure, dispatch),
		clearMeasure: (0, _redux.bindActionCreators)(actions.clearMeasure, dispatch)
	};
})(_InstrumentBitsList2.default);