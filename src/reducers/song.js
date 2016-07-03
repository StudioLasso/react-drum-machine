import { divisionToTime } from '../utils/time';

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
				title,
				bpm, 
				beatpermeasure, 
				divisionperbeat, 
				instruments }
			} = payload,
			divisionnumber =  Math.max.apply(Math, instruments.map(i=>i.bits.length));

		// Deep copy array of instruments
		const songInstruments = JSON.parse(JSON.stringify(instruments));
		const time = divisionToTime({
			divisionperbeat,
			bpm
		}, divisionnumber);

		songInstruments.forEach(i => {
			i.bits = [...Array(divisionnumber).keys()].map(d => i.bits[d] || 0);
		});

		return {
			title,
			bpm,
			beatpermeasure,
			divisionperbeat,
			instruments: songInstruments,
			divisionnumber,
			time
		}
	case 'SOUND_LOADED':
		const { buffer, instrument } = payload;
		return {
			...state,
			instruments: state.instruments.map(i => {
				if (i.title === instrument.title) {
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
	case 'BIT_CHANGED':
		const { instrumentIndex, bitIndex } = payload;
		return {
			...state,
			instruments: state.instruments.map((ins, i) => {
				if (i === instrumentIndex) {
					const newInstrument = {
						...ins,
						bits: [...ins.bits]
					};
					newInstrument.bits[bitIndex] = newInstrument.bits[bitIndex] ? 0 : 1;
					return newInstrument;
				}
				return ins;
			})
		};
	case 'MEASURE_PASTED':
		const { pasteIndex, bits } = payload;
		const startIndex = pasteIndex * state.beatpermeasure * state.divisionperbeat
		const endIndex = startIndex + state.beatpermeasure * state.divisionperbeat;

		return {
			...state,
			instruments: state.instruments.map((ins, index) => {
				return {
					...ins,
					bits: [
						...ins.bits.slice(0, startIndex),
						...bits[index],
						...ins.bits.slice(endIndex)
					]
				};
			})
		};
	case 'CLEAR_MEASURE':
		const index = payload;
		return {
			...state,
			instruments: state.instruments.map(ins => {
				const newInstrument = {
					...ins,
					bits: [...ins.bits]
				};
				const divIndex = index*state.beatpermeasure*state.divisionperbeat;
				for ( let i = divIndex ; i < divIndex + state.beatpermeasure*state.divisionperbeat ; i++ ) {
					newInstrument.bits[i] = 0;
				}
				return newInstrument;
			})
		};
	default:
		return state;
	}
}