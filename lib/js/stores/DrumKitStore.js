'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var DrumKitDispatcher = require('../dispatcher/DrumKitDispatcher');
var DrumKitConstants = require('../constants/DrumKitConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Firebase = require('firebase');

var CHANGE_EVENT = 'change';
var CURRENT_DIVISION = 'currentdivision';
var TIME_CHANGED = 'timechanged';
var CURRENT_BEAT = 'currentbeat';

var _data = {
  bpm: 0,
  time: 0,
  divisionnumber: 0,
  elapsedtime: 0,
  divisionperbeat: 1,
  beatpermeasure: 1,
  measurecopied: [],
  instruments: []
};

var currentDivision = 0;
var currentBeat = 0;

var audioCtx;
var soundkit = [];

var timerId;
var startTime = 0;
var elapsedTime = 0;
var noteTime;

function loadAudioContext() {
  try {
    if (!audioCtx) {
      // Fix up for prefixing
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
  } catch (e) {
    alert('Web Audio API is not supported in this browser');
  }
}

function playSound(buffer, playtime) {
  var source = audioCtx.createBufferSource(); // creates a sound source
  source.buffer = buffer; // tell the source which sound to play
  source.connect(audioCtx.destination); // connect the source to the context's destination (the speakers)
  source.start(playtime); // play the source now                                           // note: on older systems, may have to use deprecated noteOn(time);
}

function loadSounds() {
  soundkit = [];
  for (var i = 0; i < _data.instruments.length; i++) {
    soundkit.push("");
  }
  for (var i = 0; i < _data.instruments.length; i++) {
    loadSound(_data.instruments[i].soundurl, i);
  }
}

function loadSound(url, index) {
  var result;
  var accesstoken = 'JfnDpAnZcQ8AAAAAAAABYbt6Zvq6-U10DeFgzcZEbz7XYZrTv9ugPuuRl0ai9BFR';

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  request.setRequestHeader("Authorization", "Bearer " + accesstoken);

  // Decode asynchronously
  request.onload = function () {
    audioCtx.decodeAudioData(request.response, function (buffer) {
      soundkit[index] = buffer;
      console.log(soundkit);
      console.log(url + " Sound loaded");
    }, function (error) {
      console.error("decodeAudioData error", error);
    });
  };
  request.send();
}

function setDivisions() {
  _data.divisionnumber = parseInt(_data.bpm) * parseInt(_data.time) / 60 * _data.divisionperbeat;
  //Pour chaque instrument
  for (var i = 0; i < _data.instruments.length; i++) {
    var newbitsarray = [];
    for (var j = 0; j < _data.divisionnumber; j++) {
      if (_data.instruments[i].bits[j]) {
        newbitsarray.push(_data.instruments[i].bits[j]);
      } else {
        newbitsarray.push(0);
      }
    }
    _data.instruments[i].bits = newbitsarray;
  }
}

function pauseDrum() {
  elapsedTime = audioCtx.currentTime - startTime + elapsedTime;
  DrumKitStore.emitelapsedTime();
  clearTimeout(timerId);
}

function stopDrum() {
  currentDivision = 0;
  currentBeat = 0;
  elapsedTime = 0;
  _data.elapsedtime = 0;
  DrumKitStore.emitelapsedTime();
  DrumKitStore.emitCurrentDivision();
  DrumKitStore.emitCurrentBeat();
  clearTimeout(timerId);
}

function launchDrumKit() {
  noteTime = 0.0;
  startTime = audioCtx.currentTime + 0.005;
  //currentDivision = 0;
  schedule();
}

function schedule() {
  var currentTime = audioCtx.currentTime;
  // The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
  currentTime -= startTime;
  _data.elapsedtime = currentTime + elapsedTime;
  DrumKitStore.emitelapsedTime();
  while (noteTime < currentTime + 0.200) {

    var contextPlayTime = noteTime + startTime;
    //Insert playing notes here
    if (currentDivision % _data.divisionperbeat == 0) {
      DrumKitStore.emitCurrentBeat();
    }
    DrumKitStore.emitCurrentDivision();

    for (var i = 0; i < _data.instruments.length; i++) {
      if (_data.instruments[i].bits[currentDivision] == 1) {
        playSound(soundkit[i], contextPlayTime);
      }
    }
    advanceNote();
  }
  timerId = setTimeout(schedule, 0);
}

function advanceNote() {
  var secondsPerBeat = 60.0 / _data.bpm;
  if (currentDivision % _data.divisionperbeat == 0) {
    currentBeat++;
  }
  currentDivision++;
  //stop at the end
  if (currentDivision == _data.divisionnumber) {
    stopDrum();
  }
  //0.25 because each square is a 16th note
  noteTime += secondsPerBeat / _data.divisionperbeat;
}

function playBit(instrumentindex, bitindex, bitvalue) {
  if (bitvalue == 1) {
    playSound(soundkit[instrumentindex], 0);
  }
}

function loadDrumKit(id) {
  var myDataRef = new Firebase('https://shining-heat-7214.firebaseio.com/songs');
  myDataRef.on("value", function (snapshot) {
    var songs = snapshot.val();
    var song = songs[id];
    _data.bpm = song.bpm, _data.time = song.time, _data.beatpermeasure = song.beatpermeasure, _data.divisionperbeat = song.divisionperbeat, _data.instruments = song.instruments, setDivisions(), loadAudioContext(), loadSounds(), DrumKitStore.emitChange();
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  //  $.ajax({
  //    url: '/api/getdrumkit',
  //    dataType: 'json',
  //    cache: false,
  //    success: function(data) {
  //      var song = data.songs[id];
  //      _data.bpm= song.bpm,
  //      _data.time= song.time,
  //      _data.beatpermeasure = song.beatpermeasure,
  //      _data.divisionperbeat = song.divisionperbeat,
  //      _data.instruments=  song.instruments,
  //      setDivisions(),
  //      loadAudioContext(),
  //      loadSounds(),
  //      DrumKitStore.emitChange();
  //    }.bind(this),
  //    error: function(xhr, status, err) {
  //      console.error(this.props.url, status, err.toString());
  //    }.bind(this)
  //  });
}

function copyMeasure(measureIndex) {
  var begin = measureIndex * _data.beatpermeasure * _data.divisionperbeat;
  var end = begin + _data.beatpermeasure * _data.divisionperbeat;
  _data.measurecopied = [];

  for (var i = 0; i < _data.instruments.length; i++) {
    var beatsToCopy = [];
    for (var j = begin; j < end; j++) {
      beatsToCopy.push(_data.instruments[i].bits[j]);
    }
    _data.measurecopied.push(beatsToCopy);
  }
  console.log(_data.measurecopied);
}

function pastMeasure(targetMeasure) {
  var begin = targetMeasure * _data.beatpermeasure * _data.divisionperbeat;
  var end = begin + _data.beatpermeasure * _data.divisionperbeat;

  for (var i = 0; i < _data.instruments.length; i++) {
    var k = 0;
    var newarray = [].concat(_toConsumableArray(_data.instruments[i].bits));
    console.log(newarray);
    for (var j = begin; j < end; j++) {
      newarray[j] = _data.measurecopied[i][k];
      k++;
    }
    _data.instruments[i].bits = newarray;
  }
  DrumKitStore.emitChange();
}

function clearMeasure(targetMeasure) {
  var begin = targetMeasure * _data.beatpermeasure * _data.divisionperbeat;
  var end = begin + _data.beatpermeasure * _data.divisionperbeat;

  for (var i = 0; i < _data.instruments.length; i++) {
    var k = 0;
    var newarray = [].concat(_toConsumableArray(_data.instruments[i].bits));
    for (var j = begin; j < end; j++) {
      newarray[j] = 0;
      k++;
    }
    _data.instruments[i].bits = newarray;
  }
  DrumKitStore.emitChange();
}

function addInstrument(instrument) {
  _data.instruments.push(instrument);
  setDivisions();
  loadSounds();
  DrumKitStore.emitChange();
}

var DrumKitStore = assign({}, EventEmitter.prototype, {

  getDrumKitInfos: function getDrumKitInfos() {
    return _data;
  },

  getCurrentDivision: function getCurrentDivision() {
    return currentDivision;
  },

  getCurrentBeat: function getCurrentBeat() {
    return currentBeat;
  },

  emitCurrentBeat: function emitCurrentBeat() {
    this.emit(CURRENT_BEAT);
  },
  /**
   * @param {function} callback
   */
  addCurrentBeatListener: function addCurrentBeatListener(callback) {
    this.on(CURRENT_BEAT, callback);
  },

  emitCurrentDivision: function emitCurrentDivision() {
    this.emit(CURRENT_DIVISION);
  },
  /**
   * @param {function} callback
   */
  addDivisionListener: function addDivisionListener(callback) {
    this.on(CURRENT_DIVISION, callback);
  },

  getCurrentTime: function getCurrentTime() {
    return _data.elapsedtime;
  },

  emitelapsedTime: function emitelapsedTime() {
    this.emit(TIME_CHANGED);
  },

  addPausedsedTimeListener: function addPausedsedTimeListener(callback) {
    this.on(TIME_CHANGED, callback);
  },

  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangedListener: function addChangedListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
});

DrumKitDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {
    case DrumKitConstants.CHANGE_TIME:
      _data.time = action.item;
      setDivisions();
      DrumKitStore.emitChange();
      break;
    case DrumKitConstants.CHANGE_BPM:
      _data.bpm = action.item;
      setDivisions();
      DrumKitStore.emitChange();
      break;
    case DrumKitConstants.CHANGE_DPB:
      _data.divisionperbeat = action.item;
      setDivisions();
      DrumKitStore.emitChange();
      break;
    case DrumKitConstants.CHANGE_BEATPEARMEASURE:
      _data.beatpermeasure = action.item;
      DrumKitStore.emitChange();
      break;
    case DrumKitConstants.CHANGE_BIT:
      _data.instruments[action.instrument].bits[action.bitindex] = action.bit;
      setDivisions();
      playBit(action.instrument, action.bitindex, action.bit);
      DrumKitStore.emitChange();
      break;
    case DrumKitConstants.CHANGE_ELAPSEDTIME:
      _data.elapsedtime = payload.action.item;
      DrumKitStore.emitelapsedTime();
      break;
    case DrumKitConstants.LOAD_DRUMKIT:
      loadDrumKit(action.id);
      DrumKitStore.emitChange();
      break;
    case DrumKitConstants.SET_CURRENTTIME:
      _data.elapsedtime = payload.action.item;
      DrumKitStore.emitelapsedTime();
      break;
    case DrumKitConstants.PLAY_DRUMKIT:
      launchDrumKit();
      break;
    case DrumKitConstants.PAUSE_DRUMKIT:
      pauseDrum();
      break;
    case DrumKitConstants.STOP_DRUMKIT:
      stopDrum();
      break;
    case DrumKitConstants.COPY_MEASURE:
      copyMeasure(action.item);
      break;
    case DrumKitConstants.PAST_MEASURE:
      pastMeasure(action.item);
      break;
    case DrumKitConstants.CLEAR_MEASURE:
      clearMeasure(action.item);
      break;
    case DrumKitConstants.ADD_INSTRUMENT:
      addInstrument(action.instrument);
      break;
  }

  return true; // No errors. Needed by promise in Dispatcher.
});
// var _musics = [{
//   title: "Muscle Museum",
//   bpm:79,
//   time:120,
//   divisionperbeat:4,
//   beatpermeasure:4,
//   instruments:[
//     {"id": 1, "key":"13", "name": "hihat", "imgurl": "img/hihat.png", "soundurl": "sounds/hihat.mp3", "bits": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
//     {"id": 2, "key":"14", "name": "snare", "imgurl": "img/snare.png", "soundurl": "sounds/snare.mp3", "bits": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
//     {"id": 3, "key":"15", "name": "bass", "imgurl": "img/tome1.png", "soundurl": "sounds/bass-musclemuseum.mp3", "bits": [1]},
//     {"id": 4, "key":"16", "name": "kick", "imgurl": "img/kick.png", "soundurl": "sounds/kick.mp3", "bits": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
//   ]
// },
// {
//   title: "Bliss",
//   bpm:130,
//   time:60,
//   divisionperbeat:4,
//   beatpermeasure:4,
//   instruments:[
//     {"id": 1, "key":"13", "name": "hihat", "imgurl": "img/hihat.png", "soundurl": "sounds/hihat.mp3", "bits": [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
//     {"id": 2, "key":"14", "name": "snare", "imgurl": "img/snare.png", "soundurl": "sounds/snare.mp3", "bits": [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
//     {"id": 3, "key":"15", "name": "tome1", "imgurl": "img/tome1.png", "soundurl": "sounds/tom1.mp3", "bits": []},
//     {"id": 4, "key":"16", "name": "kick", "imgurl": "img/kick.png", "soundurl": "sounds/kick.mp3", "bits": [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
//   ]
// },
// {
//   title: "Muscle Museum",
//   bpm:80,
//   time:120,
//   divisionperbeat:2,
//   beatpermeasure:4,
//   instruments: [
//     {"id": 1, "key":"13", "name": "hihat", "imgurl": "img/hihat.png", "soundurl": "sounds/hihat.mp3", "bits": []},
//     {"id": 2, "key":"14", "name": "snare", "imgurl": "img/snare.png", "soundurl": "sounds/snare.mp3", "bits": []},
//     {"id": 3, "key":"15", "name": "tome1", "imgurl": "img/tome1.png", "soundurl": "sounds/tom1.mp3", "bits": []},
//     {"id": 4, "key":"16", "name": "kick", "imgurl": "img/kick.png", "soundurl": "sounds/kick.mp3", "bits": []}
//   ]
// }
// ];
// function loadDrumKit(id) {
//   var music = _musics[id];
//   console.log(id);
//   _data.bpm = music.bpm,
//   _data.time = music.time,
//   _data.beatpermeasure = music.beatpermeasure,
//   _data.divisionperbeat = music.divisionperbeat,
//   _data.instruments=  music.instruments,
// console.log(music.instruments);
//   setDivisions(),
//   loadAudioContext(),
//   loadSounds(),
//   DrumKitStore.emitChange();
// }

module.exports = DrumKitStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9zdG9yZXMvRHJ1bUtpdFN0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFJLG9CQUFvQixRQUFRLGlDQUFSLENBQXhCO0FBQ0EsSUFBSSxtQkFBbUIsUUFBUSwrQkFBUixDQUF2QjtBQUNBLElBQUksZUFBZSxRQUFRLFFBQVIsRUFBa0IsWUFBckM7QUFDQSxJQUFJLFNBQVMsUUFBUSxlQUFSLENBQWI7QUFDQSxJQUFJLFdBQVksUUFBUSxVQUFSLENBQWhCOztBQUVBLElBQUksZUFBZSxRQUFuQjtBQUNBLElBQUksbUJBQW1CLGlCQUF2QjtBQUNBLElBQUksZUFBZSxhQUFuQjtBQUNBLElBQUksZUFBZSxhQUFuQjs7QUFFQSxJQUFJLFFBQVE7QUFDVixPQUFJLENBRE07QUFFVixRQUFLLENBRks7QUFHVixrQkFBZSxDQUhMO0FBSVYsZUFBWSxDQUpGO0FBS1YsbUJBQWdCLENBTE47QUFNVixrQkFBZSxDQU5MO0FBT1YsaUJBQWMsRUFQSjtBQVFWLGVBQVk7QUFSRixDQUFaOztBQVdBLElBQUksa0JBQWdCLENBQXBCO0FBQ0EsSUFBSSxjQUFZLENBQWhCOztBQUdBLElBQUksUUFBSjtBQUNBLElBQUksV0FBVyxFQUFmOztBQUVBLElBQUksT0FBSjtBQUNBLElBQUksWUFBWSxDQUFoQjtBQUNBLElBQUksY0FBWSxDQUFoQjtBQUNBLElBQUksUUFBSjs7QUFFQSxTQUFTLGdCQUFULEdBQTJCO0FBQ3pCLE1BQUk7QUFDRixRQUFHLENBQUMsUUFBSixFQUNBOztBQUVFLGFBQU8sWUFBUCxHQUFzQixPQUFPLFlBQVAsSUFBcUIsT0FBTyxrQkFBbEQ7QUFDQSxpQkFBVyxJQUFJLFlBQUosRUFBWDtBQUNEO0FBRUYsR0FSRCxDQVNBLE9BQU0sQ0FBTixFQUFTO0FBQ1AsVUFBTSxnREFBTjtBQUNEO0FBQ0Y7O0FBRUQsU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCLFFBQTNCLEVBQXFDO0FBQ25DLE1BQUks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QUFvQixRQUFRLE1BQVIsQ0FBZSxJQUFuQztBQUNBLG1CQUFhLGVBQWI7QUFDQTtBQUNKLFNBQUssaUJBQWlCLFlBQXRCO0FBQ0k7QUFDQTtBQUNKLFNBQUssaUJBQWlCLGFBQXRCO0FBQ0k7QUFDQTtBQUNKLFNBQUssaUJBQWlCLFlBQXRCO0FBQ0k7QUFDQTtBQUNKLFNBQUssaUJBQWlCLFlBQXRCO0FBQ0ksa0JBQVksT0FBTyxJQUFuQjtBQUNGO0FBQ0YsU0FBSyxpQkFBaUIsWUFBdEI7QUFDSSxrQkFBWSxPQUFPLElBQW5CO0FBQ0Y7QUFDRixTQUFLLGlCQUFpQixhQUF0QjtBQUNJLG1CQUFhLE9BQU8sSUFBcEI7QUFDRjtBQUNBLFNBQUssaUJBQWlCLGNBQXRCO0FBQ0ksb0JBQWMsT0FBTyxVQUFyQjtBQUNGO0FBMUROOztBQTZESSxTQUFPLElBQVAsQztBQUVMLENBbEVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBIQSxPQUFPLE9BQVAsR0FBaUIsWUFBakIiLCJmaWxlIjoiRHJ1bUtpdFN0b3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIERydW1LaXREaXNwYXRjaGVyID0gcmVxdWlyZSgnLi4vZGlzcGF0Y2hlci9EcnVtS2l0RGlzcGF0Y2hlcicpO1xudmFyIERydW1LaXRDb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMvRHJ1bUtpdENvbnN0YW50cycpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG52YXIgRmlyZWJhc2UgPSAgcmVxdWlyZSgnZmlyZWJhc2UnKTtcblxudmFyIENIQU5HRV9FVkVOVCA9ICdjaGFuZ2UnO1xudmFyIENVUlJFTlRfRElWSVNJT04gPSAnY3VycmVudGRpdmlzaW9uJztcbnZhciBUSU1FX0NIQU5HRUQgPSAndGltZWNoYW5nZWQnO1xudmFyIENVUlJFTlRfQkVBVCA9ICdjdXJyZW50YmVhdCc7XG5cbnZhciBfZGF0YSA9IHtcbiAgYnBtOjAsXG4gIHRpbWU6MCxcbiAgZGl2aXNpb25udW1iZXI6MCxcbiAgZWxhcHNlZHRpbWU6MCxcbiAgZGl2aXNpb25wZXJiZWF0OjEsXG4gIGJlYXRwZXJtZWFzdXJlOjEsXG4gIG1lYXN1cmVjb3BpZWQ6W10sXG4gIGluc3RydW1lbnRzOltdXG59XG5cbnZhciBjdXJyZW50RGl2aXNpb249MDtcbnZhciBjdXJyZW50QmVhdD0wO1xuXG5cbnZhciBhdWRpb0N0eDtcbnZhciBzb3VuZGtpdCA9IFtdO1xuXG52YXIgdGltZXJJZDtcbnZhciBzdGFydFRpbWUgPSAwO1xudmFyIGVsYXBzZWRUaW1lPTA7XG52YXIgbm90ZVRpbWU7XG5cbmZ1bmN0aW9uIGxvYWRBdWRpb0NvbnRleHQoKXtcbiAgdHJ5IHtcbiAgICBpZighYXVkaW9DdHgpXG4gICAge1xuICAgICAgLy8gRml4IHVwIGZvciBwcmVmaXhpbmdcbiAgICAgIHdpbmRvdy5BdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0fHx3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuICAgICAgYXVkaW9DdHggPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gICAgfVxuXG4gIH1cbiAgY2F0Y2goZSkge1xuICAgIGFsZXJ0KCdXZWIgQXVkaW8gQVBJIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGxheVNvdW5kKGJ1ZmZlciwgcGxheXRpbWUpIHtcbiAgdmFyIHNvdXJjZSA9IGF1ZGlvQ3R4LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpOyAvLyBjcmVhdGVzIGEgc291bmQgc291cmNlXG4gIHNvdXJjZS5idWZmZXIgPSBidWZmZXI7ICAgICAgICAgICAgICAgICAgICAvLyB0ZWxsIHRoZSBzb3VyY2Ugd2hpY2ggc291bmQgdG8gcGxheVxuICBzb3VyY2UuY29ubmVjdChhdWRpb0N0eC5kZXN0aW5hdGlvbik7ICAgICAgIC8vIGNvbm5lY3QgdGhlIHNvdXJjZSB0byB0aGUgY29udGV4dCdzIGRlc3RpbmF0aW9uICh0aGUgc3BlYWtlcnMpXG4gIHNvdXJjZS5zdGFydChwbGF5dGltZSk7ICAgICAgICAgICAgICAgICAgICAgICAvLyBwbGF5IHRoZSBzb3VyY2Ugbm93ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdGU6IG9uIG9sZGVyIHN5c3RlbXMsIG1heSBoYXZlIHRvIHVzZSBkZXByZWNhdGVkIG5vdGVPbih0aW1lKTtcbn1cblxuZnVuY3Rpb24gbG9hZFNvdW5kcygpXG57XG4gIHNvdW5ka2l0ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgX2RhdGEuaW5zdHJ1bWVudHMubGVuZ3RoOyBpKyspe1xuICAgIHNvdW5ka2l0LnB1c2goXCJcIik7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBfZGF0YS5pbnN0cnVtZW50cy5sZW5ndGg7IGkrKyl7XG4gICAgbG9hZFNvdW5kKF9kYXRhLmluc3RydW1lbnRzW2ldLnNvdW5kdXJsLCBpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBsb2FkU291bmQodXJsLCBpbmRleCkge1xuICB2YXIgcmVzdWx0O1xuICB2YXIgYWNjZXNzdG9rZW4gPSAnSmZuRHBBblpjUThBQUFBQUFBQUJZYnQ2WnZxNi1VMTBEZUZnemNaRWJ6N1hZWnJUdjl1Z1B1dVJsMGFpOUJGUic7XG5cbiAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgcmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyBhY2Nlc3N0b2tlbik7XG5cblxuICAvLyBEZWNvZGUgYXN5bmNocm9ub3VzbHlcbiAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBhdWRpb0N0eC5kZWNvZGVBdWRpb0RhdGEocmVxdWVzdC5yZXNwb25zZSwgZnVuY3Rpb24oYnVmZmVyKSB7XG4gICAgICBzb3VuZGtpdFtpbmRleF0gPSBidWZmZXI7XG4gICAgICBjb25zb2xlLmxvZyhzb3VuZGtpdCk7XG4gICAgICBjb25zb2xlLmxvZyh1cmwgKyBcIiBTb3VuZCBsb2FkZWRcIik7XG4gICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcImRlY29kZUF1ZGlvRGF0YSBlcnJvclwiLCBlcnJvcik7XG4gICAgfSk7XG4gIH1cbiAgcmVxdWVzdC5zZW5kKCk7XG59XG5cbmZ1bmN0aW9uIHNldERpdmlzaW9ucygpe1xuICBfZGF0YS5kaXZpc2lvbm51bWJlciA9cGFyc2VJbnQoX2RhdGEuYnBtKSpwYXJzZUludChfZGF0YS50aW1lKSAvIDYwICogX2RhdGEuZGl2aXNpb25wZXJiZWF0O1xuICAvL1BvdXIgY2hhcXVlIGluc3RydW1lbnRcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9kYXRhLmluc3RydW1lbnRzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBuZXdiaXRzYXJyYXkgPSBbXTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgX2RhdGEuZGl2aXNpb25udW1iZXI7IGorKyl7XG4gICAgICAgIGlmKF9kYXRhLmluc3RydW1lbnRzW2ldLmJpdHNbal0pe1xuICAgICAgICAgICAgbmV3Yml0c2FycmF5LnB1c2goX2RhdGEuaW5zdHJ1bWVudHNbaV0uYml0c1tqXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbmV3Yml0c2FycmF5LnB1c2goMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIF9kYXRhLmluc3RydW1lbnRzW2ldLmJpdHMgPSBuZXdiaXRzYXJyYXk7XG4gICAgfVxuICB9XG5cbmZ1bmN0aW9uIHBhdXNlRHJ1bSgpe1xuICBlbGFwc2VkVGltZSA9IGF1ZGlvQ3R4LmN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lICsgZWxhcHNlZFRpbWU7XG4gIERydW1LaXRTdG9yZS5lbWl0ZWxhcHNlZFRpbWUoKTtcbiAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xufVxuXG5mdW5jdGlvbiBzdG9wRHJ1bSgpe1xuICBjdXJyZW50RGl2aXNpb249MDtcbiAgY3VycmVudEJlYXQ9MDtcbiAgZWxhcHNlZFRpbWU9MDtcbiAgX2RhdGEuZWxhcHNlZHRpbWU9MDtcbiAgRHJ1bUtpdFN0b3JlLmVtaXRlbGFwc2VkVGltZSgpO1xuICBEcnVtS2l0U3RvcmUuZW1pdEN1cnJlbnREaXZpc2lvbigpO1xuICBEcnVtS2l0U3RvcmUuZW1pdEN1cnJlbnRCZWF0KCk7XG4gIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbn1cblxuZnVuY3Rpb24gbGF1bmNoRHJ1bUtpdCgpe1xuICBub3RlVGltZSA9IDAuMDtcbiAgc3RhcnRUaW1lID0gYXVkaW9DdHguY3VycmVudFRpbWUgKyAwLjAwNTtcbiAgLy9jdXJyZW50RGl2aXNpb24gPSAwO1xuICBzY2hlZHVsZSgpO1xufVxuXG5mdW5jdGlvbiBzY2hlZHVsZSgpIHtcbiAgdmFyIGN1cnJlbnRUaW1lID0gYXVkaW9DdHguY3VycmVudFRpbWU7XG4gIC8vIFRoZSBzZXF1ZW5jZSBzdGFydHMgYXQgc3RhcnRUaW1lLCBzbyBub3JtYWxpemUgY3VycmVudFRpbWUgc28gdGhhdCBpdCdzIDAgYXQgdGhlIHN0YXJ0IG9mIHRoZSBzZXF1ZW5jZS5cbiAgY3VycmVudFRpbWUgLT0gc3RhcnRUaW1lO1xuICBfZGF0YS5lbGFwc2VkdGltZSA9IGN1cnJlbnRUaW1lICsgZWxhcHNlZFRpbWU7XG4gIERydW1LaXRTdG9yZS5lbWl0ZWxhcHNlZFRpbWUoKTtcbiAgd2hpbGUgKG5vdGVUaW1lIDwgY3VycmVudFRpbWUgKyAwLjIwMCkge1xuXG4gICAgdmFyIGNvbnRleHRQbGF5VGltZSA9IG5vdGVUaW1lICsgc3RhcnRUaW1lO1xuICAgIC8vSW5zZXJ0IHBsYXlpbmcgbm90ZXMgaGVyZVxuICAgIGlmKGN1cnJlbnREaXZpc2lvbiAlIF9kYXRhLmRpdmlzaW9ucGVyYmVhdCA9PSAwKVxuICAgIHtcbiAgICAgIERydW1LaXRTdG9yZS5lbWl0Q3VycmVudEJlYXQoKTtcbiAgICB9XG4gICAgRHJ1bUtpdFN0b3JlLmVtaXRDdXJyZW50RGl2aXNpb24oKTtcblxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfZGF0YS5pbnN0cnVtZW50cy5sZW5ndGg7IGkrKyl7XG4gICAgICBpZihfZGF0YS5pbnN0cnVtZW50c1tpXS5iaXRzW2N1cnJlbnREaXZpc2lvbl0gPT0gMSl7XG4gICAgICAgIHBsYXlTb3VuZChzb3VuZGtpdFtpXSwgY29udGV4dFBsYXlUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgYWR2YW5jZU5vdGUoKTtcbiAgfVxuICB0aW1lcklkID0gc2V0VGltZW91dChzY2hlZHVsZSwgMCk7XG59XG5cbmZ1bmN0aW9uIGFkdmFuY2VOb3RlKCkge1xuICAgIHZhciBzZWNvbmRzUGVyQmVhdCA9IDYwLjAgLyBfZGF0YS5icG07XG4gICAgaWYoY3VycmVudERpdmlzaW9uICUgX2RhdGEuZGl2aXNpb25wZXJiZWF0ID09IDApXG4gICAge1xuICAgICAgY3VycmVudEJlYXQrKztcbiAgICB9XG4gICAgY3VycmVudERpdmlzaW9uKys7XG4gICAgLy9zdG9wIGF0IHRoZSBlbmRcbiAgICBpZiAoY3VycmVudERpdmlzaW9uID09IF9kYXRhLmRpdmlzaW9ubnVtYmVyKSB7XG4gICAgICBzdG9wRHJ1bSgpO1xuICAgIH1cbiAgICAvLzAuMjUgYmVjYXVzZSBlYWNoIHNxdWFyZSBpcyBhIDE2dGggbm90ZVxuICAgIG5vdGVUaW1lICs9IHNlY29uZHNQZXJCZWF0IC8gX2RhdGEuZGl2aXNpb25wZXJiZWF0O1xufVxuXG5mdW5jdGlvbiBwbGF5Qml0KGluc3RydW1lbnRpbmRleCwgYml0aW5kZXgsIGJpdHZhbHVlKXtcbiAgICBpZihiaXR2YWx1ZT09MSlcbiAgICB7XG4gICAgICBwbGF5U291bmQoc291bmRraXRbaW5zdHJ1bWVudGluZGV4XSwgMClcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gbG9hZERydW1LaXQoaWQpIHtcbiAgdmFyIG15RGF0YVJlZiA9IG5ldyBGaXJlYmFzZSgnaHR0cHM6Ly9zaGluaW5nLWhlYXQtNzIxNC5maXJlYmFzZWlvLmNvbS9zb25ncycpO1xuICBteURhdGFSZWYub24oXCJ2YWx1ZVwiLCBmdW5jdGlvbihzbmFwc2hvdCkge1xuICB2YXIgc29uZ3MgPSBzbmFwc2hvdC52YWwoKTtcbiAgdmFyIHNvbmcgPSBzb25nc1tpZF07XG4gIF9kYXRhLmJwbT0gc29uZy5icG0sXG4gIF9kYXRhLnRpbWU9IHNvbmcudGltZSxcbiAgX2RhdGEuYmVhdHBlcm1lYXN1cmUgPSBzb25nLmJlYXRwZXJtZWFzdXJlLFxuICBfZGF0YS5kaXZpc2lvbnBlcmJlYXQgPSBzb25nLmRpdmlzaW9ucGVyYmVhdCxcbiAgX2RhdGEuaW5zdHJ1bWVudHM9ICBzb25nLmluc3RydW1lbnRzLFxuICBzZXREaXZpc2lvbnMoKSxcbiAgbG9hZEF1ZGlvQ29udGV4dCgpLFxuICBsb2FkU291bmRzKCksXG4gIERydW1LaXRTdG9yZS5lbWl0Q2hhbmdlKCk7XG59LCBmdW5jdGlvbiAoZXJyb3JPYmplY3QpIHtcbiAgY29uc29sZS5sb2coXCJUaGUgcmVhZCBmYWlsZWQ6IFwiICsgZXJyb3JPYmplY3QuY29kZSk7XG59KVxuXG4gIC8vICAkLmFqYXgoe1xuICAvLyAgICB1cmw6ICcvYXBpL2dldGRydW1raXQnLFxuICAvLyAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAvLyAgICBjYWNoZTogZmFsc2UsXG4gIC8vICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgLy8gICAgICB2YXIgc29uZyA9IGRhdGEuc29uZ3NbaWRdO1xuICAvLyAgICAgIF9kYXRhLmJwbT0gc29uZy5icG0sXG4gIC8vICAgICAgX2RhdGEudGltZT0gc29uZy50aW1lLFxuICAvLyAgICAgIF9kYXRhLmJlYXRwZXJtZWFzdXJlID0gc29uZy5iZWF0cGVybWVhc3VyZSxcbiAgLy8gICAgICBfZGF0YS5kaXZpc2lvbnBlcmJlYXQgPSBzb25nLmRpdmlzaW9ucGVyYmVhdCxcbiAgLy8gICAgICBfZGF0YS5pbnN0cnVtZW50cz0gIHNvbmcuaW5zdHJ1bWVudHMsXG4gIC8vICAgICAgc2V0RGl2aXNpb25zKCksXG4gIC8vICAgICAgbG9hZEF1ZGlvQ29udGV4dCgpLFxuICAvLyAgICAgIGxvYWRTb3VuZHMoKSxcbiAgLy8gICAgICBEcnVtS2l0U3RvcmUuZW1pdENoYW5nZSgpO1xuICAvLyAgICB9LmJpbmQodGhpcyksXG4gIC8vICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgZXJyKSB7XG4gIC8vICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gIC8vICAgIH0uYmluZCh0aGlzKVxuICAvLyAgfSk7XG4gfVxuXG5mdW5jdGlvbiBjb3B5TWVhc3VyZShtZWFzdXJlSW5kZXgpe1xuICB2YXIgYmVnaW4gPSBtZWFzdXJlSW5kZXggKiBfZGF0YS5iZWF0cGVybWVhc3VyZSAqIF9kYXRhLmRpdmlzaW9ucGVyYmVhdDtcbiAgdmFyIGVuZCA9IGJlZ2luICsgX2RhdGEuYmVhdHBlcm1lYXN1cmUgKiBfZGF0YS5kaXZpc2lvbnBlcmJlYXQ7XG4gIF9kYXRhLm1lYXN1cmVjb3BpZWQgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IF9kYXRhLmluc3RydW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGJlYXRzVG9Db3B5ID0gW107XG4gICAgZm9yICh2YXIgaiA9IGJlZ2luOyBqIDwgZW5kOyBqKyspIHtcbiAgICAgIGJlYXRzVG9Db3B5LnB1c2goX2RhdGEuaW5zdHJ1bWVudHNbaV0uYml0c1tqXSk7XG4gICAgfVxuICAgIF9kYXRhLm1lYXN1cmVjb3BpZWQucHVzaChiZWF0c1RvQ29weSk7XG4gIH1cbiAgY29uc29sZS5sb2coX2RhdGEubWVhc3VyZWNvcGllZCk7XG59XG5cbmZ1bmN0aW9uIHBhc3RNZWFzdXJlKHRhcmdldE1lYXN1cmUpe1xuICB2YXIgYmVnaW4gPSB0YXJnZXRNZWFzdXJlICogX2RhdGEuYmVhdHBlcm1lYXN1cmUgKiBfZGF0YS5kaXZpc2lvbnBlcmJlYXQ7XG4gIHZhciBlbmQgPSBiZWdpbiArIF9kYXRhLmJlYXRwZXJtZWFzdXJlICogX2RhdGEuZGl2aXNpb25wZXJiZWF0O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgX2RhdGEuaW5zdHJ1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgayA9IDA7XG4gICAgbGV0IG5ld2FycmF5ID0gWy4uLl9kYXRhLmluc3RydW1lbnRzW2ldLmJpdHNdO1xuICAgIGNvbnNvbGUubG9nKG5ld2FycmF5KTtcbiAgICBmb3IgKHZhciBqID0gYmVnaW47IGogPCBlbmQ7IGorKykge1xuICAgICAgbmV3YXJyYXlbal0gPSBfZGF0YS5tZWFzdXJlY29waWVkW2ldW2tdO1xuICAgICAgaysrO1xuICAgIH1cbiAgICBfZGF0YS5pbnN0cnVtZW50c1tpXS5iaXRzID0gbmV3YXJyYXk7XG4gIH1cbiAgRHJ1bUtpdFN0b3JlLmVtaXRDaGFuZ2UoKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJNZWFzdXJlKHRhcmdldE1lYXN1cmUpe1xuICB2YXIgYmVnaW4gPSB0YXJnZXRNZWFzdXJlICogX2RhdGEuYmVhdHBlcm1lYXN1cmUgKiBfZGF0YS5kaXZpc2lvbnBlcmJlYXQ7XG4gIHZhciBlbmQgPSBiZWdpbiArIF9kYXRhLmJlYXRwZXJtZWFzdXJlICogX2RhdGEuZGl2aXNpb25wZXJiZWF0O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgX2RhdGEuaW5zdHJ1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgayA9IDA7XG4gICAgbGV0IG5ld2FycmF5ID0gWy4uLl9kYXRhLmluc3RydW1lbnRzW2ldLmJpdHNdO1xuICAgIGZvciAodmFyIGogPSBiZWdpbjsgaiA8IGVuZDsgaisrKSB7XG4gICAgICBuZXdhcnJheVtqXSA9IDA7XG4gICAgICBrKys7XG4gICAgfVxuICAgIF9kYXRhLmluc3RydW1lbnRzW2ldLmJpdHMgPSBuZXdhcnJheTtcbiAgfVxuICBEcnVtS2l0U3RvcmUuZW1pdENoYW5nZSgpO1xufVxuXG5mdW5jdGlvbiBhZGRJbnN0cnVtZW50KGluc3RydW1lbnQpe1xuICBfZGF0YS5pbnN0cnVtZW50cy5wdXNoKGluc3RydW1lbnQpO1xuICBzZXREaXZpc2lvbnMoKTtcbiAgbG9hZFNvdW5kcygpO1xuICBEcnVtS2l0U3RvcmUuZW1pdENoYW5nZSgpO1xufVxuXG5cbnZhciBEcnVtS2l0U3RvcmUgPSBhc3NpZ24oe30sIEV2ZW50RW1pdHRlci5wcm90b3R5cGUsIHtcblxuICBnZXREcnVtS2l0SW5mb3M6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBfZGF0YTtcbiAgfSxcblxuICBnZXRDdXJyZW50RGl2aXNpb246IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjdXJyZW50RGl2aXNpb247XG4gIH0sXG5cbiAgZ2V0Q3VycmVudEJlYXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjdXJyZW50QmVhdDtcbiAgfSxcblxuICBlbWl0Q3VycmVudEJlYXQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZW1pdChDVVJSRU5UX0JFQVQpO1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIGFkZEN1cnJlbnRCZWF0TGlzdGVuZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbihDVVJSRU5UX0JFQVQsIGNhbGxiYWNrKTtcbiAgfSxcblxuICBlbWl0Q3VycmVudERpdmlzaW9uOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmVtaXQoQ1VSUkVOVF9ESVZJU0lPTik7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgYWRkRGl2aXNpb25MaXN0ZW5lcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB0aGlzLm9uKENVUlJFTlRfRElWSVNJT04sIGNhbGxiYWNrKTtcbiAgfSxcblxuICBnZXRDdXJyZW50VGltZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIF9kYXRhLmVsYXBzZWR0aW1lO1xuICB9LFxuXG4gIGVtaXRlbGFwc2VkVGltZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5lbWl0KFRJTUVfQ0hBTkdFRCk7XG4gIH0sXG5cbiAgYWRkUGF1c2Vkc2VkVGltZUxpc3RlbmVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHRoaXMub24oVElNRV9DSEFOR0VELCBjYWxsYmFjayk7XG4gIH0sXG5cbiAgZW1pdENoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5lbWl0KENIQU5HRV9FVkVOVCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBhZGRDaGFuZ2VkTGlzdGVuZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbihDSEFOR0VfRVZFTlQsIGNhbGxiYWNrKTtcbiAgfVxufSk7XG5cbkRydW1LaXREaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKHBheWxvYWQpe1xuICB2YXIgYWN0aW9uID0gcGF5bG9hZC5hY3Rpb247XG5cbiAgc3dpdGNoKGFjdGlvbi5hY3Rpb25UeXBlKSB7XG4gICAgY2FzZSBEcnVtS2l0Q29uc3RhbnRzLkNIQU5HRV9USU1FOlxuICAgICAgX2RhdGEudGltZT0gYWN0aW9uLml0ZW07XG4gICAgICBzZXREaXZpc2lvbnMoKTtcbiAgICAgIERydW1LaXRTdG9yZS5lbWl0Q2hhbmdlKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIERydW1LaXRDb25zdGFudHMuQ0hBTkdFX0JQTTpcbiAgICAgICAgX2RhdGEuYnBtID0gYWN0aW9uLml0ZW07XG4gICAgICAgIHNldERpdmlzaW9ucygpO1xuICAgICAgICBEcnVtS2l0U3RvcmUuZW1pdENoYW5nZSgpO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIERydW1LaXRDb25zdGFudHMuQ0hBTkdFX0RQQjpcbiAgICAgICAgX2RhdGEuZGl2aXNpb25wZXJiZWF0ID0gYWN0aW9uLml0ZW07XG4gICAgICAgIHNldERpdmlzaW9ucygpO1xuICAgICAgICBEcnVtS2l0U3RvcmUuZW1pdENoYW5nZSgpO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIERydW1LaXRDb25zdGFudHMuQ0hBTkdFX0JFQVRQRUFSTUVBU1VSRTpcbiAgICAgICAgX2RhdGEuYmVhdHBlcm1lYXN1cmUgPSBhY3Rpb24uaXRlbTtcbiAgICAgICAgRHJ1bUtpdFN0b3JlLmVtaXRDaGFuZ2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBEcnVtS2l0Q29uc3RhbnRzLkNIQU5HRV9CSVQ6XG4gICAgICAgIF9kYXRhLmluc3RydW1lbnRzW2FjdGlvbi5pbnN0cnVtZW50XS5iaXRzW2FjdGlvbi5iaXRpbmRleF0gPSBhY3Rpb24uYml0O1xuICAgICAgICBzZXREaXZpc2lvbnMoKTtcbiAgICAgICAgcGxheUJpdChhY3Rpb24uaW5zdHJ1bWVudCwgYWN0aW9uLmJpdGluZGV4LCBhY3Rpb24uYml0KTtcbiAgICAgICAgRHJ1bUtpdFN0b3JlLmVtaXRDaGFuZ2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBEcnVtS2l0Q29uc3RhbnRzLkNIQU5HRV9FTEFQU0VEVElNRTpcbiAgICAgICAgX2RhdGEuZWxhcHNlZHRpbWUgPSBwYXlsb2FkLmFjdGlvbi5pdGVtO1xuICAgICAgICBEcnVtS2l0U3RvcmUuZW1pdGVsYXBzZWRUaW1lKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgRHJ1bUtpdENvbnN0YW50cy5MT0FEX0RSVU1LSVQ6XG4gICAgICAgIGxvYWREcnVtS2l0KGFjdGlvbi5pZCk7XG4gICAgICAgIERydW1LaXRTdG9yZS5lbWl0Q2hhbmdlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgRHJ1bUtpdENvbnN0YW50cy5TRVRfQ1VSUkVOVFRJTUU6XG4gICAgICAgIF9kYXRhLmVsYXBzZWR0aW1lID0gcGF5bG9hZC5hY3Rpb24uaXRlbTtcbiAgICAgICAgRHJ1bUtpdFN0b3JlLmVtaXRlbGFwc2VkVGltZSgpO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIERydW1LaXRDb25zdGFudHMuUExBWV9EUlVNS0lUOlxuICAgICAgICBsYXVuY2hEcnVtS2l0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgRHJ1bUtpdENvbnN0YW50cy5QQVVTRV9EUlVNS0lUOlxuICAgICAgICBwYXVzZURydW0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBEcnVtS2l0Q29uc3RhbnRzLlNUT1BfRFJVTUtJVDpcbiAgICAgICAgc3RvcERydW0oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBEcnVtS2l0Q29uc3RhbnRzLkNPUFlfTUVBU1VSRTpcbiAgICAgICAgY29weU1lYXN1cmUoYWN0aW9uLml0ZW0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBEcnVtS2l0Q29uc3RhbnRzLlBBU1RfTUVBU1VSRTpcbiAgICAgICAgcGFzdE1lYXN1cmUoYWN0aW9uLml0ZW0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBEcnVtS2l0Q29uc3RhbnRzLkNMRUFSX01FQVNVUkU6XG4gICAgICAgIGNsZWFyTWVhc3VyZShhY3Rpb24uaXRlbSk7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgRHJ1bUtpdENvbnN0YW50cy5BRERfSU5TVFJVTUVOVDpcbiAgICAgICAgICBhZGRJbnN0cnVtZW50KGFjdGlvbi5pbnN0cnVtZW50KTtcbiAgICAgICAgYnJlYWs7XG4gIH1cblxuICAgICAgcmV0dXJuIHRydWU7IC8vIE5vIGVycm9ycy4gTmVlZGVkIGJ5IHByb21pc2UgaW4gRGlzcGF0Y2hlci5cblxufSk7XG4vLyB2YXIgX211c2ljcyA9IFt7XG4vLyAgIHRpdGxlOiBcIk11c2NsZSBNdXNldW1cIixcbi8vICAgYnBtOjc5LFxuLy8gICB0aW1lOjEyMCxcbi8vICAgZGl2aXNpb25wZXJiZWF0OjQsXG4vLyAgIGJlYXRwZXJtZWFzdXJlOjQsXG4vLyAgIGluc3RydW1lbnRzOltcbi8vICAgICB7XCJpZFwiOiAxLCBcImtleVwiOlwiMTNcIiwgXCJuYW1lXCI6IFwiaGloYXRcIiwgXCJpbWd1cmxcIjogXCJpbWcvaGloYXQucG5nXCIsIFwic291bmR1cmxcIjogXCJzb3VuZHMvaGloYXQubXAzXCIsIFwiYml0c1wiOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF19LFxuLy8gICAgIHtcImlkXCI6IDIsIFwia2V5XCI6XCIxNFwiLCBcIm5hbWVcIjogXCJzbmFyZVwiLCBcImltZ3VybFwiOiBcImltZy9zbmFyZS5wbmdcIiwgXCJzb3VuZHVybFwiOiBcInNvdW5kcy9zbmFyZS5tcDNcIiwgXCJiaXRzXCI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXX0sXG4vLyAgICAge1wiaWRcIjogMywgXCJrZXlcIjpcIjE1XCIsIFwibmFtZVwiOiBcImJhc3NcIiwgXCJpbWd1cmxcIjogXCJpbWcvdG9tZTEucG5nXCIsIFwic291bmR1cmxcIjogXCJzb3VuZHMvYmFzcy1tdXNjbGVtdXNldW0ubXAzXCIsIFwiYml0c1wiOiBbMV19LFxuLy8gICAgIHtcImlkXCI6IDQsIFwia2V5XCI6XCIxNlwiLCBcIm5hbWVcIjogXCJraWNrXCIsIFwiaW1ndXJsXCI6IFwiaW1nL2tpY2sucG5nXCIsIFwic291bmR1cmxcIjogXCJzb3VuZHMva2ljay5tcDNcIiwgXCJiaXRzXCI6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdfVxuLy8gICBdXG4vLyB9LFxuLy8ge1xuLy8gICB0aXRsZTogXCJCbGlzc1wiLFxuLy8gICBicG06MTMwLFxuLy8gICB0aW1lOjYwLFxuLy8gICBkaXZpc2lvbnBlcmJlYXQ6NCxcbi8vICAgYmVhdHBlcm1lYXN1cmU6NCxcbi8vICAgaW5zdHJ1bWVudHM6W1xuLy8gICAgIHtcImlkXCI6IDEsIFwia2V5XCI6XCIxM1wiLCBcIm5hbWVcIjogXCJoaWhhdFwiLCBcImltZ3VybFwiOiBcImltZy9oaWhhdC5wbmdcIiwgXCJzb3VuZHVybFwiOiBcInNvdW5kcy9oaWhhdC5tcDNcIiwgXCJiaXRzXCI6IFsxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXX0sXG4vLyAgICAge1wiaWRcIjogMiwgXCJrZXlcIjpcIjE0XCIsIFwibmFtZVwiOiBcInNuYXJlXCIsIFwiaW1ndXJsXCI6IFwiaW1nL3NuYXJlLnBuZ1wiLCBcInNvdW5kdXJsXCI6IFwic291bmRzL3NuYXJlLm1wM1wiLCBcImJpdHNcIjogWzAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdfSxcbi8vICAgICB7XCJpZFwiOiAzLCBcImtleVwiOlwiMTVcIiwgXCJuYW1lXCI6IFwidG9tZTFcIiwgXCJpbWd1cmxcIjogXCJpbWcvdG9tZTEucG5nXCIsIFwic291bmR1cmxcIjogXCJzb3VuZHMvdG9tMS5tcDNcIiwgXCJiaXRzXCI6IFtdfSxcbi8vICAgICB7XCJpZFwiOiA0LCBcImtleVwiOlwiMTZcIiwgXCJuYW1lXCI6IFwia2lja1wiLCBcImltZ3VybFwiOiBcImltZy9raWNrLnBuZ1wiLCBcInNvdW5kdXJsXCI6IFwic291bmRzL2tpY2subXAzXCIsIFwiYml0c1wiOiBbMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF19XG4vLyAgIF1cbi8vIH0sXG4vLyB7XG4vLyAgIHRpdGxlOiBcIk11c2NsZSBNdXNldW1cIixcbi8vICAgYnBtOjgwLFxuLy8gICB0aW1lOjEyMCxcbi8vICAgZGl2aXNpb25wZXJiZWF0OjIsXG4vLyAgIGJlYXRwZXJtZWFzdXJlOjQsXG4vLyAgIGluc3RydW1lbnRzOiBbXG4vLyAgICAge1wiaWRcIjogMSwgXCJrZXlcIjpcIjEzXCIsIFwibmFtZVwiOiBcImhpaGF0XCIsIFwiaW1ndXJsXCI6IFwiaW1nL2hpaGF0LnBuZ1wiLCBcInNvdW5kdXJsXCI6IFwic291bmRzL2hpaGF0Lm1wM1wiLCBcImJpdHNcIjogW119LFxuLy8gICAgIHtcImlkXCI6IDIsIFwia2V5XCI6XCIxNFwiLCBcIm5hbWVcIjogXCJzbmFyZVwiLCBcImltZ3VybFwiOiBcImltZy9zbmFyZS5wbmdcIiwgXCJzb3VuZHVybFwiOiBcInNvdW5kcy9zbmFyZS5tcDNcIiwgXCJiaXRzXCI6IFtdfSxcbi8vICAgICB7XCJpZFwiOiAzLCBcImtleVwiOlwiMTVcIiwgXCJuYW1lXCI6IFwidG9tZTFcIiwgXCJpbWd1cmxcIjogXCJpbWcvdG9tZTEucG5nXCIsIFwic291bmR1cmxcIjogXCJzb3VuZHMvdG9tMS5tcDNcIiwgXCJiaXRzXCI6IFtdfSxcbi8vICAgICB7XCJpZFwiOiA0LCBcImtleVwiOlwiMTZcIiwgXCJuYW1lXCI6IFwia2lja1wiLCBcImltZ3VybFwiOiBcImltZy9raWNrLnBuZ1wiLCBcInNvdW5kdXJsXCI6IFwic291bmRzL2tpY2subXAzXCIsIFwiYml0c1wiOiBbXX1cbi8vICAgXVxuLy8gfVxuLy8gXTtcbi8vIGZ1bmN0aW9uIGxvYWREcnVtS2l0KGlkKSB7XG4vLyAgIHZhciBtdXNpYyA9IF9tdXNpY3NbaWRdO1xuLy8gICBjb25zb2xlLmxvZyhpZCk7XG4vLyAgIF9kYXRhLmJwbSA9IG11c2ljLmJwbSxcbi8vICAgX2RhdGEudGltZSA9IG11c2ljLnRpbWUsXG4vLyAgIF9kYXRhLmJlYXRwZXJtZWFzdXJlID0gbXVzaWMuYmVhdHBlcm1lYXN1cmUsXG4vLyAgIF9kYXRhLmRpdmlzaW9ucGVyYmVhdCA9IG11c2ljLmRpdmlzaW9ucGVyYmVhdCxcbi8vICAgX2RhdGEuaW5zdHJ1bWVudHM9ICBtdXNpYy5pbnN0cnVtZW50cyxcbi8vIGNvbnNvbGUubG9nKG11c2ljLmluc3RydW1lbnRzKTtcbi8vICAgc2V0RGl2aXNpb25zKCksXG4vLyAgIGxvYWRBdWRpb0NvbnRleHQoKSxcbi8vICAgbG9hZFNvdW5kcygpLFxuLy8gICBEcnVtS2l0U3RvcmUuZW1pdENoYW5nZSgpO1xuLy8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IERydW1LaXRTdG9yZTtcbiJdfQ==