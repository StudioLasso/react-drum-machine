'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadSound = loadSound;
exports.loadSounds = loadSounds;
exports.getNotes = getNotes;
exports.scheduleNotes = scheduleNotes;
exports.runScheduler = runScheduler;
exports.watchDrumkitInit = watchDrumkitInit;
exports.play = play;
exports.pause = pause;
exports.stop = stop;
exports.seek = seek;
exports.watchControlPlayer = watchControlPlayer;
exports.changeBit = changeBit;
exports.copyPasteMeasure = copyPasteMeasure;
exports.watchEditInstruments = watchEditInstruments;
exports.default = root;

var _effects = require('redux-saga/effects');

var _services = require('../services');

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

var _selectors = require('./selectors');

var _time2 = require('../utils/time');

var time = _interopRequireWildcard(_time2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _marked = [loadSound, loadSounds, getNotes, scheduleNotes, runScheduler, watchDrumkitInit, play, pause, stop, seek, watchControlPlayer, changeBit, copyPasteMeasure, watchEditInstruments, root].map(regeneratorRuntime.mark);

var lastDiv = -1;

function loadSound(instrument) {
	var buffer;
	return regeneratorRuntime.wrap(function loadSound$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.next = 2;
					return (0, _effects.call)(_services.fetchSound, instrument.soundurl);

				case 2:
					buffer = _context.sent;
					_context.next = 5;
					return (0, _effects.put)(actions.soundLoaded({ buffer: buffer, instrument: instrument }));

				case 5:
				case 'end':
					return _context.stop();
			}
		}
	}, _marked[0], this);
}

function loadSounds() {
	var song;
	return regeneratorRuntime.wrap(function loadSounds$(_context2) {
		while (1) {
			switch (_context2.prev = _context2.next) {
				case 0:
					_context2.next = 2;
					return (0, _effects.select)(_selectors.getSong);

				case 2:
					song = _context2.sent;
					_context2.next = 5;
					return song.instruments.filter(function (i) {
						return !i.disabled;
					}).map(function (i) {
						return (0, _effects.call)(loadSound, i);
					});

				case 5:
				case 'end':
					return _context2.stop();
			}
		}
	}, _marked[1], this);
}

function getNotes(elapsedTime, aheadTime) {
	var song, bitDuration, startDiv, endDiv;
	return regeneratorRuntime.wrap(function getNotes$(_context3) {
		while (1) {
			switch (_context3.prev = _context3.next) {
				case 0:
					_context3.next = 2;
					return (0, _effects.select)(_selectors.getSong);

				case 2:
					song = _context3.sent;
					bitDuration = song.time / (song.bpm * song.time / 60 * song.divisionperbeat);
					startDiv = time.timeToDivision(song, elapsedTime);
					endDiv = time.timeToDivision(song, elapsedTime + aheadTime);

					// Do not replay already listened notes

					if (!(startDiv <= lastDiv)) {
						_context3.next = 8;
						break;
					}

					return _context3.abrupt('return', []);

				case 8:
					lastDiv = endDiv;

					return _context3.abrupt('return', song.instruments.filter(function (i) {
						return !i.disabled;
					}).map(function (i) {
						var n = {
							bitDuration: bitDuration,
							offset: time.divisionToTime(song, startDiv) - elapsedTime,
							name: i.name,
							buffer: i.buffer,
							bits: i.bits.slice(startDiv, endDiv + 1)
						};

						return n;
					}));

				case 10:
				case 'end':
					return _context3.stop();
			}
		}
	}, _marked[2], this);
}

function scheduleNotes(notes) {
	return regeneratorRuntime.wrap(function scheduleNotes$(_context6) {
		while (1) {
			switch (_context6.prev = _context6.next) {
				case 0:
					_context6.next = 2;
					return notes.map(regeneratorRuntime.mark(function _callee2(note) {
						return regeneratorRuntime.wrap(function _callee2$(_context5) {
							while (1) {
								switch (_context5.prev = _context5.next) {
									case 0:
										_context5.next = 2;
										return note.bits.map(regeneratorRuntime.mark(function _callee(bit, i) {
											return regeneratorRuntime.wrap(function _callee$(_context4) {
												while (1) {
													switch (_context4.prev = _context4.next) {
														case 0:
															if (!bit) {
																_context4.next = 4;
																break;
															}

															_context4.next = 3;
															return (0, _effects.call)(_services.playSound, note.buffer, note.offset + i * note.bitDuration);

														case 3:
															return _context4.abrupt('return', _context4.sent);

														case 4:
														case 'end':
															return _context4.stop();
													}
												}
											}, _callee, this);
										}));

									case 2:
									case 'end':
										return _context5.stop();
								}
							}
						}, _callee2, this);
					}));

				case 2:
				case 'end':
					return _context6.stop();
			}
		}
	}, _marked[3], this);
}

