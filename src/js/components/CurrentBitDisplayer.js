var React = require('react');

function getElapsedTimeWidth(beatwidth, currentbeat)
{
  if(beatwidth * currentbeat)
  {
    return beatwidth * currentbeat
  }
  else {
    return 0;
  }
}

function getMeasureWidth(beatwidth, beatpermeasure)
{
  if(beatwidth * beatpermeasure)
  {
    return beatwidth * beatpermeasure * 2;
  }
  else {
    return 0;
  }
}

var CurrentBitDisplayer = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props != nextProps;
 },

  render:function(){
    console.log('CurrentBitDisplayer: Render-------------------------------------')
    var thisStyle = {
      'position':'absolute',
      'height': '100%',
      'backgroundColor':'#555',
      'background': 'linear-gradient(to right, #555 50%, silver 50%)',
      'backgroundSize': getMeasureWidth(this.props.beatwidth, this.props.beatpermeasure),
      'width': this.props.timewidth,
      'zIndex': '-1',
      'opacity':'0.5'
    }
    var currentBitShower = {
      'height': '100%',
      'width': this.props.beatwidth,
      'backgroundColor': 'black',
      'left': getElapsedTimeWidth(this.props.beatwidth, this.props.currentbeat),
      'position': 'absolute',
    }
    return (
      <div className="currentBitDisplayer" style={thisStyle}>
        <div style={currentBitShower}></div>
      </div>
    );
    }
});

module.exports = CurrentBitDisplayer;
