import React from 'react';
import ReactDom from 'react-dom';

import DrumMachine from 'react-drum-machine';

import Console from './Console';
import Metronome from './Metronome';
import InstrumentList from './InstrumentList';
import Timeline from './Timeline';


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			drumState: DrumMachine.getInitialState(),
			drumActions: DrumMachine.getInitialActions()
		}
	}

	onChange(state) {
		console.log('hey changed', arguments);
		this.setState({
			drumState: state
		});
	}

	onLoaded(state, actions, time) {
		console.log('hey loaded', arguments);
		this.setState({
			drumActions: actions,
			drumTime: time
		});
	}

	render() {
		return (
			<div>
				<Console 
					drumState={this.state.drumState}
				 	drumActions={this.state.drumActions}
				 	drumTime={this.state.drumTime} />
				<div>
					<div style={{display:'inline-block', float: 'left'}}>
						<Metronome 
							drumState={this.state.drumState}
							drumTime={this.state.drumTime} />
						<InstrumentList drumState={this.state.drumState} />
					</div> 
					<div style={{float: 'left', width: '800px'}}>
						<Timeline 
							drumState={this.state.drumState}
							drumActions={this.state.drumActions}
							drumTime={this.state.drumTime} />
						<DrumMachine 
							onLoaded={this.onLoaded.bind(this)}
							onChange={this.onChange.bind(this)} 
							/>
					</div>
				</div>
			</div>
		);
	}
}

/*

				

 */

ReactDom.render(
	<App />,
	document.getElementById('main')
);
