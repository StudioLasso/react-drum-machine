import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import InstrumentBitsList from './InstrumentBitsList';
import * as actions from 'actions';
import * as time from 'utils/time';

export default connect((state, props) => ({
	timeWidth: props.timeWidth,
	instruments: state.song.instruments,
	divisionSize: time.getDivisionSize(state.song, props.timeWidth),
	measureSize: time.getMeasureSize(state.song, props.timeWidth),
	measureNumber: time.getMeasureNumber(state.song)
}), dispatch => ({
	changeBit: bindActionCreators(actions.changeBit, dispatch),
	copyMeasure: bindActionCreators(actions.copyMeasure, dispatch),
	pasteMeasure: bindActionCreators(actions.pasteMeasure, dispatch),
	clearMeasure: bindActionCreators(actions.clearMeasure, dispatch),
}))(InstrumentBitsList);