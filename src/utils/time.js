export function timeToDivision(songState, time) {
	return Math.ceil(time / 60 * songState.bpm * songState.divisionperbeat);
}

export function divisionToTime(songState, div) {
	return div / songState.divisionperbeat * (60/songState.bpm)
}

export function timeToSize(time, playerState, songState) {
	return songState.time && !!time ? (time / songState.time) * getSongSize(playerState, songState) : 0;
}

export function sizeToTime(size, playerState, songState) {
	return (size / (playerState.divisionSize * songState.divisionperbeat)) * (1 / songState.bpm) * 60;
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

export function getBeatSize(playerState, songState) {
	return playerState.divisionSize * songState.divisionperbeat;	
}

export function getMeasureSize(playerState, songState) {
	return getBeatSize(playerState, songState) * songState.beatpermeasure;
}

export function getSongSize(playerState, songState) {
	return songState.time / 60 * songState.bpm * getBeatSize(playerState, songState);
}

export function getMeasureNumber(songState) {
	return Math.ceil(songState.divisionnumber / songState.divisionperbeat / songState.beatpermeasure);
}