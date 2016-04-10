import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';

import DrumKitActions from 'actions/DrumKitActions';
import DrumKitStore from 'stores/DrumKitStore';
import InstrumentBitsList from './InstrumentBitsList';
import InstrumentInfos from './InstrumentInfos';
import DrumKitConsole from './DrumKitConsole';
import TimeLine from './TimeLine';
import PlayGround from './PlayGround';
import Metronome from './Metronome';
import MusicChoice from './MusicChoice';
import CurrentBitDisplayer from './CurrentBitDisplayer';

var timeWidth = 6200;

function getMeasureNumber(divisionnumber, divisionperbeat, beatpermeasure) {
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

class DrumKit extends React.Component {

	componentDidMount() {
		DrumKitStore.addChangedListener(this._onChange);
		DrumKitStore.addCurrentBeatListener(this._onBeatChange)
		DrumKitStore.addDivisionListener(this._onDivisionChange);
		DrumKitStore.addPausedsedTimeListener(this._OnTimeChanged);
		this.props.dispatch(actions.initDrumkit({id: 0}));
	}

	handleKeyDown(event) {
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
	}

	_onChange() {
		this.setState(getdrumkitData());
	}

	_onDivisionChange() {
		this.setState(getCurrentDivision());
	}

	_onBeatChange() {
		this.setState(GetCurrentBeat());
	}

	_OnTimeChanged() {
		this.setState(GetCurrentTime());
	}

	render() {
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
			  <DrumKitConsole 
			  	currentbeat={this.state.currentbeat} 
			  	elapsedtime={this.props.elapsedtime} 
			  	divisionperbeat={this.props.divisionperbeat} 
			  	beatpermeasure={this.props.beatpermeasure} 
			  	divisionnumber={this.props.divisionnumber} 
			  	bpm={this.props.bpm}
			  	time={this.props.time}/>
			</div>
			<div className="instrumentInfosContent" style={{'float':'left'}}>
			  <div className="metronome" style={{'height':"12px",'marginTop':'5px','marginBottom':'20px', 'width':'80%'}}>
				<Metronome 
					bpm={this.props.bpm} 
					currentbeat={this.state.currentbeat}/>
			  </div>
			  <InstrumentInfos instruments={this.props.instruments}/>
			</div>
			<div className="notesContent" style={{'float':'left','maxWidth':'1000px','overflowX':'auto','overflowY':'hidden','position':'relative'}}>
			  <div className="timeLineContainer" style={s.timeStyle}>
				<TimeLine 
					songTime={this.props.time} 
					elapsedtime={this.props.elapsedtime} 
					timeWidth={timeWidth} 
					style={s.tlcontent} />
			  </div>
			  <div className="InstrumentBitsListContainer" style={s.timeStyle}>
				<CurrentBitDisplayer 
					timewidth={timeWidth} 
					beatwidth={getBeatsWidth(this.props.divisionnumber, this.props.divisionperbeat)} 
					currentbeat={this.state.currentbeat} 
					beatpermeasure={this.props.beatpermeasure} />
				<InstrumentBitsList 
					measurenumber={getMeasureNumber(this.props.divisionnumber, this.props.divisionperbeat, this.props.beatpermeasure)} 
					timeWidth={timeWidth} 
					divisionsWidth={getDivisionWidth(this.props.divisionnumber)} 
					beatwidth={getBeatsWidth(this.props.divisionnumber, this.props.divisionperbeat)} 
					beatpermeasure={this.props.beatpermeasure} 
					instruments={this.props.instruments} />
			  </div>
			</div>
			<div style={{'clear':'both'}}></div>
			  <div>
				<MusicChoice />
			  </div>
		</div>
	  )
	}
}

export default connect(state => ({
	bpm: state.song.bpm,
	divisionnumber: state.song.divisionnumber,
	instruments: state.song.instruments,
	beatpermeasure: state.song.beatpermeasure,
	divisionperbeat: state.song.divisionperbeat,
	time: state.player.time,
	elapsedtime: state.player.elapsedtime
}))(DrumKit);
