import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import InstrumentInfos from './InstrumentInfos';
import * as actions from '../../actions';

export default connect(state => ({
	instruments: state.song.instruments
}), dispatch => ({
	actions: bindActionCreators(actions, dispatch)
}))(InstrumentInfos);