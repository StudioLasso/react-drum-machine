var React = require('react');


function getSecondsWidth(timeWidth, songTime) {
  return timeWidth/songTime;
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
  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props != nextProps;
 },
  render:function(){
    console.log('TimeLine: Render-------------------------------------')
    var second = {
      'borderLeft': '1px solid',
      'width':getSecondsWidth(this.props.timeWidth, this.props.songTime),
      'height':'8',
      'float':'left',
      'display':'block'
    };

    var elapsedtime = {
      'height':'100%',
      'background':'gray',
      'width':getElapsedTimeWidth(this.props.timeWidth, this.props.songTime, this.props.elapsedtime),
    }

    var rows = [];
    for (var i = 0; i < this.props.songTime; i++) {
        rows.push(<div key={i} style={second}><span style={{'fontSize':'xx-small'}}>{i}</span></div>)
    }
      return (
        <div className="timeLine" style={this.props.style}>
          <div className="progressBar" style={elapsedtime}></div>
          {rows}
          <span className="glyphicon glyphicon-triangle-bottom"></span>
        </div>
      );
    }
});

module.exports = TimeLine;
