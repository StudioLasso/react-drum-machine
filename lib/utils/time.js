"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.timeToDivision = timeToDivision;
exports.divisionToTime = divisionToTime;
exports.timeToSize = timeToSize;
exports.sizeToTime = sizeToTime;
exports.getElapsedTime = getElapsedTime;
exports.getCurrentBeat = getCurrentBeat;
exports.getCurrentDivision = getCurrentDivision;
exports.getBeatSize = getBeatSize;
exports.getMeasureSize = getMeasureSize;
exports.getSongSize = getSongSize;
exports.getMeasureNumber = getMeasureNumber;
function timeToDivision(songState, time) {
	return Math.ceil(time / 60 * songState.bpm * songState.divisionperbeat);
}

function divisionToTime(songState, div) {
	return div / songState.divisionperbeat * (60 / songState.bpm);
}

function timeToSize(time, playerState, songState) {
	return songState.time && !!time ? time / songState.time * getSongSize(playerState, songState) : 0;
}

function sizeToTime(size, playerState, songState) {
	return size / (playerState.divisionSize * songState.divisionperbeat) * (1 / songState.bpm) * 60;
}

function getElapsedTime(playerState, time) {
	return playerState.pausedTime || time - playerState.startTime || 0;
}

function getCurrentBeat(playerState, songState, time) {
	var elapsedTime = getElapsedTime(playerState, time);
	return Math.floor(elapsedTime / 60 * songState.bpm);
}

function getCurrentDivision(playerState, songState, time) {
	var elapsedTime = getElapsedTime(playerState, time);
	return Math.floor(elapsedTime / 60 * songState.bpm * songState.divisionperbeat);
}

function getBeatSize(playerState, songState) {
	return playerState.divisionSize * songState.divisionperbeat;
}

function getMeasureSize(playerState, songState) {
	return getBeatSize(playerState, songState) * songState.beatpermeasure;
}

function getSongSize(playerState, songState) {
	return songState.time / 60 * songState.bpm * getBeatSize(playerState, songState);
}

function getMeasureNumber(songState) {
	return Math.ceil(songState.divisionnumber / songState.divisionperbeat / songState.beatpermeasure);
}