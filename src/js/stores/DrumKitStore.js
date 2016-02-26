var DrumKitDispatcher = require('../dispatcher/DrumKitDispatcher');
var DrumKitConstants = require('../constants/DrumKitConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var CURRENT_DIVISION = 'currentdivision';
var TIME_CHANGED = 'timechanged';
var CURRENT_BEAT = 'currentbeat';

var _data = {
  bpm:0,
  time:0,
  divisionnumber:0,
  elapsedtime:0,
  divisionperbeat:1,
  beatpermeasure:1,
  measurecopied:[],
  instruments:[]
}


var currentDivision=0;
var currentBeat=0;

var audioCtx;
var soundkit = [];

var timerId;
var startTime = 0;
var elapsedTime=0;
var noteTime;

function loadAudioContext(){
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}

function playSound(buffer, playtime) {
  var source = audioCtx.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(audioCtx.destination);       // connect the source to the context's destination (the speakers)
  source.start(playtime);                       // play the source now                                           // note: on older systems, may have to use deprecated noteOn(time);
}

function loadSounds()
{
  for (var i = 0; i < _data.instruments.length; i++){
    loadSound(_data.instruments[i].soundurl);
  }
}

function loadSound(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    audioCtx.decodeAudioData(request.response, function(buffer) {
      soundkit.push(buffer);
    }, function(error) {
        console.error("decodeAudioData error", error);
    });
  }
  request.send();
}

function setDivisions(){
  _data.divisionnumber =parseInt(_data.bpm)*parseInt(_data.time) / 60 * _data.divisionperbeat;
  //Pour chaque instrument
    for (var i = 0; i < _data.instruments.length; i++){
      let newbitsarray = [];
      for (var j = 0; j < _data.divisionnumber; j++){
        if(_data.instruments[i].bits[j]){
            newbitsarray.push(_data.instruments[i].bits[j]);
        }
        else {
          newbitsarray.push(0);
        }
      }
      _data.instruments[i].bits = newbitsarray;
    }
  }

function pauseDrum(){
  elapsedTime = audioCtx.currentTime - startTime + elapsedTime;
  DrumKitStore.emitelapsedTime();
  clearTimeout(timerId);
}

function stopDrum(){
  currentDivision=0;
  currentBeat=0;
  elapsedTime=0;
  _data.elapsedtime=0;
  DrumKitStore.emitelapsedTime();
  DrumKitStore.emitCurrentDivision();
  DrumKitStore.emitCurrentBeat();
  clearTimeout(timerId);
}

function launchDrumKit(){
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
    if(currentDivision % _data.divisionperbeat == 0)
    {
      DrumKitStore.emitCurrentBeat();
    }
    DrumKitStore.emitCurrentDivision();


    for (var i = 0; i < _data.instruments.length; i++){
      if(_data.instruments[i].bits[currentDivision] == 1){
        playSound(soundkit[i], contextPlayTime);
      }
    }
    advanceNote();
  }
  timerId = setTimeout(schedule, 0);
}

function advanceNote() {
    var secondsPerBeat = 60.0 / _data.bpm;
    if(currentDivision % _data.divisionperbeat == 0)
    {
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

function playBit(instrumentindex, bitindex, bitvalue){
    if(bitvalue==1)
    {
      playSound(soundkit[instrumentindex], 0)
    }
}

var _instruments = [
  {"id": 1, "key":"13", "name": "hihat", "imgurl": "img/hihat.png", "soundurl": "sounds/hihat.mp3", "bits": []},
  {"id": 2, "key":"14", "name": "snare", "imgurl": "img/snare.png", "soundurl": "sounds/snare.mp3", "bits": []},
  {"id": 3, "key":"15", "name": "tome1", "imgurl": "img/tome1.png", "soundurl": "sounds/tom1.mp3", "bits": []},
  {"id": 4, "key":"16", "name": "kick", "imgurl": "img/kick.png", "soundurl": "sounds/kick.mp3", "bits": []}
];

function loadDrumKit() {
  _data.bpm= 80,
  _data.time=60,
  _data.beatpermeasure = 4,
  _data.divisionperbeat = 2,
  _data.instruments=  _instruments,
  setDivisions(),
  loadAudioContext(),
  loadSounds(),
  DrumKitStore.emitChange();
}

function copyMeasure(measureIndex){
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

function pastMeasure(targetMeasure){
  var begin = targetMeasure * _data.beatpermeasure * _data.divisionperbeat;
  var end = begin + _data.beatpermeasure * _data.divisionperbeat;

  for (var i = 0; i < _data.instruments.length; i++) {
    var k = 0;
    let newarray = [..._data.instruments[i].bits];
    console.log(newarray);
    for (var j = begin; j < end; j++) {
      newarray[j] = _data.measurecopied[i][k];
      k++;
    }
    _data.instruments[i].bits = newarray;
  }
  DrumKitStore.emitChange();
}


var DrumKitStore = assign({}, EventEmitter.prototype, {

  getDrumKitInfos: function() {
    return _data;
  },

  getCurrentDivision: function() {
    return currentDivision;
  },

  getCurrentBeat: function() {
    return currentBeat;
  },

  emitCurrentBeat: function() {
    this.emit(CURRENT_BEAT);
  },
  /**
   * @param {function} callback
   */
  addCurrentBeatListener: function(callback) {
    this.on(CURRENT_BEAT, callback);
  },

  emitCurrentDivision: function() {
    this.emit(CURRENT_DIVISION);
  },
  /**
   * @param {function} callback
   */
  addDivisionListener: function(callback) {
    this.on(CURRENT_DIVISION, callback);
  },

  getCurrentTime: function() {
    return _data.elapsedtime;
  },

  emitelapsedTime: function() {
    this.emit(TIME_CHANGED);
  },

  addPausedsedTimeListener: function(callback) {
    this.on(TIME_CHANGED, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangedListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  }
});

DrumKitDispatcher.register(function(payload){
  var action = payload.action;

  switch(action.actionType) {
    case DrumKitConstants.CHANGE_TIME:
      _data.time= action.item;
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
        loadDrumKit();
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
  }

      return true; // No errors. Needed by promise in Dispatcher.

});

module.exports = DrumKitStore;
