var DrumKitDispatcher = require('../dispatcher/DrumKitDispatcher');
var DrumKitConstants = require('../constants/DrumKitConstants');

var DrumKitActions = {
  addInstrument: function(instrument){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.ADD_INSTRUMENT,
      instrument: instrument
    })
  },
  copyMeasure: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.COPY_MEASURE,
      item: item
    })
  },

  pastMeasure: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.PAST_MEASURE,
      item: item
    })
  },

  clearMeasure: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.CLEAR_MEASURE,
      item: item
    })
  },

  bpmChange: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.CHANGE_BPM,
      item: item
    })
  },

  dpbChange: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.CHANGE_DPB,
      item: item
    })
  },

  beatpermeasureChange: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.CHANGE_BEATPEARMEASURE,
      item: item
    })
  },

  setCurrentTime: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.SET_CURRENTTIME,
      item: item
    })
  },


elapsedtimeChange: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.CHANGE_ELAPSEDTIME,
      item: item
    })
  },

  playDrumKit: function(){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.PLAY_DRUMKIT
    })
  },

  pauseDrumKit: function(){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.PAUSE_DRUMKIT
    })
  },

  stopDrumKit: function(){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.STOP_DRUMKIT
    })
  },

  changeBit:function(instrument, bitindex, bit){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.CHANGE_BIT,
      instrument: instrument,
      bitindex: bitindex,
      bit: bit
    })
  },

  loadDrumKit: function(id){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.LOAD_DRUMKIT,
      id: id
    })
  },

  timeChange: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.CHANGE_TIME,
      item: item
    })
  }
}

module.exports = DrumKitActions
