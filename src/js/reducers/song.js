const initialState = {
	instruments: [],
	bpm: 0,
	time: 0,
	divisionnumber: 0,
	divisionperbeat: 0,
	beatpermeasure: 0,
	loaded: false
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

		// Deep copy array of instruments
		const songInstruments = JSON.parse(JSON.stringify(instruments));

		songInstruments.forEach(i => {
			i.bits = [...Array(divisionnumber).keys()].map(d => i.bits[d] || 0);
		});

		return {
			bpm,
			time,
			beatpermeasure,
			divisionperbeat,
			instruments: songInstruments,
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
	case 'SONG_LOADED':
		return {
			...state,
			loaded: true
		};
	default:
		return state;
	}
}