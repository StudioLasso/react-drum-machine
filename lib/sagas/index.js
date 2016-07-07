'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadSound = loadSound;
exports.loadSounds = loadSounds;
exports.getNotes = getNotes;
exports.scheduleNotes = scheduleNotes;
exports.runScheduler = runScheduler;
exports.watchInitSong = watchInitSong;
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

var _marked = [loadSound, loadSounds, getNotes, scheduleNotes, runScheduler, watchInitSong, watchDrumkitInit, play, pause, stop, seek, watchControlPlayer, changeBit, copyPasteMeasure, watchEditInstruments, root].map(regeneratorRuntime.mark);

var lastDiv = -1;

function loadSound(instrument) {
	var buffer;
	return regeneratorRuntime.wrap(function loadSound$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.next = 2;
					return (0, _effects.call)(_services.fetchSound, instrument.sound, instrument.bearer);

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

function watchInitSong() {
	var _ref, song;

	return regeneratorRuntime.wrap(function watchInitSong$(_context8) {
		while (1) {
			switch (_context8.prev = _context8.next) {
				case 0:
					if (!true) {
						_context8.next = 17;
						break;
					}

					_context8.next = 3;
					return (0, _effects.take)('LOAD_SONG');

				case 3:
					_ref = _context8.sent;
					song = _ref.payload;
					_context8.next = 7;
					return (0, _effects.put)(actions.initSong({ song: song }));

				case 7:
					_context8.next = 9;
					return (0, _effects.call)(loadSounds);

				case 9:
					_context8.next = 11;
					return (0, _effects.call)(_services.initTimer);

				case 11:
					_context8.next = 13;
					return (0, _effects.fork)(runScheduler);

				case 13:
					_context8.next = 15;
					return (0, _effects.put)(actions.songLoaded());

				case 15:
					_context8.next = 0;
					break;

				case 17:
				case 'end':
					return _context8.stop();
			}
		}
	}, _marked[5], this);
}

function watchDrumkitInit() {
	return regeneratorRuntime.wrap(function watchDrumkitInit$(_context9) {
		while (1) {
			switch (_context9.prev = _context9.next) {
				case 0:
					_context9.next = 2;
					return (0, _effects.take)('INIT_DRUMKIT');

				case 2:
					_context9.next = 4;
					return (0, _effects.call)(_services.loadAudioContext);

				case 4:
				case 'end':
					return _context9.stop();
			}
		}
	}, _marked[6], this);
}

function play() {
	var status, currentTime, notes, pausedTime;
	return regeneratorRuntime.wrap(function play$(_context10) {
		while (1) {
			switch (_context10.prev = _context10.next) {
				case 0:
					if (!true) {
						_context10.next = 31;
						break;
					}

					_context10.next = 3;
					return (0, _effects.take)('PLAY');

				case 3:
					_context10.next = 5;
					return (0, _effects.select)(_selectors.getStatus);

				case 5:
					status = _context10.sent;
					_context10.next = 8;
					return (0, _effects.call)(_services.getWebAudioTime);

				case 8:
					currentTime = _context10.sent;

					if (!(status === 'stop')) {
						_context10.next = 19;
						break;
					}

					_context10.next = 12;
					return getNotes(0, 0.1);

				case 12:
					notes = _context10.sent;
					_context10.next = 15;
					return (0, _effects.fork)(scheduleNotes, notes);

				case 15:
					_context10.next = 17;
					return (0, _effects.put)(actions.setStartTime(currentTime));

				case 17:
					_context10.next = 25;
					break;

				case 19:
					if (!(status === 'pause')) {
						_context10.next = 25;
						break;
					}

					_context10.next = 22;
					return (0, _effects.select)(_selectors.getPausedTime);

				case 22:
					pausedTime = _context10.sent;
					_context10.next = 25;
					return (0, _effects.put)(actions.setStartTime(currentTime - pausedTime));

				case 25:
					_context10.next = 27;
					return (0, _effects.put)(actions.setPlayerStatus('play'));

				case 27:
					_context10.next = 29;
					return (0, _effects.call)(_services.startTimer);

				case 29:
					_context10.next = 0;
					break;

				case 31:
				case 'end':
					return _context10.stop();
			}
		}
	}, _marked[7], this);
}

function pause() {
	var status, currentTime, startTime;
	return regeneratorRuntime.wrap(function pause$(_context11) {
		while (1) {
			switch (_context11.prev = _context11.next) {
				case 0:
					if (!true) {
						_context11.next = 23;
						break;
					}

					_context11.next = 3;
					return (0, _effects.take)('PAUSE');

				case 3:
					_context11.next = 5;
					return (0, _effects.select)(_selectors.getStatus);

				case 5:
					status = _context11.sent;

					if (!(status !== 'play')) {
						_context11.next = 8;
						break;
					}

					return _context11.abrupt('continue', 0);

				case 8:
					_context11.next = 10;
					return (0, _effects.call)(_services.getWebAudioTime);

				case 10:
					currentTime = _context11.sent;
					_context11.next = 13;
					return (0, _effects.select)(_selectors.getStartTime);

				case 13:
					startTime = _context11.sent;
					_context11.next = 16;
					return (0, _effects.put)(actions.setPlayerStatus('pause'));

				case 16:
					_context11.next = 18;
					return (0, _effects.call)(_services.stopTimer);

				case 18:
					lastDiv = -1;
					_context11.next = 21;
					return (0, _effects.put)(actions.setPausedTime(currentTime - startTime));

				case 21:
					_context11.next = 0;
					break;

				case 23:
				case 'end':
					return _context11.stop();
			}
		}
	}, _marked[8], this);
}

function stop() {
	return regeneratorRuntime.wrap(function stop$(_context12) {
		while (1) {
			switch (_context12.prev = _context12.next) {
				case 0:
					if (!true) {
						_context12.next = 12;
						break;
					}

					_context12.next = 3;
					return (0, _effects.take)('STOP');

				case 3:
					_context12.next = 5;
					return (0, _effects.put)(actions.setPlayerStatus('stop'));

				case 5:
					_context12.next = 7;
					return (0, _effects.call)(_services.stopTimer);

				case 7:
					lastDiv = -1;
					_context12.next = 10;
					return (0, _effects.put)(actions.setPausedTime(0));

				case 10:
					_context12.next = 0;
					break;

				case 12:
				case 'end':
					return _context12.stop();
			}
		}
	}, _marked[9], this);
}

function seek() {
	var _ref2, _time, currentTime, status;

	return regeneratorRuntime.wrap(function seek$(_context13) {
		while (1) {
			switch (_context13.prev = _context13.next) {
				case 0:
					if (!true) {
						_context13.next = 26;
						break;
					}

					_context13.next = 3;
					return (0, _effects.take)('CHANGE_TIME');

				case 3:
					_ref2 = _context13.sent;
					_time = _ref2.payload;
					_context13.next = 7;
					return (0, _effects.call)(_services.getWebAudioTime);

				case 7:
					currentTime = _context13.sent;

					lastDiv = -1;
					_context13.next = 11;
					return (0, _effects.select)(_selectors.getStatus);

				case 11:
					status = _context13.sent;

					if (!(status === 'play')) {
						_context13.next = 17;
						break;
					}

					_context13.next = 15;
					return (0, _effects.put)(actions.setStartTime(currentTime - _time));

				case 15:
					_context13.next = 24;
					break;

				case 17:
					if (!(status === 'stop' || status === 'pause')) {
						_context13.next = 24;
						break;
					}

					_context13.t0 = status === 'stop';

					if (!_context13.t0) {
						_context13.next = 22;
						break;
					}

					_context13.next = 22;
					return (0, _effects.put)(actions.setPlayerStatus('pause'));

				case 22:
					_context13.next = 24;
					return (0, _effects.put)(actions.setPausedTime(_time));

				case 24:
					_context13.next = 0;
					break;

				case 26:
				case 'end':
					return _context13.stop();
			}
		}
	}, _marked[10], this);
}

function watchControlPlayer() {
	return regeneratorRuntime.wrap(function watchControlPlayer$(_context14) {
		while (1) {
			switch (_context14.prev = _context14.next) {
				case 0:
					_context14.next = 2;
					return (0, _effects.take)('SONG_LOADED');

				case 2:
					_context14.next = 4;
					return [(0, _effects.fork)(play), (0, _effects.fork)(pause), (0, _effects.fork)(stop), (0, _effects.fork)(seek)];

				case 4:
				case 'end':
					return _context14.stop();
			}
		}
	}, _marked[11], this);
}

function changeBit() {
	var _ref3, _ref3$payload, bitIndex, instrumentIndex, i;

	return regeneratorRuntime.wrap(function changeBit$(_context15) {
		while (1) {
			switch (_context15.prev = _context15.next) {
				case 0:
					if (!true) {
						_context15.next = 17;
						break;
					}

					_context15.next = 3;
					return (0, _effects.take)('CHANGE_BIT');

				case 3:
					_ref3 = _context15.sent;
					_ref3$payload = _ref3.payload;
					bitIndex = _ref3$payload.bitIndex;
					instrumentIndex = _ref3$payload.instrumentIndex;
					_context15.next = 9;
					return (0, _effects.select)(_selectors.getInstrument, instrumentIndex);

				case 9:
					i = _context15.sent;

					if (i.bits[bitIndex]) {
						_context15.next = 13;
						break;
					}

					_context15.next = 13;
					return (0, _effects.call)(_services.playSound, i.buffer);

				case 13:
					_context15.next = 15;
					return (0, _effects.put)(actions.bitChanged({
						bitIndex: bitIndex,
						instrumentIndex: instrumentIndex
					}));

				case 15:
					_context15.next = 0;
					break;

				case 17:
				case 'end':
					return _context15.stop();
			}
		}
	}, _marked[12], this);
}

function copyPasteMeasure() {
	var _this = this;

	var _loop;

	return regeneratorRuntime.wrap(function copyPasteMeasure$(_context17) {
		while (1) {
			switch (_context17.prev = _context17.next) {
				case 0:
					_loop = regeneratorRuntime.mark(function _loop() {
						var _ref4, copyIndex, song, startCopyIndex, endCopyIndex, copiedBits, _ref5, pasteIndex;

						return regeneratorRuntime.wrap(function _loop$(_context16) {
							while (1) {
								switch (_context16.prev = _context16.next) {
									case 0:
										_context16.next = 2;
										return (0, _effects.take)('COPY_MEASURE');

									case 2:
										_ref4 = _context16.sent;
										copyIndex = _ref4.payload;
										_context16.next = 6;
										return (0, _effects.select)(_selectors.getSong);

									case 6:
										song = _context16.sent;
										startCopyIndex = copyIndex * song.beatpermeasure * song.divisionperbeat;
										endCopyIndex = startCopyIndex + song.beatpermeasure * song.divisionperbeat;
										copiedBits = song.instruments.map(function (i) {
											return i.bits.slice(startCopyIndex, endCopyIndex);
										});
										_context16.next = 12;
										return (0, _effects.take)('PASTE_MEASURE');

									case 12:
										_ref5 = _context16.sent;
										pasteIndex = _ref5.payload;
										_context16.next = 16;
										return (0, _effects.put)(actions.measurePasted({
											bits: copiedBits,
											pasteIndex: pasteIndex
										}));

									case 16:
									case 'end':
										return _context16.stop();
								}
							}
						}, _loop, _this);
					});

				case 1:
					if (!true) {
						_context17.next = 5;
						break;
					}

					return _context17.delegateYield(_loop(), 't0', 3);

				case 3:
					_context17.next = 1;
					break;

				case 5:
				case 'end':
					return _context17.stop();
			}
		}
	}, _marked[13], this);
}

function watchEditInstruments() {
	return regeneratorRuntime.wrap(function watchEditInstruments$(_context18) {
		while (1) {
			switch (_context18.prev = _context18.next) {
				case 0:
					_context18.next = 2;
					return (0, _effects.take)('SONG_LOADED');

				case 2:
					_context18.next = 4;
					return [(0, _effects.fork)(changeBit), (0, _effects.fork)(copyPasteMeasure)];

				case 4:
				case 'end':
					return _context18.stop();
			}
		}
	}, _marked[14], this);
}

function root() {
	return regeneratorRuntime.wrap(function root$(_context19) {
		while (1) {
			switch (_context19.prev = _context19.next) {
				case 0:
					_context19.next = 2;
					return [(0, _effects.fork)(watchDrumkitInit), (0, _effects.fork)(watchInitSong), (0, _effects.fork)(watchControlPlayer), (0, _effects.fork)(watchEditInstruments)];

				case 2:
				case 'end':
					return _context19.stop();
			}
		}
	}, _marked[15], this);
}