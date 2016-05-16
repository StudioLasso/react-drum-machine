import chai, { assert, expect } from 'chai';
import shallowDeepEqual from 'chai-shallow-deep-equal';
import deepFreeze from 'deep-freeze';

import song from '../src/js/reducers/song';
import player from '../src/js/reducers/player';
import * as actions from '../src/js/actions';

chai.use(shallowDeepEqual);

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
});

describe('song reducer', () => {
	it('should init general properties of song', () => {
		const action = actions.initSong({ song: song1});
		deepFreeze(action);
		const r = song(undefined, action);

		const e = {
			bpm: song1.bpm,
			time: song1.time,
			beatpermeasure: song1.beatpermeasure,
			divisionperbeat: song1.divisionperbeat
		}

		e.divisionnumber = e.bpm * e.time / 60 * e.divisionperbeat;

		expect(r).to.shallowDeepEqual(e);
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
	it('should flag loaded song', () => {
		const action = actions.songLoaded();
		deepFreeze(action);
		const r = song(undefined, action);

		expect(r.loaded).to.equal(true);
	});
});