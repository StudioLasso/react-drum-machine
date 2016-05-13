require('firebase');
const TimerWorker = require("worker!./timerworker.js");

let audioCtx,
	timer,
	tickResolve;

export function fetchSongs() {
	return new Promise((resolve, reject) => {
		const myDataRef = new Firebase('https://shining-heat-7214.firebaseio.com/songs');
		myDataRef.on("value", snap => {
			resolve(snap.val());
		}, err => {
			reject(err);
		});
	})
}

export function loadAudioContext() {
	if( ! audioCtx ) {
		// Fix up for prefixing
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		audioCtx = new AudioContext();
	}
}

export function fetchSound(url) {
	const accesstoken = 'JfnDpAnZcQ8AAAAAAAABYbt6Zvq6-U10DeFgzcZEbz7XYZrTv9ugPuuRl0ai9BFR';

	return fetch(url, {
		method: 'get',
		headers: {
			'Authorization': `Bearer ${accesstoken}`
		}
	})	
		.then(r=> r.arrayBuffer())
		.then(buffer => {
			return new Promise(resolve => {
				audioCtx.decodeAudioData(buffer, audioBuffer => {
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
export function playSound(buffer, delay) {
	const source = audioCtx.createBufferSource(); 	// creates a sound source
	source.buffer = buffer;                  		// tell the source which sound to play
	source.connect(audioCtx.destination);       	// connect the source to the context's destination (the speakers)
	source.start(audioCtx.currentTime + delay); 
}

export function getWebAudioTime() {
	return Promise.resolve(audioCtx.currentTime); 
}

export function waitTimer() {
	return new Promise(resolve => {
		tickResolve = resolve;
	});
}

export function initTimer() {
	timer = new TimerWorker();
	timer.onmessage = e => { 
		if (e.data === 'tick' && tickResolve) {
			tickResolve();
			tickResolve = undefined;
		}
    };
}

export function startTimer() {
	if (timer) {
		timer.postMessage("start");
	}
}

export function stopTimer() {
	if (timer) {
		timer.postMessage('stop');
	}
}