import React from 'react';

export default props => {
	const changeTime = e => props.drumActions.changeTime(e.target.value);
	const changeBpm = e => props.drumActions.changeBpm(e.target.value);
	const changeBeatpermeasure = e => props.drumActions.changeBeatPerMeasure(e.target.value);
	const dpbClicked = e => props.drumActions.changeDpb(e.target.getAttribute('value'));
	const changeElapsedTime = e => props.drumActions.changeElapsedTime(e.target.value);
	const handlePlay = () => props.drumActions.play(0);
	const handlePause = () => props.drumActions.pause();
	const handleStop = () => props.drumActions.stop();

	return (
		<div style={{'marginBottom':'10px'}}>
			<div className="row">
				<form className="form" role="form">
					<div className="col-xs-1">
						<label htmlFor="ex1">time:</label>
						<input
							type="number"
							className="form-control"
							step="1"
							min="0"
							id="time"
							value={props.drumState.song.time}
							onChange={changeTime}
							aria-describedby="basic-addon3"/>
					</div>
					<div className="col-xs-1">
						<label htmlFor="ex1">bpm:</label>
						<input
							type="number"
							className="form-control"
							step="1"
							min="0"
							id="bpm"
							value={props.drumState.song.bpm}
							onChange={changeBpm}
							aria-describedby="basic-addon3"/>
					</div>
					<div className="col-xs-1">
						<label htmlFor="ex1">Division/Beat:</label>
						<div className="btn-group">
							<button
								type="button"
								className="btn btn-default dropdown-toggle"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false">
								{props.drumState.song.divisionperbeat}
								<span className="caret"></span>
							</button>
							<ul className="dropdown-menu">
								<li>
									<a href="#" value="1" onClick={dpbClicked}>1</a>
								</li>
								<li>
									<a href="#" value="2" onClick={dpbClicked}>2</a>
								</li>
								<li>
									<a href="#" value="4" onClick={dpbClicked}>4</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-xs-1">
						<label htmlFor="ex1">Beat/Measure:</label>
						<input type="number"
							className="form-control"
							step="1"
							min="0"
							id="divisionnumber"
							value={props.drumState.song.beatpermeasure}
							onChange={changeBeatpermeasure}
							aria-describedby="basic-addon3"/>
					</div>
					<div className="col-xs-1">
						<label htmlFor="ex1">divnumber:</label>
						<input
							type="number"
							className="form-control"
							readOnly={true}
							step="1"
							min="0"
							id="divisionnumber"
							value={props.drumState.song.divisionnumber}
							aria-describedby="basic-addon3"/>
						</div>
					<div className="col-xs-1">
						<label htmlFor="ex1">ElapsedTime:</label>
						<input
							type="number"
							className="form-control"
							min="0"
							step="any"
							value={props.elapsedTime}
							onChange={changeElapsedTime}
							id="elapsedtime"
							aria-describedby="basic-addon3" />
					</div>
					<div className="col-xs-1">
						<label htmlFor="ex1">Curr Beat:</label>
						<input
							type="number"
							className="form-control"
							min="0"
							step="any"
							value={props.currentBeat}
							id="currentBeat"
							aria-describedby="basic-addon3"/>
					</div>
					<div className="col-xs-1">
						<label htmlFor="ex1">Curr div:</label>
						<input
							type="number"
							className="form-control"
							min="0"
							step="any"
							value={props.currentDivision}
							id="currentDivision"
							aria-describedby="basic-addon3"/>
					</div>					
				</form>
			</div>
			<div className="row">
				<a href="#"
					className={`btn btn-sm btn-default ${!props.drumState.song.loaded ? 'disabled' : ''}`}
					onClick={handlePlay}>
					<span className="glyphicon glyphicon-play"></span>
				</a>
				<a href="#"
					className={`btn btn-sm btn-default ${!props.drumState.song.loaded ? 'disabled' : ''}`}
					onClick={handleStop}>
					<span className="glyphicon glyphicon-stop"></span>
				</a>
				<a href="#"
					className={`btn btn-sm btn-default ${!props.drumState.song.loaded ? 'disabled' : ''}`}
					onClick={handlePause}>
					<span className="glyphicon glyphicon-pause"></span>
				</a>
			</div>
		</div>
	);
}