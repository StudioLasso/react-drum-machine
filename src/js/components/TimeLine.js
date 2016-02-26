var React = require('react');
var DrumKitActions = require('../actions/DrumKitActions');


function getSecondsWidth(timeWidth, songTime) {
  return timeWidth/songTime;
}

function getelapsedTime(timeWidth, songTime, elapsedTime) {
  return songTime / timeWidth * elapsedTime;
}

function getElapsedTimeWidth(timeWidth, songTime, elapsedTime){
  if(timeWidth / songTime * elapsedTime){
    return timeWidth / songTime * elapsedTime;
  }
  else {
    return 0;
  }

}

var TimeLine = React.createClass({

  handlechange: function(event) {
    DrumKitActions.elapsedtimeChange(getelapsedTime(this.props.timeWidth, this.props.songTime, event.target.value))
  },
  render:function(){
    var second = {
      'borderLeft': '1px solid',
      'width':getSecondsWidth(this.props.timeWidth, this.props.songTime),
      'height':'8',
      'float':'left',
      'display':'block'
    };


    var rows = [];
    for (var i = 0; i < this.props.songTime; i++) {
      rows.push(
        <div key={i} style={second}>
          <span style={{'fontSize':'xx-small'}}>
            {i}
          </span>
        </div>
      )
    }
    return (
      <div
        className="timeLine"
        style={this.props.style}>
        <input
          type="range"
          value={getElapsedTimeWidth(this.props.timeWidth, this.props.songTime, this.props.elapsedtime)}
          onChange={this.handlechange}
          max={this.props.timeWidth}
          min="0"
          step="1">
        </input>

        {rows}
      </div>
    );
  }
});

module.exports = TimeLine;
