'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _InstrumentInfos = require('./InstrumentInfos');

var _InstrumentInfos2 = _interopRequireDefault(_InstrumentInfos);

var _actions = require('../../actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactRedux.connect)(function (state) {
	return {
		instruments: state.song.instruments
	};
}, function (dispatch) {
	return {
		actions: (0, _redux.bindActionCreators)(actions, dispatch)
	};
})(_InstrumentInfos2.default);