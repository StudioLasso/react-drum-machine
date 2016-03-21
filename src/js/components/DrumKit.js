var React = require('react');
var DrumKitActions = require('../actions/DrumKitActions');
var DrumKitStore = require('../stores/DrumKitStore');
var InstrumentBitsList = require('./InstrumentBitsList');
var InstrumentInfos = require('./InstrumentInfos');
var DrumKitConsole = require('./DrumKitConsole');
var TimeLine = require('./TimeLine');
var PlayGround = require('./PlayGround');
var Metronome = require('./Metronome');
var MusicChoice = require('./MusicChoice');
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
    return Math.floor((divisionnumber / divisionperbeat) / beatpermeasure);
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
    DrumKitActions.loadDrumKit(0);

  },

  handleKeyDown:function(event){
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
  },
    render:function(){
      var s = {
        timeStyle: {
          'width':timeWidth
        },
        tlcontent: {
          'height':"12px",
          'marginTop':'5px',
          'marginBottom':'20px'
        }
      };
      return (

        <div className="drumKit" onKeyDown={this.handleKeyDown}>
            <div>
              <DrumKitConsole currentbeat={this.state.currentbeat} elapsedtime={this.state.elapsedtime} divisionperbeat={this.state.divisionperbeat} beatpermeasure={this.state.beatpermeasure} divisionnumber={this.state.divisionnumber} bpm={this.state.bpm} time={this.state.time}/>
            </div>
            <div className="instrumentInfosContent" style={{'float':'left'}}>
              <div className="metronome" style={{'height':"12px",'marginTop':'5px','marginBottom':'20px', 'width':'80%'}}>
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
                <InstrumentBitsList measurenumber={getMeasureNumber(this.state.divisionnumber, this.state.divisionperbeat, this.state.beatpermeasure)} timeWidth={timeWidth} divisionsWidth={getDivisionWidth(this.state.divisionnumber)} beatwidth={getBeatsWidth(this.state.divisionnumber, this.state.divisionperbeat)} beatpermeasure={this.state.beatpermeasure} instruments={this.state.instruments}/>
              </div>
            </div>
            <div style={{'clear':'both'}}></div>
              <div>
                <MusicChoice />
              </div>
        </div>
      )
    },
  _onChange: function() {
    this.setState(getdrumkitData());
  },

  _onDivisionChange: function() {
    this.setState(getCurrentDivision());
  },

  _onBeatChange: function() {
    this.setState(GetCurrentBeat());
  },

  _OnTimeChanged: function() {
    this.setState(GetCurrentTime());
  },
  });

module.exports = DrumKit;
