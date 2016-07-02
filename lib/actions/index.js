'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDivisionSize = exports.changeCurrentBeat = exports.clearMeasure = exports.measurePasted = exports.pasteMeasure = exports.copyMeasure = exports.bitChanged = exports.changeBit = exports.addInstrument = exports.setPausedTime = exports.setPlayerStatus = exports.stop = exports.pause = exports.play = exports.currentBeatChange = exports.changeDpb = exports.changeElapsedTime = exports.changeBeatPerMeasure = exports.changeBpm = exports.changeTime = exports.setStartTime = exports.soundLoaded = exports.songLoaded = exports.initSong = exports.loadSong = exports.initDrumkit = undefined;

var _reduxActions = require('redux-actions');

var initDrumkit = exports.initDrumkit = (0, _reduxActions.createAction)('INIT_DRUMKIT');
var loadSong = exports.loadSong = (0, _reduxActions.createAction)('LOAD_SONG');
var initSong = exports.initSong = (0, _reduxActions.createAction)('INIT_SONG');
var songLoaded = exports.songLoaded = (0, _reduxActions.createAction)('SONG_LOADED');
var soundLoaded = exports.soundLoaded = (0, _reduxActions.createAction)('SOUND_LOADED');
var setStartTime = exports.setStartTime = (0, _reduxActions.createAction)('SET_STARTTIME');
var changeTime = exports.changeTime = (0, _reduxActions.createAction)('CHANGE_TIME');
var changeBpm = exports.changeBpm = (0, _reduxActions.createAction)('CHANGE_BPM');
var changeBeatPerMeasure = exports.changeBeatPerMeasure = (0, _reduxActions.createAction)('CHANGE_BEATPERMEASURE');
var changeElapsedTime = exports.changeElapsedTime = (0, _reduxActions.createAction)('CHANGE_ELAPSEDTIME');
var changeDpb = exports.changeDpb = (0, _reduxActions.createAction)('CHANGE_DPB');
var currentBeatChange = exports.currentBeatChange = (0, _reduxActions.createAction)('CHANGE_CURRENTBEAT');
var play = exports.play = (0, _reduxActions.createAction)('PLAY');
var pause = exports.pause = (0, _reduxActions.createAction)('PAUSE');
var stop = exports.stop = (0, _reduxActions.createAction)('STOP');
var setPlayerStatus = exports.setPlayerStatus = (0, _reduxActions.createAction)('SET_PLAYERSTATUS');
var setPausedTime = exports.setPausedTime = (0, _reduxActions.createAction)('SET_PAUSEDTIME');
var addInstrument = exports.addInstrument = (0, _reduxActions.createAction)('ADD_INSTRUMENT');
var changeBit = exports.changeBit = (0, _reduxActions.createAction)('CHANGE_BIT');
var bitChanged = exports.bitChanged = (0, _reduxActions.createAction)('BIT_CHANGED');
var copyMeasure = exports.copyMeasure = (0, _reduxActions.createAction)('COPY_MEASURE');
var pasteMeasure = exports.pasteMeasure = (0, _reduxActions.createAction)('PASTE_MEASURE');
var measurePasted = exports.measurePasted = (0, _reduxActions.createAction)('MEASURE_PASTED');
var clearMeasure = exports.clearMeasure = (0, _reduxActions.createAction)('CLEAR_MEASURE');
var changeCurrentBeat = exports.changeCurrentBeat = (0, _reduxActions.createAction)('CHANGE_CURRENTBEAT');
var setDivisionSize = exports.setDivisionSize = (0, _reduxActions.createAction)('SET_DIVISIONSIZE');