function runScheduler() {
	var webAudioTime, startTime, notes;
	return regeneratorRuntime.wrap(function runScheduler$(_context7) {
		while (1) {
			switch (_context7.prev = _context7.next) {
				case 0:
					if (!true) {
						_context7.next = 16;
						break;
					}

					_context7.next = 3;
					return (0, _effects.call)(_services.waitTimer);

				case 3:
					_context7.next = 5;
					return (0, _effects.call)(_services.getWebAudioTime);

				case 5:
					webAudioTime = _context7.sent;
					_context7.next = 8;
					return (0, _effects.select)(_selectors.getStartTime);

				case 8:
					startTime = _context7.sent;
					_context7.next = 11;
					return getNotes(webAudioTime - startTime, 0.1);

				case 11:
					notes = _context7.sent;
					_context7.next = 14;
					return (0, _effects.fork)(scheduleNotes, notes);

				case 14:
					_context7.next = 0;
					break;

				case 16:
				case 'end':
					return _context7.stop();
			}
		}
	}, _marked[4], this);
}

function watchDrumkitInit() {
	var _ref, id, songs;

	return regeneratorRuntime.wrap(function watchDrumkitInit$(_context8) {
		while (1) {
			switch (_context8.prev = _context8.next) {
				case 0:
					_context8.next = 2;
					return (0, _effects.take)('INIT_DRUMKIT');

				case 2:
					_ref = _context8.sent;
					id = _ref.payload.id;
					_context8.next = 6;
					return (0, _effects.call)(_services.loadAudioContext);

				case 6:
					_context8.next = 8;
					return (0, _effects.call)(_services.fetchSongs);

				case 8:
					songs = _context8.sent;
					_context8.next = 11;
					return (0, _effects.put)(actions.initSong({ song: songs[id] }));

				case 11:
					_context8.next = 13;
					return (0, _effects.call)(loadSounds);

				case 13:
					_context8.next = 15;
					return (0, _effects.call)(_services.initTimer);

				case 15:
					_context8.next = 17;
					return (0, _effects.fork)(runScheduler);

				case 17:
					_context8.next = 19;
					return (0, _effects.put)(actions.songLoaded());

				case 19:
				case 'end':
					return _context8.stop();
			}
		}
	}, _marked[5], this);
}

function play() {
	var status, currentTime, notes, pausedTime;
	return regeneratorRuntime.wrap(function play$(_context9) {
		while (1) {
			switch (_context9.prev = _context9.next) {
				case 0:
					if (!true) {
						_context9.next = 31;
						break;
					}

					_context9.next = 3;
					return (0, _effects.take)('PLAY');

				case 3:
					_context9.next = 5;
					return (0, _effects.select)(_selectors.getStatus);

				case 5:
					status = _context9.sent;
					_context9.next = 8;
					return (0, _effects.call)(_services.getWebAudioTime);

				case 8:
					currentTime = _context9.sent;

					if (!(status === 'stop')) {
						_context9.next = 19;
						break;
					}

					_context9.next = 12;
					return getNotes(0, 0.1);

				case 12:
					notes = _context9.sent;
					_context9.next = 15;
					return (0, _effects.fork)(scheduleNotes, notes);

				case 15:
					_context9.next = 17;
					return (0, _effects.put)(actions.setStartTime(currentTime));

				case 17:
					_context9.next = 25;
					break;

				case 19:
					if (!(status === 'pause')) {
						_context9.next = 25;
						break;
					}

					_context9.next = 22;
					return (0, _effects.select)(_selectors.getPausedTime);

				case 22:
					pausedTime = _context9.sent;
					_context9.next = 25;
					return (0, _effects.put)(actions.setStartTime(currentTime - pausedTime));

				case 25:
					_context9.next = 27;
					return (0, _effects.put)(actions.setPlayerStatus('play'));

				case 27:
					_context9.next = 29;
					return (0, _effects.call)(_services.startTimer);

				case 29:
					_context9.next = 0;
					break;

				case 31:
				case 'end':
					return _context9.stop();
			}
		}
	}, _marked[6], this);
}

