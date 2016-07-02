import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import InstrumentBitsList from '../InstrumentBitsList';
import CurrentBit from '../CurrentBit';
import AutoScroll from '../AutoScroll';

const s = {
	container: {
		display: 'flex',
		position: 'relative'
	},
	instruments: {
		overflowX: 'hidden',
		overflowY: 'hidden',
		position: 'relative'
	}	
};

class DrumKit extends React.Component {
	getRootElement() {
		return ReactDOM.findDOMNode(this);
	}

	render() {
 		return (
			<div style={s.instruments}>
				<AutoScroll getRootElement={this.getRootElement.bind(this)}  />
				<div>
					<CurrentBit />
					<InstrumentBitsList />
				</div>
			</div>
		);
	}
}

export default connect()(DrumKit);