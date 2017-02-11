'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = song;

var _time = require('../utils/time');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
	instruments: [],
	bpm: 0,
	time: 0,
	divisionnumber: 0,
	divisionperbeat: 0,
	beatpermeasure: 0,
	loaded: false
};

function song() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    type = _ref.type,
	    payload = _ref.payload;

	var _ret = function () {
		switch (type) {
			case 'INIT_SONG':
				var _payload$song = payload.song,
				    title = _payload$song.title,
				    bpm = _payload$song.bpm,
				    beatpermeasure = _payload$song.beatpermeasure,
				    divisionperbeat = _payload$song.divisionperbeat,
				    instruments = _payload$song.instruments,
				    divisionnumber = Math.max.apply(Math, instruments.map(function (i) {
					return i.bits.length;
				}));

				// Deep copy array of instruments

				var songInstruments = JSON.parse(JSON.stringify(instruments));
				var time = (0, _time.divisionToTime)({
					divisionperbeat: divisionperbeat,
					bpm: bpm
				}, divisionnumber);

				songInstruments.forEach(function (i) {
					i.bits = [].concat(_toConsumableArray(Array(divisionnumber).keys())).map(function (d) {
						return i.bits[d] || 0;
					});
				});

				return {
					v: {
						title: title,
						bpm: bpm,
						beatpermeasure: beatpermeasure,
						divisionperbeat: divisionperbeat,
						instruments: songInstruments,
						divisionnumber: divisionnumber,
						time: time
					}
				};
			case 'SOUND_LOADED':
				var buffer = payload.buffer,
				    instrument = payload.instrument;

				return {
					v: _extends({}, state, {
						instruments: state.instruments.map(function (i) {
							if (i.title === instrument.title) {
								return _extends({}, i, {
									buffer: buffer
								});
							}
							return i;
						})
					})
				};
			case 'SONG_LOADED':
				return {
					v: _extends({}, state, {
						loaded: true
					})
				};
			case 'BIT_CHANGED':
				var instrumentIndex = payload.instrumentIndex,
				    bitIndex = payload.bitIndex;

				return {
					v: _extends({}, state, {
						instruments: state.instruments.map(function (ins, i) {
							if (i === instrumentIndex) {
								var _newInstrument = _extends({}, ins, {
									bits: [].concat(_toConsumableArray(ins.bits))
								});
								_newInstrument.bits[bitIndex] = _newInstrument.bits[bitIndex] ? 0 : 1;
								return _newInstrument;
							}
							return ins;
						})
					})
				};
			case 'MEASURE_PASTED':
				var pasteIndex = payload.pasteIndex,
				    bits = payload.bits;

				var startIndex = pasteIndex * state.beatpermeasure * state.divisionperbeat;
				var endIndex = startIndex + state.beatpermeasure * state.divisionperbeat;

				return {
					v: _extends({}, state, {
						instruments: state.instruments.map(function (ins, index) {
							return _extends({}, ins, {
								bits: [].concat(_toConsumableArray(ins.bits.slice(0, startIndex)), _toConsumableArray(bits[index]), _toConsumableArray(ins.bits.slice(endIndex)))
							});
						})
					})
				};
			case 'CLEAR_MEASURE':
				var index = payload;
				return {
					v: _extends({}, state, {
						instruments: state.instruments.map(function (ins) {
							var newInstrument = _extends({}, ins, {
								bits: [].concat(_toConsumableArray(ins.bits))
							});
							var divIndex = index * state.beatpermeasure * state.divisionperbeat;
							for (var i = divIndex; i < divIndex + state.beatpermeasure * state.divisionperbeat; i++) {
								newInstrument.bits[i] = 0;
							}
							return newInstrument;
						})
					})
				};
			default:
				return {
					v: state
				};
		}
	}();

	if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
}
module.exports = exports['default'];