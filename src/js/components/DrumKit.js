var React = require('react');
var DrumKitActions = require('../actions/DrumKitActions');
var DrumKitStore = require('../stores/DrumKitStore');
var InstrumentBitsList = require('./InstrumentBitsList');
var InstrumentInfos = require('./InstrumentInfos');
var DrumKitConsole = require('./DrumKitConsole');
var TimeLine = require('./TimeLine');
var PlayGround = require('./PlayGround');
var Metronome = require('./Metronome');
var CurrentBitDisplayer = require('./CurrentBitDisplayer');

var timeWidth = 6200;

function getdrumkitData() {
  var dkinfo = DrumKitStore.getDrumKitInfos();
  return {
    bpm: dkinfo.bpm,
    time: dkinfo.time,
    divisionnumber:dkinfo.divisionnumber,
    instruments: dkinfo.instruments,
    beatpermeasure:dkinfo.beatpermeasure,
    divisionperbeat:dkinfo.divisionperbeat,
    elapsedtime: dkinfo.elapsedtime
  };
}

function getMeasureNumber(divisionnumber, divisionperbeat, beatpermeasure)
{
  if(divisionnumber / divisionperbeat / beatpermeasure){
    return (divisionnumber / divisionperbeat) / beatpermeasure;
  }
  else {
    return 0;
  }
}

function getCurrentDivision(){
  return{
    currentdivision: DrumKitStore.getCurrentDivision()
  };
}

function GetCurrentBeat(){
  return{
    currentbeat: DrumKitStore.getCurrentBeat()
  };
}

function getGetBitPushed(){
  console.log("getGetBitPushed: " + DrumKitStore.getBitPushed())
  return{
    bitPushed: DrumKitStore.getBitPushed()
  };
}

function getDivisionWidth(divisionnumber) {
  return timeWidth / divisionnumber;
}

function getBeatsWidth(divisionnumber, divisionperbeat) {
  return timeWidth / divisionnumber * divisionperbeat;
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
    DrumKitStore.addCurrentBeatListener(this._onBeatChange)
    DrumKitStore.addDivisionListener(this._onDivisionChange);
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
                DrumKitActions.changeBit(0, this.state.currentdivision, 1);
                break;
            case 83:
                DrumKitActions.changeBit(1, this.state.currentdivision, 1);
                break;
            case 75:
                DrumKitActions.changeBit(3, this.state.currentdivision, 1);
                break;
            default:
            //do nothing
        }
        DrumKitActions.bitPushed(this.state.currentdivision);
  },
    handleClick:function(){
      DrumKitActions.addItem('this is the item');
    },
    render:function(){
      console.log('DrumKit: Render-------------------------------------')
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
            <div>
              <DrumKitConsole elapsedtime={this.state.elapsedtime} divisionperbeat={this.state.divisionperbeat} beatpermeasure={this.state.beatpermeasure} divisionnumber={this.state.divisionnumber} bpm={this.state.bpm} time={this.state.time}/>
            </div>
            <div className="instrumentInfosContent" style={{'float':'left'}}>
              <div className="emptyTab" style={s.tlcontent}>
                <Metronome bpm={this.state.bpm} currentbeat={this.state.currentbeat}/>
              </div>
              <InstrumentInfos instruments={this.state.instruments}/>
            </div>
            <div className="notesContent" style={{'float':'left','maxWidth':'1000px','overflowX':'auto','overflowY':'hidden','position':'relative'}}>
              <div className="timeLineContainer" style={s.timeStyle}>
                <TimeLine songTime={this.state.time} elapsedtime={this.state.elapsedtime} timeWidth={timeWidth} style={s.tlcontent} />
              </div>
              <div className="InstrumentBitsListContainer" style={s.timeStyle}>
                <CurrentBitDisplayer  timewidth={timeWidth} beatwidth={getBeatsWidth(this.state.divisionnumber, this.state.divisionperbeat)} currentbeat={this.state.currentbeat} beatpermeasure={this.state.beatpermeasure} />
                <InstrumentBitsList measurenumber={getMeasureNumber(this.state.divisionnumber, this.state.divisionperbeat, this.state.beatpermeasure)} timeWidth={timeWidth} bitPushed={this.state.bitPushed} divisionsWidth={getDivisionWidth(this.state.divisionnumber)} beatwidth={getBeatsWidth(this.state.divisionnumber, this.state.divisionperbeat)} beatpermeasure={this.state.beatpermeasure} instruments={this.state.instruments}/>
              </div>
            </div>
            <div style={{'clear':'both'}}></div>
        </div>
      )
    },
  _onChange: function() {
    this.setState(getdrumkitData());
  },

  _onDivisionChange: function() {
    this.setState(getCurrentDivision());
  },

  _OnBitPushed: function() {
    this.setState(getGetBitPushed());
  },
  _onBeatChange: function() {
    this.setState(GetCurrentBeat());
  },

  _OnTimeChanged: function() {
    this.setState(GetCurrentTime());
  },
  });

module.exports = DrumKit;
