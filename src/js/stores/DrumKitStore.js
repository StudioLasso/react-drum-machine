var DrumKitDispatcher = require('../dispatcher/DrumKitDispatcher');
var DrumKitConstants = require('../constants/DrumKitConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var CURRENT_DIVISION = 'currentdivision';
var TIME_CHANGED = 'timechanged';
var BIT_UPDATED = 'bitupdated';
var BIT_PUSHED = 'bitpushed';
var CURRENT_BEAT = 'currentbeat';

var _data = {
  bpm:0,
  time:0,
  divisionnumber:0,
  elapsedtime:0,
  divisionperbeat:1,
  beatpermeasure:1,
  instruments:[]
}

var currentDivision=0;
var currentBeat=0;
var bitPushed=0;

var audioCtx;
var soundkit = [];

var timerId;
var startTime = 0;
var pausedTime=0;
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
    console.log(_data.instruments[i].name + " chargé")
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
  console.log('_data.divisionperbeat: ' + _data.divisionperbeat);
  _data.divisionnumber =parseInt(_data.bpm)*parseInt(_data.time) / 60 * _data.divisionperbeat;

  //Pour chaque instrument
    for (var i = 0; i < _data.instruments.length; i++){
      //On met à jour tous les bits
      console.log("Nombre de bits: " + _data.divisionnumber)
      for (var j = 0; j < _data.divisionnumber; j++){
        if(typeof _data.instruments[i].bits[j] == 'undefined'){
          _data.instruments[i].bits.push(0);
        }
        if(_data.divisionnumber < _data.instruments[i].bits.length)
        {
          _data.instruments[i].bits.splice(_data.divisionnumber, 1)
        }
      }
    }
  }

function stopDrum(){
  pausedTime = audioCtx.currentTime - startTime + pausedTime;
  currentDivision=0;
  currentBeat=0;
  _data.elapsedtime=0;
  pausedTime=0;
  DrumKitStore.emitPausedTime();
  DrumKitStore.emitCurrentDivision();
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

  while (noteTime < currentTime + 0.200) {
    var contextPlayTime = noteTime + startTime;

    //Insert playing notes here
    if(currentDivision % _data.divisionperbeat == 0)
    {
      DrumKitStore.emitCurrentBeat();
    }
    DrumKitStore.emitCurrentDivision();
    _data.elapsedtime = currentTime + pausedTime;
    DrumKitStore.emitPausedTime();

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
    //boucle après 50 loops
    console.log("currentDivision: " + currentDivision);
    console.log("divisionnumber: " + _data.divisionnumber);
    if (currentDivision == _data.divisionnumber) {
      stopDrum();
    }
    //0.25 because each square is a 16th note
    noteTime += secondsPerBeat / _data.divisionperbeat;
}


// function playDrum(){
//     var currentTime = audioCtx.currentTime;
//     elapsedtime = (audioCtx.currentTime - startTime) + pausedTime;
//
//     DrumKitStore.emitPausedTime();
//     DrumKitStore.emitCurrentDivision();
//
//
//     //play sounds
//     for (var i = 0; i < _data.instruments.length; i++){
//       if(_data.instruments[i].bits[currentDivision] == 1){
//         playSound(soundkit[i], 0);
//       }
//     }
//     currentDivision++;
//
//     timerId = setTimeout(function() {
//         playDrum();
//     }, 60000 / _data.bpm)
// }

function playBit(instrumentindex, bitindex, bitvalue){
    // console.log("oldbit: " + _data.instruments[instrumentindex].bits[bitindex]);
    // console.log("newbit: " + bitvalue);
    if(bitvalue==1)
    {
      playSound(soundkit[instrumentindex], 0)
    }
}


function loadDrumKit() {
  $.ajax({
    url: API_GET_DRUMKIT,
    dataType: 'json',
    cache: false,
    success: function(data) {
      _data.bpm= data.bpm,
      _data.time=data.time,
      _data.beatpermeasure = data.beatpermeasure,
      _data.divisionperbeat = data.divisionperbeat,
      _data.instruments=  data.instruments,
      setDivisions(),
      loadAudioContext(),
      loadSounds(),
      DrumKitStore.emitChange();
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this)
  });
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

  getBitPushed: function(instrument) {
    return bitPushed;
  },

  getBitsInstrument: function(instrument) {
    return _data.instruments[instrument].bits;
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

  emitBitUpdated: function() {
    this.emit(BIT_UPDATED);
  },

  addBitPushedListener: function(callback) {
    this.on(BIT_PUSHED, callback);
  },

  emitBitPushed: function() {
    this.emit(BIT_PUSHED);
  },

  addBitUpdatedListener: function(callback) {
    this.on(BIT_UPDATED, callback);
  },

  getCurrentTime: function() {
    return _data.elapsedtime;
  },

  emitPausedTime: function() {
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
      console.log(action.item);
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
    console.log('CHANGE_DPB: ' + action.item)
        _data.divisionperbeat = action.item;
        setDivisions();
        DrumKitStore.emitChange();
        break;
    case DrumKitConstants.CHANGE_BIT:
        _data.instruments[action.instrument].bits[action.bitindex] = action.bit;
        playBit(action.instrument, action.bitindex, action.bit);
        DrumKitStore.emitBitUpdated();
        break;
    case DrumKitConstants.CHANGE_PAUSEDTIME:
        pausedTime = action.item;
        DrumKitStore.emitPausedTime();
        break;
    case DrumKitConstants.LOAD_DRUMKIT:
        loadDrumKit();
        DrumKitStore.emitChange();
        break;

    case DrumKitConstants.SET_CURRENTTIME:
        DrumKitStore.emitPausedTime();
        _data.elapsedtime = payload.action.item;
        break;

    case DrumKitConstants.BIT_PUSHED:
        bitPushed = action.bitpushed;
        DrumKitStore.emitBitPushed();
        console.log(action)
        break;

    case DrumKitConstants.PLAY_DRUMKIT:
        launchDrumKit();
        break;
    case DrumKitConstants.STOP_DRUMKIT:
        stopDrum();
        break;

    case DrumKitConstants.ADD_ITEM:
        console.log(action);
      break;
  }

      return true; // No errors. Needed by promise in Dispatcher.

});

module.exports = DrumKitStore;