function pause() {
	var status, currentTime, startTime;
	return regeneratorRuntime.wrap(function pause$(_context10) {
		while (1) {
			switch (_context10.prev = _context10.next) {
				case 0:
					if (!true) {
						_context10.next = 23;
						break;
					}

					_context10.next = 3;
					return (0, _effects.take)('PAUSE');

				case 3:
					_context10.next = 5;
					return (0, _effects.select)(_selectors.getStatus);

				case 5:
					status = _context10.sent;

					if (!(status !== 'play')) {
						_context10.next = 8;
						break;
					}

					return _context10.abrupt('continue', 0);

				case 8:
					_context10.next = 10;
					return (0, _effects.call)(_services.getWebAudioTime);

				case 10:
					currentTime = _context10.sent;
					_context10.next = 13;
					return (0, _effects.select)(_selectors.getStartTime);

				case 13:
					startTime = _context10.sent;
					_context10.next = 16;
					return (0, _effects.put)(actions.setPlayerStatus('pause'));

				case 16:
					_context10.next = 18;
					return (0, _effects.call)(_services.stopTimer);

				case 18:
					lastDiv = -1;
					_context10.next = 21;
					return (0, _effects.put)(actions.setPausedTime(currentTime - startTime));

				case 21:
					_context10.next = 0;
					break;

				case 23:
				case 'end':
					return _context10.stop();
			}
		}
	}, _marked[7], this);
}

function stop() {
	return regeneratorRuntime.wrap(function stop$(_context11) {
		while (1) {
			switch (_context11.prev = _context11.next) {
				case 0:
					if (!true) {
						_context11.next = 12;
						break;
					}

					_context11.next = 3;
					return (0, _effects.take)('STOP');

				case 3:
					_context11.next = 5;
					return (0, _effects.put)(actions.setPlayerStatus('stop'));

				case 5:
					_context11.next = 7;
					return (0, _effects.call)(_services.stopTimer);

				case 7:
					lastDiv = -1;
					_context11.next = 10;
					return (0, _effects.put)(actions.setPausedTime(0));

				case 10:
					_context11.next = 0;
					break;

				case 12:
				case 'end':
					return _context11.stop();
			}
		}
	}, _marked[8], this);
}

function seek() {
	var _ref2, _time, currentTime, status;

	return regeneratorRuntime.wrap(function seek$(_context12) {
		while (1) {
			switch (_context12.prev = _context12.next) {
				case 0:
					if (!true) {
						_context12.next = 26;
						break;
					}

					_context12.next = 3;
					return (0, _effects.take)('CHANGE_TIME');

				case 3:
					_ref2 = _context12.sent;
					_time = _ref2.payload;
					_context12.next = 7;
					return (0, _effects.call)(_services.getWebAudioTime);

				case 7:
					currentTime = _context12.sent;

					lastDiv = -1;
					_context12.next = 11;
					return (0, _effects.select)(_selectors.getStatus);

				case 11:
					status = _context12.sent;

					if (!(status === 'play')) {
						_context12.next = 17;
						break;
					}

					_context12.next = 15;
					return (0, _effects.put)(actions.setStartTime(currentTime - _time));

				case 15:
					_context12.next = 24;
					break;

				case 17:
					if (!(status === 'stop' || status === 'pause')) {
						_context12.next = 24;
						break;
					}

					_context12.t0 = status === 'stop';

					if (!_context12.t0) {
						_context12.next = 22;
						break;
					}

					_context12.next = 22;
					return (0, _effects.put)(actions.setPlayerStatus('pause'));

				case 22:
					_context12.next = 24;
					return (0, _effects.put)(actions.setPausedTime(_time));

				case 24:
					_context12.next = 0;
					break;

				case 26:
				case 'end':
					return _context12.stop();
			}
		}
	}, _marked[9], this);
}

function watchControlPlayer() {
	return regeneratorRuntime.wrap(function watchControlPlayer$(_context13) {
		while (1) {
			switch (_context13.prev = _context13.next) {
				case 0:
					_context13.next = 2;
					return (0, _effects.take)('SONG_LOADED');

				case 2:
					_context13.next = 4;
					return [(0, _effects.fork)(play), (0, _effects.fork)(pause), (0, _effects.fork)(stop), (0, _effects.fork)(seek)];

				case 4:
				case 'end':
					return _context13.stop();
			}
		}
	}, _marked[10], this);
}

function changeBit() {
	var _ref3, _ref3$payload, bitIndex, instrumentIndex, i;

	return regeneratorRuntime.wrap(function changeBit$(_context14) {
		while (1) {
			switch (_context14.prev = _context14.next) {
				case 0:
					if (!true) {
						_context14.next = 17;
						break;
					}

					_context14.next = 3;
					return (0, _effects.take)('CHANGE_BIT');

				case 3:
					_ref3 = _context14.sent;
					_ref3$payload = _ref3.payload;
					bitIndex = _ref3$payload.bitIndex;
					instrumentIndex = _ref3$payload.instrumentIndex;
					_context14.next = 9;
					return (0, _effects.select)(_selectors.getInstrument, instrumentIndex);

				case 9:
					i = _context14.sent;

					if (i.bits[bitIndex]) {
						_context14.next = 13;
						break;
					}

					_context14.next = 13;
					return (0, _effects.call)(_services.playSound, i.buffer);

				case 13:
					_context14.next = 15;
					return (0, _effects.put)(actions.bitChanged({
						bitIndex: bitIndex,
						instrumentIndex: instrumentIndex
					}));

				case 15:
					_context14.next = 0;
					break;

				case 17:
				case 'end':
					return _context14.stop();
			}
		}
	}, _marked[11], this);
}

