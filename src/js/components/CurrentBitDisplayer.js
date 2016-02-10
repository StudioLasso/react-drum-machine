var React = require('react');

var CurrentBitDisplayer = React.createClass({

  render:function(){
    var thisStyle = {
      'position':'absolute',
      'height': '100%',
      'backgroundColor': 'beige',
      'width': this.props.timewidth,
      'zIndex': '-1'
    }
    var currentBitShower = {
      'height': '100%',
      'width': this.props.bitswidth,
      'backgroundColor': 'blueviolet',
      'left': this.props.bitswidth * this.props.currentbit,
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
