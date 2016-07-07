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
			drumActions: DrumMachine.getInitialActions(),
			url: 'https://gist.githubusercontent.com/popul/66eb6d54c83fcfcf36e4f2570643f230/raw/020c0d264821c5e87e028d004978829d227b87fe/musclemuseum.json',
			song: null
		}

		this.loadSong(this.state.url);
	}

	loadSong(url) {
		fetch(url)
			.then(r => r.json())
			.then(song => this.setState({song}));
	}

	onChange(state) {
		this.setState({
			drumState: state
		});
	}

	onLoaded(state, actions, time) {
		this.setState({
			drumActions: actions,
			drumTime: time
		});
	}

	importGist(e) {
		e.preventDefault();
		this.setState({
			url: this.refs.gistUrl.value
		});
		this.loadSong(this.refs.gistUrl.value);
	}

	render() {
		return (
			<div>
				<form className="form-horizontal">
					<div className="form-group">
						<div className="col-sm-6">
							<input 
								type="text" 
								ref="gistUrl" 
								className="form-control" 
								defaultValue={this.state.url} />						
						</div>		
						<button 
							onClick={this.importGist.bind(this)} 
							className="btn btn-default col-sm-2">
							import
						</button>
					</div>
				</form>
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
								song={this.state.song}
								onLoaded={this.onLoaded.bind(this)}
								onChange={this.onChange.bind(this)} />
					</div>
				</div>
			</div>
		);
	}
}

ReactDom.render(
	<App />,
	document.getElementById('main')
);
