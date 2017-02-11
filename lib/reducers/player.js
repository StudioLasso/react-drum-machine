'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = player;
var initialState = {
	time: 0,
	measurecopied: [],
	currentbeat: 0,
	currentdivision: 0,
	startTime: undefined,
	status: 'stop',
	pausedTime: undefined,
	divisionSize: 20
};

function player() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case 'SET_STARTTIME':
			return _extends({}, state, {
				startTime: payload
			});
		case 'SET_PLAYERSTATUS':
			var s = _extends({}, state, {
				status: payload
			});
			if (payload === 'play') {
				s.pausedTime = undefined;
			} else if (payload === 'stop' || payload === 'pause') {
				s.startTime = undefined;
			}
			return s;
		case 'SET_PAUSEDTIME':
			return _extends({}, state, {
				pausedTime: payload
			});
		case 'CHANGE_CURRENTBEAT':
			return _extends({}, state, {
				currentbeat: payload
			});
		case 'SET_DIVISIONSIZE':
			return _extends({}, state, {
				divisionSize: payload
			});
		default:
			return state;
	}
}
module.exports = exports['default'];