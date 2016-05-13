import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Console from './Console';
import * as actions from '../../actions';

export default connect(state => ({
	time: state.player.time,
	bpm: state.song.bpm,
	divisionperbeat: state.song.divisionperbeat,
	beatpermeasure: state.song.beatpermeasure,
	divisionnumber: state.song.divisionnumber,
	songLoaded: state.song.loaded,
	elapsedtime: state.player.elapsedtime,
	currentbeat: state.player.currentbeat
}), dispatch => ({
	actions: bindActionCreators(actions, dispatch)
}))(Console);