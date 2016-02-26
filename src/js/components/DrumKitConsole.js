var React = require('react');
var DrumKitActions = require('../actions/DrumKitActions');




var DrumKitConsole = React.createClass({
  timeChange: function(event) {
    DrumKitActions.timeChange(event.target.value);
  },
  bpmChange: function(event) {
    DrumKitActions.bpmChange(event.target.value);
  },

  beatpermeasureChange: function(event) {
    DrumKitActions.beatpermeasureChange(event.target.value);
  },

  dpbClicked: function(event){
    DrumKitActions.dpbChange(event.target.getAttribute('value'));
  },

  handlePlay:function(){
    DrumKitActions.playDrumKit(0);
  },
  handlePause:function(){
    DrumKitActions.pauseDrumKit();
  },
  handleStop:function(){
    DrumKitActions.stopDrumKit();
  },

  render:function(){
    return (
      <div className="drumKitConsole" style={{'marginBottom':'10'}}>
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
                value={this.props.time}
                onChange={this.timeChange}
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
                value={this.props.bpm}
                onChange={this.bpmChange}
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
                  {this.props.divisionperbeat}
                  <span className="caret"></span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a href="#" value="1" onClick={this.dpbClicked}>1</a>
                </li>
                <li>
                  <a href="#" value="2" onClick={this.dpbClicked}>2</a>
                </li>
                <li>
                  <a href="#" value="4" onClick={this.dpbClicked}>4</a>
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
              value={this.props.beatpermeasure}
              onChange={this.beatpermeasureChange}
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
              value={this.props.divisionnumber}
              aria-describedby="basic-addon3"/>
          </div>
          <div className="col-xs-1">
            <label htmlFor="ex1">ElapsedTime:</label>
            <input
              type="number"
              className="form-control"
              min="0"
              step="any"
              value={this.props.elapsedtime}
              onChange={this.pausedTimeChange}
              id="elapsedtime"
              aria-describedby="basic-addon3"/>
          </div>
          <div className="col-xs-1">
            <label htmlFor="ex1">Curr Beat:</label>
            <input
              type="number"
              className="form-control"
              readOnly={true}
              min="0"
              step="any"
              value={this.props.currentbeat}
              id="elapsedtime"
              aria-describedby="basic-addon3"/>
          </div>
        </form>
      </div>
      <div className="row">
        <a
          href="#"
          className="btn btn-sm btn-default"
          onClick={this.handlePlay}>
          <span className="glyphicon glyphicon-record">
          </span>
        </a>
        <a href="#"
          className="btn btn-sm btn-default"
          onClick={this.handlePlay}>
          <span className="glyphicon glyphicon-play">
          </span>
        </a>
        <a href="#"
          className="btn btn-sm btn-default"
          onClick={this.handleStop}>
          <span className="glyphicon glyphicon-stop">
          </span>
        </a>
        <a href="#"
          className="btn btn-sm btn-default"
          onClick={this.handlePause}>
          <span className="glyphicon glyphicon-pause">
          </span>
        </a>
      </div>
    </div>
  );
}
});

module.exports = DrumKitConsole;
