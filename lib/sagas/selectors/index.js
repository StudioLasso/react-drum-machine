"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getSong = exports.getSong = function getSong(state) {
  return state.song;
};
var getInstrument = exports.getInstrument = function getInstrument(state, i) {
  return state.song.instruments[i];
};
var getStartTime = exports.getStartTime = function getStartTime(state) {
  return state.player.startTime;
};
var getPausedTime = exports.getPausedTime = function getPausedTime(state) {
  return state.player.pausedTime;
};
var getStatus = exports.getStatus = function getStatus(state) {
  return state.player.status;
};