var React = require('react');
var DrumKitActions = require('../actions/DrumKitActions');
var DrumKitStore = require('../stores/DrumKitStore');
var InstrumentBitsList = require('./InstrumentBitsList');
var InstrumentInfos = require('./InstrumentInfos');
var DrumKitConsole = require('./DrumKitConsole');
var TimeLine = require('./TimeLine');
var CurrentBitDisplayer = require('./CurrentBitDisplayer');

var timeWidth = 6200;

function getdrumkitData() {
  var dkinfo = DrumKitStore.getDrumKitInfos();
  return {
    bpm: dkinfo.bpm,
    time: dkinfo.time,
    bitnumber:dkinfo.bitnumber,
    instruments: dkinfo.instruments,
    elapsedtime: dkinfo.elapsedtime
  };
}

function getCurrentBit(){
  return{
    currentbit: DrumKitStore.getCurrentBit()
  };
}

function getGetBitPushed(){
  console.log("getGetBitPushed: " + DrumKitStore.getBitPushed())
  return{
    bitPushed: DrumKitStore.getBitPushed()
  };
}

function getBitsWidth(bitnumber) {
  return timeWidth / bitnumber;
}

function GetCurrentTime(){
  return{
    elapsedtime: DrumKitStore.getCurrentTime()
  };
}

var DrumKit = React.createClass({
  getInitialState: function() {
    return getdrumkitData()
  },

  componentDidMount: function() {
    DrumKitStore.addChangedListener(this._onChange);
    DrumKitStore.addBitListener(this._onBitChange);
    DrumKitStore.addPausedsedTimeListener(this._OnTimeChanged);
    DrumKitStore.addBitPushedListener(this._OnBitPushed);
    DrumKitActions.loadDrumKit();

  },

  handleKeyDown:function(event){
    console.log(event);
    console.log(event.keyCode);
    console.log(String.fromCharCode(event.keyCode));
    switch(event.keyCode) {
            case 72:
                DrumKitActions.changeBit(0, this.state.currentbit, 1);
                break;
            case 83:
                DrumKitActions.changeBit(1, this.state.currentbit, 1);
                break;
            case 75:
                DrumKitActions.changeBit(3, this.state.currentbit, 1);
                break;
            default:
            //do nothing
        }
        DrumKitActions.bitPushed(this.state.currentbit);
  },
    handleClick:function(){
      DrumKitActions.addItem('this is the item');
    },
    render:function(){
      console.log("DrumKitRender")
      var s = {
        timeStyle: {
          'width':timeWidth
        },
        tlcontent: {
          'height':"8px",
          'marginTop':'5px',
          'marginBottom':'20px'
        }
      };
      return (

        <div className="drumKit" onKeyDown={this.handleKeyDown}>
          <h3 onClick={this.handleClick}>Load Audio Context</h3>
            <div className="instrumentInfosContent" style={{'float':'left'}}>
              <div className="emptyTab" style={s.tlcontent}>
              </div>
              <InstrumentInfos instruments={this.state.instruments}/>
            </div>
            <div className="notesContent" style={{'float':'left','maxWidth':'1000px','overflowX':'auto','overflowY':'hidden','position':'relative'}}>
              <div className="timeLineContainer" style={s.timeStyle}>
                <TimeLine songTime={this.state.time} elapsedtime={this.state.elapsedtime} timeWidth={timeWidth} style={s.tlcontent} />
              </div>
              <div className="InstrumentBitsListContainer" style={s.timeStyle}>
                <CurrentBitDisplayer timewidth={timeWidth} bitswidth={getBitsWidth(this.state.bitnumber)} currentbit={this.state.currentbit} />
                <InstrumentBitsList timeWidth={timeWidth} bitPushed={this.state.bitPushed} bitsWidth={getBitsWidth(this.state.bitnumber)} instruments={this.state.instruments}/>
              </div>
            </div>
            <div style={{'clear':'both'}}></div>
            <div>
              <DrumKitConsole elapsedtime={this.state.elapsedtime} bitnumber={this.state.bitnumber} bpm={this.state.bpm} time={this.state.time}/>
            </div>
        </div>
      )
    },
  _onChange: function() {
    this.setState(getdrumkitData());
  },
  _onBitChange: function() {
    this.setState(getCurrentBit());
  },

  _OnBitPushed: function() {
    this.setState(getGetBitPushed());
  },

  _OnTimeChanged: function() {
    this.setState(GetCurrentTime());
  },
  });

module.exports = DrumKit;
