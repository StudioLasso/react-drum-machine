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
exports.getDivisionSize = getDivisionSize;
exports.getBeatSize = getBeatSize;
exports.getMeasureSize = getMeasureSize;
exports.getMeasureNumber = getMeasureNumber;
function timeToDivision(songState, time) {
	return Math.ceil(time / 60 * songState.bpm * songState.divisionperbeat);
}

function divisionToTime(songState, div) {
	return div / songState.divisionperbeat * (60 / songState.bpm);
}

function timeToSize(time, sizeMax, totalTime) {
	return totalTime && !!time ? time * sizeMax / totalTime : 0;
}

function sizeToTime(size, sizeMax, totalTime) {
	return size * totalTime / sizeMax;
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

function getDivisionSize(songState, sizeMax) {
	return songState.divisionnumber ? sizeMax / songState.divisionnumber : 0;
}

function getBeatSize(songState, sizeMax) {
	return getDivisionSize(songState, sizeMax) * songState.divisionperbeat;
}

function getMeasureSize(songState, sizeMax) {
	return getBeatSize(songState, sizeMax) * songState.beatpermeasure;
}

function getMeasureNumber(songState) {
	return Math.ceil(songState.divisionnumber / songState.divisionperbeat / songState.beatpermeasure);
}