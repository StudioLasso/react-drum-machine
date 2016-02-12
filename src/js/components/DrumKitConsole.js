var React = require('react');
var DrumKitActions = require('../actions/DrumKitActions');


function sbbClicked(event){
   console.log($(event.target).text());
   $(event.target).parents('.btn-group').find('.dropdown-toggle').html($(event.target).text()+' <span class="caret"></span>');
}

var DrumKitConsole = React.createClass({
  timeChange: function(event) {
    DrumKitActions.timeChange(event.target.value);
  },
  bpmChange: function(event) {
    DrumKitActions.bpmChange(event.target.value);
  },

  bitperbarChange: function(event) {
    console.log(event.target.value);
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
         <a href="#" className="btn btn-sm btn-default" onClick={this.handlePlay}><span className="glyphicon glyphicon-record"></span> </a>
          <a href="#" className="btn btn-sm btn-default" onClick={this.handlePlay}><span className="glyphicon glyphicon-play"></span> </a>
          <a href="#" className="btn btn-sm btn-default" onClick={this.handleStop}><span className="glyphicon glyphicon-stop"></span> </a>
          <a href="#" className="btn btn-sm btn-default" onClick={this.handleStop}><span className="glyphicon glyphicon-pause"></span> </a>
        </div>
          <div className="row">
          <form className="form" role="form">
          <div className="col-xs-1">
            <label htmlFor="ex1">time:</label>
            <input type="number" className="form-control" step="1" min="0" id="time" value={this.props.time} onChange={this.timeChange} aria-describedby="basic-addon3"/>
          </div>
          <div className="col-xs-1">
            <label htmlFor="ex1">bpm:</label>
            <input type="number" className="form-control" step="1" min="0" id="bpm" value={this.props.bpm} onChange={this.bpmChange} aria-describedby="basic-addon3"/>
          </div>
          <div className="col-xs-1">
            <label htmlFor="ex1">SBB:</label>
            <div className="btn-group">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Action <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                  <li><a href="#" onClick={sbbClicked}>1</a></li>
                  <li><a href="#" onClick={sbbClicked}>2</a></li>
                  <li><a href="#" onClick={sbbClicked}>4</a></li>
                </ul>
            </div>
          </div>
          <div className="col-xs-1">
            <label htmlFor="ex1">BeatPerbar:</label>
            <input type="number" className="form-control" step="1" min="0" id="bitnumber" value={this.props.bitperbar} onChange={this.bitperbarChange} aria-describedby="basic-addon3"/>
          </div>
          <div className="col-xs-1">
            <label htmlFor="ex1">bitnumber:</label>
            <input type="number" className="form-control" readOnly={true} step="1" min="0" id="bitnumber" value={this.props.bitnumber} aria-describedby="basic-addon3"/>
          </div>
          <div className="col-xs-1">
            <label htmlFor="ex1">ElapsedTime:</label>
            <input type="number" className="form-control" min="0" step="any" value={this.props.elapsedtime} onChange={this.pausedTimeChange} id="elapsedtime" aria-describedby="basic-addon3"/>
          </div>
         </form>
       </div>

        </div>
      );
    }
});

module.exports = DrumKitConsole;
