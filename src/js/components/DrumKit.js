import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';

import DrumKitActions from 'actions/DrumKitActions';
import InstrumentBitsList from './InstrumentBitsList';
import InstrumentInfos from './InstrumentInfos';
import Console from './Console';
import Timeline from './Timeline';
import PlayGround from './PlayGround';
import Metronome from './Metronome';
import MusicChoice from './MusicChoice';
import CurrentBeat from './CurrentBeat';

var timeWidth = 6200;

function getMeasureNumber(divisionnumber, divisionperbeat, beatpermeasure) {
  if(divisionnumber / divisionperbeat / beatpermeasure){
	return Math.floor((divisionnumber / divisionperbeat) / beatpermeasure);
  }
  else {
	return 0;
  }
}

function getDivisionWidth(divisionnumber) {
  return timeWidth / divisionnumber;
}

function getBeatsWidth(divisionnumber, divisionperbeat) {
  return timeWidth / divisionnumber * divisionperbeat;
}

class DrumKit extends React.Component {

	componentDidMount() {
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

	render() {
	  var s = {
		timeStyle: {
		  'width':timeWidth
		}
	  };
	  return (
		<div className="drumKit" onKeyDown={this.handleKeyDown}>
			<Console />
			<div className="instrumentInfosContent" style={{'float':'left'}}>
			  <div className="metronome" style={{'height':"12px",'marginTop':'5px','marginBottom':'20px', 'width':'80%'}}>
				<Metronome 
					bpm={this.props.bpm} 
					currentbeat={this.props.currentbeat}/>
			  </div>
			  <InstrumentInfos instruments={this.props.instruments}/>
			</div>
			<div className="notesContent" style={{'float':'left','maxWidth':'1000px','overflowX':'auto','overflowY':'hidden','position':'relative'}}>
			  <div className="timeLineContainer" style={s.timeStyle}>
				<Timeline timeWidth={timeWidth} />
			  </div>
			  <div className="InstrumentBitsListContainer" style={s.timeStyle}>
				<CurrentBeat timeWidth={timeWidth} />
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
	elapsedtime: state.player.elapsedtime,
	currentbeat: state.player.currentbeat,
	currentdivision: state.player.currentdivision
}))(DrumKit);
