import React, { Component } from 'react';
import Modal from 'react-modal';

const s = {
	content: {
		padding: '2em'
	}
};

const modalStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)',
		padding 			  : 0,
		width 				  : '50%'
	}
};

export default class AddInstrument extends Component {
	onSubmit(e) {
		this.props.onAdd(
			this.refs.name.value,
			this.refs.img.value,
			this.refs.sound.value);
	}

	render() {
		return (
			<Modal 
				isOpen={this.props.open} 
				style={modalStyles}>
				<div className="modal-header">
					<button 
						type="button" 
						className="close" 
						data-dismiss="modal" 
						aria-label="Close" 
						onClick={this.props.onClose}>
						<span aria-hidden="true">&times;</span>
					</button>
					<h1>Add an instrument</h1>
				</div>
				<div style={s.content}>
					<form onSubmit={this.onSubmit.bind(this)} className="form-horizontal">
						<div className="form-group">
							<label for="inputName" className="col-sm-2 control-label">name</label>
							<div className="col-sm-10">
								<input type="text" className="form-control" id="inputName" ref="name" placeholder="name" />
							</div>
						</div>
						<div className="form-group">
							<label for="inputImg" className="col-sm-2 control-label">image url</label>
							<div className="col-sm-10">
								<input type="text" className="form-control" id="inputImg" ref="img" placeholder="image url" />
							</div>
						</div>
						<div className="form-group">
							<label for="inputSound" className="col-sm-2 control-label">sound url</label>
							<div className="col-sm-10">
								<input type="text" className="form-control" id="inputSound" ref="sound" placeholder="sound url" />
							</div>
						</div>
						<button type="submit" className="hidden"></button>
					</form>
				</div>
				<div className="modal-footer">
					<button type="submit" className="btn btn-default" onClick={this.onSubmit.bind(this)}>Add</button>
				</div>
			</Modal>
		);
	}
}