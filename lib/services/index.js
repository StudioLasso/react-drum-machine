'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fetchSongs = fetchSongs;
exports.loadAudioContext = loadAudioContext;
exports.fetchSound = fetchSound;
exports.playSound = playSound;
exports.getWebAudioTime = getWebAudioTime;
exports.waitTimer = waitTimer;
exports.initTimer = initTimer;
exports.startTimer = startTimer;
exports.stopTimer = stopTimer;
require('firebase');
var WorkerBlobUrl = require("./timerworker.js");

var audioCtx = void 0,
    timer = void 0,
    tickResolve = void 0;

function fetchSongs() {
	return new Promise(function (resolve, reject) {
		var myDataRef = new Firebase('https://shining-heat-7214.firebaseio.com/songs');
		myDataRef.on("value", function (snap) {
			resolve(snap.val());
		}, function (err) {
			reject(err);
		});
	});
}

function loadAudioContext() {
	if (!audioCtx) {
		// Fix up for prefixing
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		audioCtx = new AudioContext();
	}
}

function fetchSound(url) {
	var accesstoken = 'JfnDpAnZcQ8AAAAAAAABYbt6Zvq6-U10DeFgzcZEbz7XYZrTv9ugPuuRl0ai9BFR';

	return fetch(url, {
		method: 'get',
		headers: {
			'Authorization': 'Bearer ' + accesstoken
		}
	}).then(function (r) {
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
	var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

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
	timer = new Worker(WorkerBlobUrl);
	timer.onmessage = function (e) {
		if (e.data === 'tick' && tickResolve) {
			tickResolve();
			tickResolve = undefined;
		}
	};
}

function startTimer() {
	if (timer) {
		timer.postMessage("start");
	}
}

function stopTimer() {
	if (timer) {
		timer.postMessage('stop');
	}
}