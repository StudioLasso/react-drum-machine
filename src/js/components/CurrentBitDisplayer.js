var React = require('react');

function getElapsedTimeWidth(bitwidth, currentdivision)
{
  if(bitwidth * currentdivision)
  {
    return bitwidth * currentdivision
  }
  else {
    return 0;
  }
}

var CurrentBitDisplayer = React.createClass({

  render:function(){
    var thisStyle = {
      'position':'absolute',
      'height': '100%',
      'backgroundColor': '#555',
      'width': this.props.timewidth,
      'zIndex': '-1'
    }
    var currentBitShower = {
      'height': '100%',
      'width': this.props.bitswidth,
      'backgroundColor': '#eee',
      'left': getElapsedTimeWidth(this.props.bitswidth, this.props.currentdivision),
      'position': 'absolute'
    }
    return (
      <div className="currentBitDisplayer" style={thisStyle}>
        <div style={currentBitShower}></div>
      </div>
    );
    }
});

module.exports = CurrentBitDisplayer;
