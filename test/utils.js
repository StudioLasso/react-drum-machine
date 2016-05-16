import chai, { assert, expect } from 'chai';
import shallowDeepEqual from 'chai-shallow-deep-equal';
import deepFreeze from 'deep-freeze';

import * as time from '../src/js/utils/time';

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
		expect(Math.round(time.timeToSize(
			/*time*/34, 
			/*total size*/500, 
			/*total duration*/120))).to.equal(142);
	});
	it('convert size to time', () => {
		expect(Math.round(time.sizeToTime(
			/*size*/300, 
			/*total size*/400, 
			/*total duration*/50))).to.equal(38);
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
})