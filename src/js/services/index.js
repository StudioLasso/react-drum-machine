let audioCtx;

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