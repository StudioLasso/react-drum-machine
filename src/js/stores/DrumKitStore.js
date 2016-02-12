var DrumKitDispatcher = require('../dispatcher/DrumKitDispatcher');
var DrumKitConstants = require('../constants/DrumKitConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var NEW_BIT = 'newbit';
var TIME_CHANGED = 'timechanged';
var BIT_UPDATED = 'bitupdated';
var BIT_PUSHED = 'bitpushed';

var _data = {
  bpm:0,
  time:0,
  bitnumber:0,
  elapsedtime:0,
  instruments:[]
}

var currentBit=0;
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

function setBitNumber(){
  _data.bitnumber =parseInt(_data.bpm)*parseInt(_data.time)/60*2;

  //Pour chaque instrument
    for (var i = 0; i < _data.instruments.length; i++){
      //On met à jour tous les bits
      console.log("Nombre de bits: " + _data.bitnumber)
      for (var j = 0; j < _data.bitnumber; j++){
        if(typeof _data.instruments[i].bits[j] == 'undefined'){
          _data.instruments[i].bits.push(0);
        }
        if(_data.bitnumber < _data.instruments[i].bits.length)
        {
          _data.instruments[i].bits.splice(_data.bitnumber, 1)
        }
      }
    }
  }

function stopDrum(){
  pausedTime = audioCtx.currentTime - startTime + pausedTime;
  currentBit=0;
  _data.elapsedtime=0;
  pausedTime=0;
  DrumKitStore.emitPausedTime();
  DrumKitStore.emitCurrentBit();
  clearTimeout(timerId);
}

function launchDrumKit(){
  noteTime = 0.0;
  startTime = audioCtx.currentTime + 0.005;
  //currentBit = 0;
  schedule();
}

function schedule() {
  var currentTime = audioCtx.currentTime;
  // The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
  currentTime -= startTime;

  while (noteTime < currentTime + 0.200) {
    var contextPlayTime = noteTime + startTime;

    //Insert playing notes here
    DrumKitStore.emitCurrentBit();
    _data.elapsedtime = currentTime + pausedTime;
    DrumKitStore.emitPausedTime();
    for (var i = 0; i < _data.instruments.length; i++){
      if(_data.instruments[i].bits[currentBit] == 1){
        playSound(soundkit[i], contextPlayTime);
      }
    }
    advanceNote();
  }
  timerId = setTimeout(schedule, 0);
}

function advanceNote() {
    var secondsPerBeat = 60.0 / _data.bpm;
    currentBit++;
    //boucle après 50 loops
    console.log("currentBit: " + currentBit);
    console.log("bitnumber: " + _data.bitnumber);
    if (currentBit == _data.bitnumber) {
      stopDrum();
    }
    //0.25 because each square is a 16th note
    noteTime += secondsPerBeat / 2;
}


// function playDrum(){
//     var currentTime = audioCtx.currentTime;
//     elapsedtime = (audioCtx.currentTime - startTime) + pausedTime;
//
//     DrumKitStore.emitPausedTime();
//     DrumKitStore.emitCurrentBit();
//
//
//     //play sounds
//     for (var i = 0; i < _data.instruments.length; i++){
//       if(_data.instruments[i].bits[currentBit] == 1){
//         playSound(soundkit[i], 0);
//       }
//     }
//     currentBit++;
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


function loadInstrumentsFromServer() {
  $.ajax({
    url: API_GET_DRUMKIT,
    dataType: 'json',
    cache: false,
    success: function(data) {
      _data.bpm= data.bpm,
      _data.time=data.time,
      _data.instruments=  data.instruments,
      setBitNumber(),
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

  getCurrentBit: function() {
    return currentBit;
  },

  getBitPushed: function(instrument) {
    return bitPushed;
  },

  getBitsInstrument: function(instrument) {
    return _data.instruments[instrument].bits;
  },

  emitCurrentBit: function() {
    this.emit(NEW_BIT);
  },
  /**
   * @param {function} callback
   */
  addBitListener: function(callback) {
    this.on(NEW_BIT, callback);
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
      setBitNumber();
      DrumKitStore.emitChange();
      break;

    case DrumKitConstants.CHANGE_BPM:
        _data.bpm = action.item;
        setBitNumber();
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
        loadInstrumentsFromServer();
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
        // startTime =  audioCtx.currentTime;
        // playDrum();
        launchDrumKit();
        break;
    case DrumKitConstants.STOP_DRUMKIT:
        stopDrum();
        break;

    case DrumKitConstants.ADD_ITEM:
      loadAudioContext();
      loadSounds();
      DrumKitStore.emitChange();
      break;
  }

      return true; // No errors. Needed by promise in Dispatcher.

});

module.exports = DrumKitStore;
