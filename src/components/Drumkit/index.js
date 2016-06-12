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

const timeWidth = 6200;

class DrumKit extends React.Component {
	componentDidMount() {
		this.props.dispatch(actions.initDrumkit({id: 0}));
	}

	getRootElement() {
		return ReactDOM.findDOMNode(this);
	}

	render() {
		const timeStyle = {
			width: timeWidth
		};

 		return (
			<div style={s.instruments}>
				<AutoScroll getRootElement={this.getRootElement.bind(this)}  />
				<div style={timeStyle}>
					<CurrentBit timeWidth={timeWidth} />
					<InstrumentBitsList timeWidth={timeWidth} />
				</div>
			</div>
		);
	}
}

export default connect()(DrumKit);