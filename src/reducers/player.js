const initialState = {
  time: 0,
  measurecopied:[],
  currentbeat: 0,
  currentdivision: 0,
  startTime: undefined,
  status: 'stop',
  pausedTime: undefined,
  divisionSize: 20
};

export default function player(state= initialState, {type, payload} = {}) {
	switch (type) {
	case 'SET_STARTTIME':
		return {
			...state,
			startTime: payload
		}
	case 'SET_PLAYERSTATUS':
		const s = {
			...state,
			status: payload
		}
		if (payload === 'play') {
			s.pausedTime = undefined;
		}
		else if (payload === 'stop' || payload === 'pause') {
			s.startTime = undefined;
		}
		return s;
	case 'SET_PAUSEDTIME':
		return {
			...state,
			pausedTime: payload
		}
	case 'CHANGE_CURRENTBEAT':
		return {
			...state,
			currentbeat: payload
		}
	case 'SET_DIVISIONSIZE':
		return {
			...state,
			divisionSize: payload
		}
	default:
		return state;
	}
}