import WorkerBlobUrl from './timerworker.js';

let audioCtx,
	timer,
	tickResolve;

export function loadAudioContext() {
	if( ! audioCtx ) {
		// Fix up for prefixing
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		audioCtx = new AudioContext();
	}
}

export function fetchSound(url, bearer) {
	const accesstoken = '';
	let config = {
		method: 'get'
	};

	if (bearer) {
		config = {
			...config,
			...{
				headers: {
					Authorization: `Bearer ${bearer}`
				}
			}
		};
	}

	return fetch(url, config)	
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
export function playSound(buffer, delay=0) {
	const source = audioCtx.createBufferSource(); 	// creates a sound source
	source.buffer = buffer;                  		// tell the source which sound to play
	source.connect(audioCtx.destination);       	// connect the source to the context's destination (the speakers)
	source.start(audioCtx.currentTime + delay); 
}

export function getWebAudioTime() {
	return audioCtx ? audioCtx.currentTime : 0;
}

export function waitTimer() {
	return new Promise(resolve => {
		tickResolve = resolve;
	});
}

export function initTimer() {
	timer = new Worker(WorkerBlobUrl);
	timer.onmessage = e => { 
		if (e.data === 'tick' && tickResolve) {
			tickResolve();
			tickResolve = undefined;
		}
    };
}

export function startTimer() {
	if (timer) {
		console.log('startTimer');
		timer.postMessage("start");
	}
}

export function stopTimer() {
	if (timer) {
		timer.postMessage('stop');
	}
}