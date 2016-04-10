const initialState = {
	instruments: [],
	bpm: 0,
	divisionnumber: 0,
	divisionperbeat: 0,
	beatpermeasure: 0
};

export default function song(state= initialState, {type, payload} = {}) {
	switch (type) {
	case 'INIT_SONG':
		const { 
			song: { 
				bpm, 
				time, 
				beatpermeasure, 
				divisionperbeat, 
				instruments }
			} = payload,
			divisionnumber = bpm * time / 60 * divisionperbeat;

		instruments.forEach(i => {
			i.bits = [...Array(divisionnumber).keys()].map(d => i.bits[d] || 0);
		});

		return {
			bpm,
			time,
			beatpermeasure,
			divisionperbeat,
			instruments,
			divisionnumber
		}
	case 'SOUND_LOADED':
		const { buffer, instrument } = payload;
		return {
			...state,
			instruments: state.instruments.map(i => {
				if (i.id === instrument.id) {
					return {
						...i,
						buffer
					}
				}
				return i;
			})
		}
	default:
		return state;
	}
}