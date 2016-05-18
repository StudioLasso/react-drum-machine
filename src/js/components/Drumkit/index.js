import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';

import InstrumentBitsList from '../InstrumentBitsList';
import InstrumentInfos from '../InstrumentInfos';
import Console from '../Console';
import Timeline from '../Timeline';
import Metronome from '../Metronome';
import CurrentBit from '../CurrentBit';

import s from './styles.css';

const timeWidth = 6200;

class DrumKit extends React.Component {
	componentDidMount() {
		this.props.dispatch(actions.initDrumkit({id: 0}));
	}

	render() {
		const timeStyle = {
			width: timeWidth
		};
 
		return (
			<div>
				<Console />
				<div className={s.leftContent}>
					<div className={s.metronome}>
						<Metronome />
					</div>
					<InstrumentInfos />
				</div>
				<div className={s.instruments}>
					<div style={timeStyle}>
						<Timeline timeWidth={timeWidth} />
					</div>
					<div style={timeStyle}>
						<CurrentBit timeWidth={timeWidth} />
						<InstrumentBitsList timeWidth={timeWidth} />
					</div>
				</div>
			</div>
		);
	}
}

export default connect()(DrumKit);