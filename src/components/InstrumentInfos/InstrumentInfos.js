import React, {Component} from 'react';

import AddInstrument from './AddInstrument';

export default class InstrumentInfos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addInstrumentOpen: false
		};
	}

	openModal() {
		this.setState({
			addInstrumentOpen: true
		});
	}

	closeModal() {
		this.setState({
			addInstrumentOpen: false
		});
	}

	onAdd(name, imgUrl, soundUrl) {
		this.props.actions.addInstrument({
			name,
			imgUrl,
			soundUrl
		});
	}

	render() {
		const instruments = this.props.instruments.map((instrument,i) => (
			<div className="instrumentName" key={i} style={{width:'64px',height:'24px','outline':'1px solid'}}>
				<img src={instrument.imgurl} alt={instrument.name} height="24" width="24" />
			</div>
		));

	    return (
			<div className="instrumentInfosList">
				{instruments}
				<button 
					onClick={this.openModal.bind(this)}
					type="button" 
					className="btn btn-default btn-sm">Add</button>
				<AddInstrument 
					open={this.state.addInstrumentOpen}
					onClose={this.closeModal.bind(this)} 
					onAdd={this.onAdd.bind(this)} />
	      </div>
		);
	}
}
