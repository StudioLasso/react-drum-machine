import chai, { assert, expect } from 'chai';
import shallowDeepEqual from 'chai-shallow-deep-equal';
import deepFreeze from 'deep-freeze';

import * as time from '../src/utils/time';

chai.use(shallowDeepEqual);

describe('utils.time library', () => {
	it('convert time in seconds to division number', () => {
		expect(time.timeToDivision({
			bpm: 46,
			divisionperbeat: 1
		}, 60)).to.equal(46);
		expect(time.timeToDivision({
			bpm: 76,
			divisionperbeat: 4
		}, 0)).to.equal(0);
		expect(time.timeToDivision({
			bpm: 76,
			divisionperbeat: 4
		}, 55.2)).to.equal(280);
	});
	it('convert division number to seconds', () => {
		expect(Number(time.divisionToTime({
			bpm: 110,
			divisionperbeat: 1
		}, 110).toFixed(2))).to.equal(60);
		expect(Number(time.divisionToTime({
			bpm: 110,
			divisionperbeat: 1
		}, 0).toFixed(2))).to.equal(0);
		expect(Number(time.divisionToTime({
			bpm: 110,
			divisionperbeat: 6
		}, 75).toFixed(2))).to.equal(6.82);
	});
	it('convert time to size', () => {
		expect(Math.round(time.timeToSize(32, {
			divisionSize: 16
		}, {
			time: 74,
			bpm: 80,
			divisionperbeat: 4
		}))).to.equal(2731);
	});
	it('convert size to time', () => {
		expect(Math.round(time.sizeToTime(420, {
			divisionSize: 16
		}, {
			bpm: 60,
			divisionperbeat: 4
		}))).to.equal(7);
	});
	it('should return elapsed time', () => {
		expect(time.getElapsedTime({
			startTime: 4
		}, 12)).to.equal(8);

		expect(time.getElapsedTime({
			pausedTime: 5,
			startTime: 2
		}, 12)).to.equal(5);

		expect(time.getElapsedTime({
		}, 15)).to.equal(0);
	});
	it('should return current beat', () => {
		expect(time.getCurrentBeat({
			startTime: 4.1
		}, {
			bpm: 57
		}, 14.7)).to.equal(10);
	});
	it('should return current division', () => {
		expect(time.getCurrentDivision({
			startTime: 4.2
		}, {
			bpm: 57,
			divisionperbeat: 4
		}, 14.7)).to.equal(39);
	});
	it('should return beat size', () => {
		expect(time.getBeatSize({
			divisionSize: 16
		}, {
			divisionperbeat: 4
		})).to.equal(64);
	});
	it('should return measure size', () => {
		expect(time.getMeasureSize({
			divisionSize: 16
		}, {
			divisionperbeat: 4,
			beatpermeasure: 4
		})).to.equal(256);
	});
	it('should return song size',() => {
		expect(time.getSongSize({
			divisionSize: 16
		}, {
			divisionperbeat: 4,
			time: 220,
			bpm: 90
		})).to.equal(21120);
	});
	it('should return measure number', () => {
		expect(time.getMeasureNumber({
			divisionnumber: 193,
			divisionperbeat: 4,
			beatpermeasure: 4
		})).to.equal(13);
	});
})