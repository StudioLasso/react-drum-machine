export function timeToDivision(songState, time) {
	return Math.ceil(time / 60 * songState.bpm * songState.divisionperbeat);
}

export function divisionToTime(songState, div) {
	return div / songState.divisionperbeat * (60/songState.bpm)
}

export function timeToSize(time, sizeMax, totalTime) {
	return totalTime && !!time ? time * sizeMax / totalTime : 0;
}

export function sizeToTime(size, sizeMax, totalTime) {
	return size * totalTime / sizeMax;
}

export function getElapsedTime(playerState, time) {
	return playerState.pausedTime || ((time - playerState.startTime) || 0);
}

export function getCurrentBeat(playerState, songState, time) {
	const elapsedTime = getElapsedTime(playerState, time);

	return Math.floor(elapsedTime / 60 * songState.bpm);
}

export function getCurrentDivision(playerState, songState, time) {
	const elapsedTime = getElapsedTime(playerState, time);

	return Math.floor(elapsedTime / 60 * songState.bpm * songState.divisionperbeat);
}