function copyPasteMeasure() {
	var _this = this;

	var _loop;

	return regeneratorRuntime.wrap(function copyPasteMeasure$(_context16) {
		while (1) {
			switch (_context16.prev = _context16.next) {
				case 0:
					_loop = regeneratorRuntime.mark(function _loop() {
						var _ref4, copyIndex, song, startCopyIndex, endCopyIndex, copiedBits, _ref5, pasteIndex;

						return regeneratorRuntime.wrap(function _loop$(_context15) {
							while (1) {
								switch (_context15.prev = _context15.next) {
									case 0:
										_context15.next = 2;
										return (0, _effects.take)('COPY_MEASURE');

									case 2:
										_ref4 = _context15.sent;
										copyIndex = _ref4.payload;
										_context15.next = 6;
										return (0, _effects.select)(_selectors.getSong);

									case 6:
										song = _context15.sent;
										startCopyIndex = copyIndex * song.beatpermeasure * song.divisionperbeat;
										endCopyIndex = startCopyIndex + song.beatpermeasure * song.divisionperbeat;
										copiedBits = song.instruments.map(function (i) {
											return i.bits.slice(startCopyIndex, endCopyIndex);
										});
										_context15.next = 12;
										return (0, _effects.take)('PASTE_MEASURE');

									case 12:
										_ref5 = _context15.sent;
										pasteIndex = _ref5.payload;
										_context15.next = 16;
										return (0, _effects.put)(actions.measurePasted({
											bits: copiedBits,
											pasteIndex: pasteIndex
										}));

									case 16:
									case 'end':
										return _context15.stop();
								}
							}
						}, _loop, _this);
					});

				case 1:
					if (!true) {
						_context16.next = 5;
						break;
					}

					return _context16.delegateYield(_loop(), 't0', 3);

				case 3:
					_context16.next = 1;
					break;

				case 5:
				case 'end':
					return _context16.stop();
			}
		}
	}, _marked[12], this);
}

function watchEditInstruments() {
	return regeneratorRuntime.wrap(function watchEditInstruments$(_context17) {
		while (1) {
			switch (_context17.prev = _context17.next) {
				case 0:
					_context17.next = 2;
					return (0, _effects.take)('SONG_LOADED');

				case 2:
					_context17.next = 4;
					return [(0, _effects.fork)(changeBit), (0, _effects.fork)(copyPasteMeasure)];

				case 4:
				case 'end':
					return _context17.stop();
			}
		}
	}, _marked[13], this);
}

