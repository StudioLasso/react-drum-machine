export const getSong = state => state.song;
export const getInstrument = (state, i) => state.song.instruments[i];
export const getStartTime = state => state.player.startTime;
export const getPausedTime = state => state.player.pausedTime;
export const getStatus = state => state.player.status;