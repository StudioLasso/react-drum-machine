var React = require('react');
var DrumKitActions = require('../actions/DrumKitActions');


var DrumKitConsole = React.createClass({
  timeChange: function(event) {
    DrumKitActions.timeChange(event.target.value);
  },
  bpmChange: function(event) {
    DrumKitActions.bpmChange(event.target.value);
  },
  handlePlay:function(){
    DrumKitActions.playDrumKit(0);
  },
  handleStop:function(){
    DrumKitActions.stopDrumKit(0);
  },
  pausedTimeChange: function(event) {
    DrumKitActions.pausedtimeChange(event.target.value);
  },

  render:function(){
      return (
        <div className="drumKitConsole">
          <div className="row">
          <form className="form" role="form">
          <div className="col-xs-1">
            <label for="ex1">time:</label>
            <input type="number" className="form-control" step="1" min="0" id="time" value={this.props.time} onChange={this.timeChange} aria-describedby="basic-addon3"/>
          </div>
          <div className="col-xs-1">
            <label for="ex1">bpm:</label>
            <input type="number" className="form-control" step="1" min="0" id="bpm" value={this.props.bpm} onChange={this.bpmChange} aria-describedby="basic-addon3"/>
          </div>
          <div className="col-xs-1">
            <label for="ex1">bitnumber:</label>
            <input type="number" className="form-control" readOnly={true} step="1" min="0" id="bitnumber" value={this.props.bitnumber} aria-describedby="basic-addon3"/>
          </div>
          <div className="col-xs-1">
            <label for="ex1">ElapsedTime:</label>
            <input type="number" className="form-control" min="0" step="any" value={this.props.elapsedtime} onChange={this.pausedTimeChange} id="elapsedtime" aria-describedby="basic-addon3"/>
          </div>
         </form>
       </div>
         <div className="row">
           <a href="#" className="btn btn-sm btn-default" onClick={this.handlePlay}><span className="glyphicon glyphicon-play"></span> </a>
           <a href="#" className="btn btn-sm btn-default" onClick={this.handleStop}><span className="glyphicon glyphicon-stop"></span> </a>
           <a href="#" className="btn btn-sm btn-default" onClick={this.handleStop}><span className="glyphicon glyphicon-pause"></span> </a>
         </div>
        </div>
      );
    }
});

module.exports = DrumKitConsole;
