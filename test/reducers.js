import { assert, expect } from 'chai';
import deepFreeze from 'deep-freeze';

import song from '../src/js/reducers/song';
import * as actions from '../src/js/actions';

const song1 = {
	beatpermeasure: 4,
	bpm: 79,
	divisionperbeat: 4,
	instruments: [
		{
			id: 1,
			bits: [0, 0, 0, 1, 0, 1, 1, 0],
			imgurl: "img/hihat.png",
			key: 13,
			name: "hihat",
			soundurl: "https://content.dropboxapi.com/1/files/auto/CyCdh_K3ClHat-01.wav"
		},
		{
			id: 2,
			bits: [0, 1, 0, 0, 0, 0, 0, 0],
			imgurl: "http://i.imgur.com/NwDw9lZ.png",
			key: 14,
			name: "snare",
			soundurl: "https://content.dropboxapi.com/1/files/auto/snare.mp3"
		}
	],
	time: 30,
	title: "Test"
}

const song2 = {
	beatpermeasure: 4,
	bpm: 4,
	divisionperbeat: 2,
	instruments: [
		{
			id: 1,
			bits: [0],
			imgurl: "img/hihat.png",
			key: 13,
			name: "hihat",
			soundurl: "https://content.dropboxapi.com/1/files/auto/CyCdh_K3ClHat-01.wav"
		},
		{
			id: 2,
			bits: [0, 1],
			imgurl: "http://i.imgur.com/NwDw9lZ.png",
			key: 14,
			name: "snare",
			soundurl: "https://content.dropboxapi.com/1/files/auto/snare.mp3"
		}
	],
	time: 60,
	title: "Test"
}

describe('song reducer', () => {
	it('should init general properties of song', () => {
		const action = actions.initSong({ song: song1});
		deepFreeze(action);
		const r = song(undefined, action);

		const e = {
			bpm: song1.bpm,
			time: song1.time,
			beatpermeasure: song1.beatpermeasure,
			divisionperbeat: song1.divisionperbeat,
			instruments: song1.instruments
		}

		e.divisionnumber = e.bpm * e.time / 60 * e.divisionperbeat;

		expect(r.bpm).to.equal(e.bpm);
		expect(r.time).to.equal(e.time);
		expect(r.beatpermeasure).to.equal(e.beatpermeasure);
		expect(r.divisionperbeat).to.equal(e.divisionperbeat);
		expect(r.divisionnumber).to.equal(e.divisionnumber);
	});
	it('should init bits for all instruments', () => {
		const action = actions.initSong({ song: song2});
		deepFreeze(action);
		const r = song(undefined, action);

		const e = {
			bpm: song2.bpm,
			time: song2.time,
			divisionperbeat: song2.divisionperbeat,
			instruments: song2.instruments
		};

		e.divisionnumber = e.bpm * e.time / 60 * e.divisionperbeat;
		e.instruments = JSON.parse(JSON.stringify(e.instruments));
		e.instruments.forEach(i => {
			i.bits = [...Array(e.divisionnumber).keys()].map(d => i.bits[d] || 0);
		});
		
		expect(r.instruments).to.eql(e.instruments);
	});
	it('should fail', () => {
		expect(true).to.equal(false);
	});
});