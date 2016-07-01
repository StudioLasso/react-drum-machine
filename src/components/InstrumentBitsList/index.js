import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import InstrumentBitsList from './InstrumentBitsList';
import * as actions from '../../actions';
import * as time from '../../utils/time';

export default connect(state => ({
	instruments: state.song.instruments,
	divisionSize: state.player.divisionSize,
	measureSize: time.getMeasureSize(state.player, state.song),
	measureNumber: time.getMeasureNumber(state.song),
	songSize: time.getSongSize(state.player, state.song)
}), dispatch => ({
	changeBit: bindActionCreators(actions.changeBit, dispatch),
	copyMeasure: bindActionCreators(actions.copyMeasure, dispatch),
	pasteMeasure: bindActionCreators(actions.pasteMeasure, dispatch),
	clearMeasure: bindActionCreators(actions.clearMeasure, dispatch),
}))(InstrumentBitsList);