function root() {
	return regeneratorRuntime.wrap(function root$(_context18) {
		while (1) {
			switch (_context18.prev = _context18.next) {
				case 0:
					_context18.next = 2;
					return [(0, _effects.fork)(watchDrumkitInit), (0, _effects.fork)(watchControlPlayer), (0, _effects.fork)(watchEditInstruments)];

				case 2:
				case 'end':
					return _context18.stop();
			}
		}
	}, _marked[14], this);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zYWdhcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztRQWtCaUIsUyxHQUFBLFM7UUFLQSxVLEdBQUEsVTtRQUtBLFEsR0FBQSxRO1FBeUJBLGEsR0FBQSxhO1FBVUEsWSxHQUFBLFk7UUFVQSxnQixHQUFBLGdCO1FBV0EsSSxHQUFBLEk7UUFtQkEsSyxHQUFBLEs7UUFnQkEsSSxHQUFBLEk7UUFVQSxJLEdBQUEsSTtRQWdCQSxrQixHQUFBLGtCO1FBVUEsUyxHQUFBLFM7UUFvQkEsZ0IsR0FBQSxnQjtRQWlCQSxvQixHQUFBLG9CO2tCQVFRLEk7O0FBeE16Qjs7QUFDQTs7QUFXQTs7SUFBWSxPOztBQUNaOztBQUNBOztJQUFZLEk7Ozs7ZUFJSyxTLEVBS0EsVSxFQUtBLFEsRUF5QkEsYSxFQVVBLFksRUFVQSxnQixFQVdBLEksRUFtQkEsSyxFQWdCQSxJLEVBVUEsSSxFQWdCQSxrQixFQVVBLFMsRUFvQkEsZ0IsRUFpQkEsb0IsRUFRUSxJOztBQXhMekIsSUFBSSxVQUFRLENBQUMsQ0FBYjs7QUFFTyxTQUFVLFNBQVYsQ0FBb0IsVUFBcEI7QUFBQSxLQUNBLE1BREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFDZSx5Q0FBaUIsV0FBVyxRQUE1QixDQURmOztBQUFBO0FBQ0EsV0FEQTtBQUFBO0FBQUEsWUFFQSxrQkFBSSxRQUFRLFdBQVIsQ0FBb0IsRUFBQyxjQUFELEVBQVMsc0JBQVQsRUFBcEIsQ0FBSixDQUZBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUtBLFNBQVUsVUFBVjtBQUFBLEtBQ0EsSUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUNhLHdDQURiOztBQUFBO0FBQ0EsU0FEQTtBQUFBO0FBQUEsWUFFQSxLQUFLLFdBQUwsQ0FBaUIsTUFBakIsQ0FBd0I7QUFBQSxhQUFLLENBQUMsRUFBRSxRQUFSO0FBQUEsTUFBeEIsRUFBMEMsR0FBMUMs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RCxHQU1jLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixhQUFLO0FBQzVDLGtCQUFPLEVBQUUsSUFBRixDQUFPLEtBQVAsQ0FBYSxjQUFiLEVBQTZCLFlBQTdCLENBQVA7QUFDQSxXQUZrQixDQU5kO0FBQUE7QUFBQSxpQkFTaUMsbUJBQUssZUFBTCxDQVRqQzs7QUFBQTtBQUFBO0FBU1ksb0JBVFosU0FTRyxPQVRIO0FBQUE7QUFBQSxpQkFVQyxrQkFBSSxRQUFRLGFBQVIsQ0FBc0I7QUFDL0IsaUJBQU0sVUFEeUI7QUFFL0I7QUFGK0IsV0FBdEIsQ0FBSixDQVZEOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsVUFDQyxJQUREO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFpQkEsU0FBVSxvQkFBVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUNBLG1CQUFLLGFBQUwsQ0FEQTs7QUFBQTtBQUFBO0FBQUEsWUFFQSxDQUNMLG1CQUFLLFNBQUwsQ0FESyxFQUVMLG1CQUFLLGdCQUFMLENBRkssQ0FGQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFRUSxTQUFVLElBQVY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFDUixDQUNMLG1CQUFLLGdCQUFMLENBREssRUFFTCxtQkFBSyxrQkFBTCxDQUZLLEVBR0wsbUJBQUssb0JBQUwsQ0FISyxDQURROztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGFrZSwgY2FsbCwgcHV0LCBmb3JrLCBzZWxlY3QgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xuaW1wb3J0IHsgXG5cdGZldGNoU29uZ3MsIFxuXHRsb2FkQXVkaW9Db250ZXh0LCBcblx0ZmV0Y2hTb3VuZCxcblx0Z2V0V2ViQXVkaW9UaW1lLFxuXHRwbGF5U291bmQsXG5cdHdhaXRUaW1lcixcblx0aW5pdFRpbWVyLFxuXHRzdGFydFRpbWVyLFxuXHRzdG9wVGltZXJcbn0gZnJvbSAnLi4vc2VydmljZXMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IGdldFNvbmcsIGdldFN0YXJ0VGltZSwgZ2V0U3RhdHVzLCBnZXRQYXVzZWRUaW1lLCBnZXRJbnN0cnVtZW50IH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuaW1wb3J0ICogYXMgdGltZSBmcm9tICcuLi91dGlscy90aW1lJztcblxubGV0IGxhc3REaXY9LTE7XG5cbmV4cG9ydCBmdW5jdGlvbiogbG9hZFNvdW5kKGluc3RydW1lbnQpIHtcblx0Y29uc3QgYnVmZmVyID0geWllbGQgY2FsbChmZXRjaFNvdW5kLCBpbnN0cnVtZW50LnNvdW5kdXJsKTtcblx0eWllbGQgcHV0KGFjdGlvbnMuc291bmRMb2FkZWQoe2J1ZmZlciwgaW5zdHJ1bWVudH0pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uKiBsb2FkU291bmRzKCkge1xuXHRjb25zdCBzb25nID0geWllbGQgc2VsZWN0KGdldFNvbmcpO1xuXHR5aWVsZCBzb25nLmluc3RydW1lbnRzLmZpbHRlcihpID0+ICFpLmRpc2FibGVkKS5tYXAoaSA9PiBjYWxsKGxvYWRTb3VuZCwgaSkpO1xufVx0XG5cbmV4cG9ydCBmdW5jdGlvbiogZ2V0Tm90ZXMoZWxhcHNlZFRpbWUsIGFoZWFkVGltZSkge1xuXHRjb25zdCBzb25nID0geWllbGQgc2VsZWN0KGdldFNvbmcpO1xuXHRjb25zdCBiaXREdXJhdGlvbiA9IHNvbmcudGltZSAvIChzb25nLmJwbSAqIHNvbmcudGltZSAvIDYwICogc29uZy5kaXZpc2lvbnBlcmJlYXQpOyBcblx0Y29uc3Qgc3RhcnREaXYgPSB0aW1lLnRpbWVUb0RpdmlzaW9uKHNvbmcsIGVsYXBzZWRUaW1lKTtcblx0Y29uc3QgZW5kRGl2ID0gdGltZS50aW1lVG9EaXZpc2lvbihzb25nLCBlbGFwc2VkVGltZSthaGVhZFRpbWUpO1xuXG5cdC8vIERvIG5vdCByZXBsYXkgYWxyZWFkeSBsaXN0ZW5lZCBub3Rlc1xuXHRpZiAoc3RhcnREaXYgPD0gbGFzdERpdikge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXHRsYXN0RGl2ID0gZW5kRGl2O1xuXG5cdHJldHVybiBzb25nLmluc3RydW1lbnRzLmZpbHRlcihpID0+ICFpLmRpc2FibGVkKS5tYXAoaSA9PiB7XG5cdFx0Y29uc3QgbiA9IHtcblx0XHRcdGJpdER1cmF0aW9uLFxuXHRcdFx0b2Zmc2V0OiB0aW1lLmRpdmlzaW9uVG9UaW1lKHNvbmcsIHN0YXJ0RGl2KSAtIGVsYXBzZWRUaW1lLFxuXHRcdFx0bmFtZTogaS5uYW1lLFxuXHRcdFx0YnVmZmVyOiBpLmJ1ZmZlcixcblx0XHRcdGJpdHM6IGkuYml0cy5zbGljZShzdGFydERpdiwgZW5kRGl2KzEpXG5cdFx0fTtcblxuXHRcdHJldHVybiBuO1xuXHR9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uKiBzY2hlZHVsZU5vdGVzKG5vdGVzKSB7XG5cdHlpZWxkIG5vdGVzLm1hcChmdW5jdGlvbioobm90ZSkge1xuXHRcdHlpZWxkIG5vdGUuYml0cy5tYXAoZnVuY3Rpb24qIChiaXQsIGkpIHtcblx0XHRcdGlmIChiaXQpIHtcblx0XHRcdFx0cmV0dXJuIHlpZWxkIGNhbGwocGxheVNvdW5kLCBub3RlLmJ1ZmZlciwgbm90ZS5vZmZzZXQgKyBpICogbm90ZS5iaXREdXJhdGlvbik7XHRcdFx0XHRcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiogcnVuU2NoZWR1bGVyKCkge1xuXHR3aGlsZSAodHJ1ZSkge1xuXHRcdHlpZWxkIGNhbGwod2FpdFRpbWVyKTtcblx0XHRsZXQgd2ViQXVkaW9UaW1lID0geWllbGQgY2FsbChnZXRXZWJBdWRpb1RpbWUpO1xuXHRcdGNvbnN0IHN0YXJ0VGltZSA9IHlpZWxkIHNlbGVjdChnZXRTdGFydFRpbWUpO1xuXHRcdGNvbnN0IG5vdGVzID0geWllbGQgZ2V0Tm90ZXMod2ViQXVkaW9UaW1lIC0gc3RhcnRUaW1lLCAwLjEpO1xuXHRcdHlpZWxkIGZvcmsoc2NoZWR1bGVOb3Rlcywgbm90ZXMpO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiogd2F0Y2hEcnVta2l0SW5pdCgpIHtcblx0Y29uc3QgeyBwYXlsb2FkOiB7IGlkIH0gfSA9IHlpZWxkIHRha2UoJ0lOSVRfRFJVTUtJVCcpO1xuXHR5aWVsZCBjYWxsKGxvYWRBdWRpb0NvbnRleHQpO1xuXHRjb25zdCBzb25ncyA9IHlpZWxkIGNhbGwoZmV0Y2hTb25ncyk7XG5cdHlpZWxkIHB1dChhY3Rpb25zLmluaXRTb25nKHsgc29uZzogc29uZ3NbaWRdIH0pKTtcblx0eWllbGQgY2FsbChsb2FkU291bmRzKTtcblx0eWllbGQgY2FsbChpbml0VGltZXIpO1xuXHR5aWVsZCBmb3JrKHJ1blNjaGVkdWxlcik7XG5cdHlpZWxkIHB1dChhY3Rpb25zLnNvbmdMb2FkZWQoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiogcGxheSgpIHtcblx0d2hpbGUgKHRydWUpIHtcblx0XHR5aWVsZCB0YWtlKCdQTEFZJyk7XG5cdFx0Y29uc3Qgc3RhdHVzID0geWllbGQgc2VsZWN0KGdldFN0YXR1cyk7XG5cdFx0Y29uc3QgY3VycmVudFRpbWUgPSB5aWVsZCBjYWxsKGdldFdlYkF1ZGlvVGltZSk7XG5cdFx0aWYgKHN0YXR1cyA9PT0gJ3N0b3AnKSB7XG5cdFx0XHRjb25zdCBub3RlcyA9IHlpZWxkIGdldE5vdGVzKDAsIDAuMSk7XG5cdFx0XHR5aWVsZCBmb3JrKHNjaGVkdWxlTm90ZXMsIG5vdGVzKTtcblx0XHRcdHlpZWxkIHB1dChhY3Rpb25zLnNldFN0YXJ0VGltZShjdXJyZW50VGltZSkpO1xuXHRcdH1cblx0XHRlbHNlIGlmIChzdGF0dXMgPT09ICdwYXVzZScpIHtcblx0XHRcdGNvbnN0IHBhdXNlZFRpbWUgPSB5aWVsZCBzZWxlY3QoZ2V0UGF1c2VkVGltZSk7XG5cdFx0XHR5aWVsZCBwdXQoYWN0aW9ucy5zZXRTdGFydFRpbWUoY3VycmVudFRpbWUgLSBwYXVzZWRUaW1lKSk7XHRcdFx0XG5cdFx0fVxuXHRcdHlpZWxkIHB1dChhY3Rpb25zLnNldFBsYXllclN0YXR1cygncGxheScpKTtcblx0XHR5aWVsZCBjYWxsKHN0YXJ0VGltZXIpO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqcGF1c2UoKSB7XG5cdHdoaWxlICh0cnVlKSB7XG5cdFx0eWllbGQgdGFrZSgnUEFVU0UnKTtcblx0XHRjb25zdCBzdGF0dXMgPSB5aWVsZCBzZWxlY3QoZ2V0U3RhdHVzKTtcblx0XHRpZiAoc3RhdHVzICE9PSAncGxheScpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0XHRjb25zdCBjdXJyZW50VGltZSA9IHlpZWxkIGNhbGwoZ2V0V2ViQXVkaW9UaW1lKTtcblx0XHRjb25zdCBzdGFydFRpbWUgPSB5aWVsZCBzZWxlY3QoZ2V0U3RhcnRUaW1lKTtcblx0XHR5aWVsZCBwdXQoYWN0aW9ucy5zZXRQbGF5ZXJTdGF0dXMoJ3BhdXNlJykpO1xuXHRcdHlpZWxkIGNhbGwoc3RvcFRpbWVyKTtcblx0XHRsYXN0RGl2ID0gLTE7XG5cdFx0eWllbGQgcHV0KGFjdGlvbnMuc2V0UGF1c2VkVGltZShjdXJyZW50VGltZSAtIHN0YXJ0VGltZSkpO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqc3RvcCgpIHtcblx0d2hpbGUgKHRydWUpIHtcblx0XHR5aWVsZCB0YWtlKCdTVE9QJyk7XG5cdFx0eWllbGQgcHV0KGFjdGlvbnMuc2V0UGxheWVyU3RhdHVzKCdzdG9wJykpO1xuXHRcdHlpZWxkIGNhbGwoc3RvcFRpbWVyKTtcblx0XHRsYXN0RGl2ID0gLTE7XG5cdFx0eWllbGQgcHV0KGFjdGlvbnMuc2V0UGF1c2VkVGltZSgwKSk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uICpzZWVrKCkge1xuXHR3aGlsZSAodHJ1ZSkge1xuXHRcdGNvbnN0IHsgcGF5bG9hZCA6IHRpbWUgfSA9IHlpZWxkIHRha2UoJ0NIQU5HRV9USU1FJyk7XG5cdFx0Y29uc3QgY3VycmVudFRpbWUgPSB5aWVsZCBjYWxsKGdldFdlYkF1ZGlvVGltZSk7XG5cdFx0bGFzdERpdiA9IC0xO1xuXHRcdGNvbnN0IHN0YXR1cyA9IHlpZWxkIHNlbGVjdChnZXRTdGF0dXMpO1xuXHRcdGlmIChzdGF0dXMgPT09ICdwbGF5Jykge1xuXHRcdFx0eWllbGQgcHV0KGFjdGlvbnMuc2V0U3RhcnRUaW1lKGN1cnJlbnRUaW1lIC0gdGltZSkpO1x0XHRcdFxuXHRcdH1cblx0XHRlbHNlIGlmIChzdGF0dXMgPT09ICdzdG9wJyB8fCBzdGF0dXMgPT09ICdwYXVzZScpIHtcblx0XHRcdHN0YXR1cyA9PT0gJ3N0b3AnICYmICh5aWVsZCBwdXQoYWN0aW9ucy5zZXRQbGF5ZXJTdGF0dXMoJ3BhdXNlJykpKTtcdFx0XHRcdFxuXHRcdFx0eWllbGQgcHV0KGFjdGlvbnMuc2V0UGF1c2VkVGltZSh0aW1lKSk7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqd2F0Y2hDb250cm9sUGxheWVyKCkge1xuXHR5aWVsZCB0YWtlKCdTT05HX0xPQURFRCcpO1xuXHR5aWVsZCBbXG5cdFx0Zm9yayhwbGF5KSxcblx0XHRmb3JrKHBhdXNlKSxcblx0XHRmb3JrKHN0b3ApLFxuXHRcdGZvcmsoc2Vlaylcblx0XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uICpjaGFuZ2VCaXQoKSB7XG5cdHdoaWxlICh0cnVlKSB7XG5cdFx0Y29uc3QgeyBcblx0XHRcdHBheWxvYWQ6IHtcblx0XHRcdFx0Yml0SW5kZXgsIFxuXHRcdFx0XHRpbnN0cnVtZW50SW5kZXhcblx0XHRcdH1cblx0XHR9ID0geWllbGQgdGFrZSgnQ0hBTkdFX0JJVCcpO1xuXG5cdFx0Y29uc3QgaSA9IHlpZWxkIHNlbGVjdChnZXRJbnN0cnVtZW50LCBpbnN0cnVtZW50SW5kZXgpO1xuXHRcdGlmICghaS5iaXRzW2JpdEluZGV4XSkge1xuXHRcdFx0eWllbGQgY2FsbChwbGF5U291bmQsIGkuYnVmZmVyKTtcblx0XHR9XG5cdFx0eWllbGQgcHV0KGFjdGlvbnMuYml0Q2hhbmdlZCh7XG5cdFx0XHRiaXRJbmRleCxcblx0XHRcdGluc3RydW1lbnRJbmRleFxuXHRcdH0pKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gKmNvcHlQYXN0ZU1lYXN1cmUoKSB7XG5cdHdoaWxlICh0cnVlKSB7XG5cdFx0Y29uc3QgeyBwYXlsb2FkOiBjb3B5SW5kZXggfSA9IHlpZWxkIHRha2UoJ0NPUFlfTUVBU1VSRScpO1xuXHRcdGNvbnN0IHNvbmcgPSB5aWVsZCBzZWxlY3QoZ2V0U29uZyk7XG5cdFx0Y29uc3Qgc3RhcnRDb3B5SW5kZXggPSBjb3B5SW5kZXggKiBzb25nLmJlYXRwZXJtZWFzdXJlICogc29uZy5kaXZpc2lvbnBlcmJlYXQ7XG5cdFx0Y29uc3QgZW5kQ29weUluZGV4ID0gc3RhcnRDb3B5SW5kZXggKyBzb25nLmJlYXRwZXJtZWFzdXJlICogc29uZy5kaXZpc2lvbnBlcmJlYXQ7XG5cdFx0Y29uc3QgY29waWVkQml0cyA9IHNvbmcuaW5zdHJ1bWVudHMubWFwKGkgPT4ge1xuXHRcdFx0cmV0dXJuIGkuYml0cy5zbGljZShzdGFydENvcHlJbmRleCwgZW5kQ29weUluZGV4KTtcblx0XHR9KTtcblx0XHRjb25zdCB7IHBheWxvYWQ6IHBhc3RlSW5kZXggfSA9IHlpZWxkIHRha2UoJ1BBU1RFX01FQVNVUkUnKTtcblx0XHR5aWVsZCBwdXQoYWN0aW9ucy5tZWFzdXJlUGFzdGVkKHtcblx0XHRcdGJpdHM6IGNvcGllZEJpdHMsXG5cdFx0XHRwYXN0ZUluZGV4XG5cdFx0fSkpO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAqd2F0Y2hFZGl0SW5zdHJ1bWVudHMoKSB7XG5cdHlpZWxkIHRha2UoJ1NPTkdfTE9BREVEJyk7XG5cdHlpZWxkIFtcblx0XHRmb3JrKGNoYW5nZUJpdCksXG5cdFx0Zm9yayhjb3B5UGFzdGVNZWFzdXJlKVxuXHRdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAqcm9vdCgpIHtcblx0eWllbGQgW1xuXHRcdGZvcmsod2F0Y2hEcnVta2l0SW5pdCksXG5cdFx0Zm9yayh3YXRjaENvbnRyb2xQbGF5ZXIpLFxuXHRcdGZvcmsod2F0Y2hFZGl0SW5zdHJ1bWVudHMpXG5cdF07XG59Il19