import { createAction, handleAction, handleActions } from 'redux-actions';

export const test = createAction('TEST');
export const initDrumkit = createAction('INIT_DRUMKIT');
export const initSong = createAction('INIT_SONG');
export const songLoaded = createAction('SONG_LOADED');
export const soundLoaded = createAction('SOUND_LOADED');
export const setStartTime = createAction('SET_STARTTIME');
export const changeTime = createAction('CHANGE_TIME');
export const changeBpm = createAction('CHANGE_BPM');
export const changeBeatPerMeasure = createAction('CHANGE_BEATPERMEASURE');
export const changeElapsedTime = createAction('CHANGE_ELAPSEDTIME');
export const changeDpb = createAction('CHANGE_DPB');
export const play = createAction('PLAY');
export const pause = createAction('PAUSE');
export const stop = createAction('STOP');
export const setPlayerStatus = createAction('SET_PLAYERSTATUS');
export const setPausedTime = createAction('SET_PAUSEDTIME');