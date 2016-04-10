import { createAction, handleAction, handleActions } from 'redux-actions';

export const test = createAction('TEST');
export const initDrumkit = createAction('INIT_DRUMKIT');
export const initSong = createAction('INIT_SONG');
export const songLoaded = createAction('SONG_LOADED');
export const soundLoaded = createAction('SOUND_LOADED');
