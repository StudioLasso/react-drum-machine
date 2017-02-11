'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.loadAudioContext = loadAudioContext;
exports.fetchSound = fetchSound;
exports.playSound = playSound;
exports.getWebAudioTime = getWebAudioTime;
exports.waitTimer = waitTimer;
exports.initTimer = initTimer;
exports.startTimer = startTimer;
exports.stopTimer = stopTimer;

var _timerworker = require('./timerworker.js');

var _timerworker2 = _interopRequireDefault(_timerworker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var audioCtx = void 0,
    timer = void 0,
    tickResolve = void 0;

function loadAudioContext() {
	if (!audioCtx) {
		// Fix up for prefixing
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		audioCtx = new AudioContext();
	}
}

function fetchSound(url, bearer) {
	var accesstoken = '';
	var config = {
		method: 'get'
	};

	if (bearer) {
		config = _extends({}, config, {
			headers: {
				Authorization: 'Bearer ' + bearer
			}
		});
	}

	return fetch(url, config).then(function (r) {
		return r.arrayBuffer();
	}).then(function (buffer) {
		return new Promise(function (resolve) {
			audioCtx.decodeAudioData(buffer, function (audioBuffer) {
				resolve(audioBuffer);
			});
		});
	});
}

/**
 * Play a webAudio buffer
 * @param  {AudioBufferSourceNode} buffer
 * @param  {Number} delay  delay in seconds
 */
function playSound(buffer) {
	var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	var source = audioCtx.createBufferSource(); // creates a sound source
	source.buffer = buffer; // tell the source which sound to play
	source.connect(audioCtx.destination); // connect the source to the context's destination (the speakers)
	source.start(audioCtx.currentTime + delay);
}

function getWebAudioTime() {
	return audioCtx ? audioCtx.currentTime : 0;
}

function waitTimer() {
	return new Promise(function (resolve) {
		tickResolve = resolve;
	});
}

function initTimer() {
	timer = new Worker(_timerworker2.default);
	timer.onmessage = function (e) {
		if (e.data === 'tick' && tickResolve) {
			tickResolve();
			tickResolve = undefined;
		}
	};
}

function startTimer() {
	if (timer) {
		console.log('startTimer');
		timer.postMessage("start");
	}
}

function stopTimer() {
	if (timer) {
		timer.postMessage('stop');
	}
}