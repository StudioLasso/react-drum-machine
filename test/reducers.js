import chai, { assert, expect } from 'chai';
import shallowDeepEqual from 'chai-shallow-deep-equal';
import deepFreeze from 'deep-freeze';

import song from '../src/reducers/song';
import player from '../src/reducers/player';
import * as actions from '../src/actions';

chai.use(shallowDeepEqual);

const song1 = {
	title: "Test",
	beatpermeasure: 4,
	bpm: 79,
	divisionperbeat: 4,
	instruments: [
		{
			title: "hihat",
			image: "img/hihat.png",
			sound: "https://content.dropboxapi.com/1/files/auto/CyCdh_K3ClHat-01.wav",
			bits: [0, 0, 0, 1, 0, 1, 1, 0]
		},
		{
			title: "snare",
			image: "http://i.imgur.com/NwDw9lZ.png",
			sound: "https://content.dropboxapi.com/1/files/auto/snare.mp3",
			bits: [0, 1, 0, 0, 0, 0, 0, 0]
		}
	]
}

const song2 = {
	title: "Test",
	beatpermeasure: 4,
	bpm: 4,
	divisionperbeat: 2,
	instruments: [
		{
			title: "hihat",
			image: "img/hihat.png",
			sound: "https://content.dropboxapi.com/1/files/auto/CyCdh_K3ClHat-01.wav",
			bits: [0]
		},
		{
			title: "snare",
			image: "http://i.imgur.com/NwDw9lZ.png",
			sound: "https://content.dropboxapi.com/1/files/auto/snare.mp3",
			bits: [0, 1]
		}
	]
};

describe('player reducer', () => {
	it('shoud set start time', () => {
		const action = actions.setStartTime(20);
		deepFreeze(action);
		const r = player(undefined, action);

		expect(r.startTime).to.equal(20)
	});
	it('shoud set status', () => {
		const action = actions.setPlayerStatus('play');
		deepFreeze(action);
		const r = player(undefined, action);

		expect(r.status).to.equal('play')
	});
	it('shoud set paused at time', () => {
		const action = actions.setPausedTime(2);
		deepFreeze(action);
		const r = player(undefined, action);

		expect(r.pausedTime).to.equal(2)
	});
	it('shoud reset startTime when status set to play', () => {
		let action = actions.setStartTime(3);
		deepFreeze(action);
		let r = player(undefined, action);

		expect(r.startTime).to.equal(3);

		action = actions.setPlayerStatus('stop');
		deepFreeze(action);
		r = player(undefined, action);

		expect(r.startTime).to.equal(undefined);
	});
	it('shoud reset pausedTime when status set to play', () => {
		let action = actions.setPausedTime(3);
		deepFreeze(action);
		let r = player(undefined, action);

		expect(r.pausedTime).to.equal(3);

		action = actions.setPlayerStatus('play');
		deepFreeze(action);
		r = player(undefined, action);

		expect(r.pausedTime).to.equal(undefined);
	});
	it('shoud change current beat', () => {
		const action = actions.currentBeatChange(5)
		deepFreeze(action)
		const r = player(undefined, action)

		expect(r.currentbeat).to.equal(5)	
	});
	it('shoud change division size', () => {
		const action = actions.setDivisionSize(12)
		deepFreeze(action)
		const r = player(undefined, action)

		expect(r.divisionSize).to.equal(12)	
	});
});

describe('song reducer', () => {
	it('should init general properties of song', () => {
		const action = actions.initSong({ song: song1});
		deepFreeze(action);
		const r = song(undefined, action);

		const e = {
			title: 'Test',
			bpm: song1.bpm,
			beatpermeasure: song1.beatpermeasure,
			divisionperbeat: song1.divisionperbeat
		};

		e.divisionnumber = Math.max.apply(Math, song1.instruments.map(i=>i.bits.length));

		expect(r).to.shallowDeepEqual(e);
	});
	it('should init bits for all instruments', () => {
		const action = actions.initSong({ song: song2});
		deepFreeze(action);
		const r = song(undefined, action);

		const e = {
			title: 'Test',
			bpm: song2.bpm,
			divisionperbeat: song2.divisionperbeat,
			instruments: song2.instruments
		};

		e.divisionnumber = Math.max.apply(Math, song2.instruments.map(i=>i.bits.length));
		e.instruments = JSON.parse(JSON.stringify(e.instruments));
		e.instruments.forEach(i => {
			i.bits = [...Array(e.divisionnumber).keys()].map(d => i.bits[d] || 0);
		});
		
		expect(r.instruments).to.eql(e.instruments);
	});
	it('should flag loaded song', () => {
		const action = actions.songLoaded();
		deepFreeze(action);
		const r = song(undefined, action);

		expect(r.loaded).to.equal(true);
	});
});