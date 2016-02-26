var React = require('react');

var metronomePointStyle = {
  'width': '10px',
  'height': '8px',
  'position': 'absolute',
  'background': '#eee',
  'left': '0px'
}

function moveMetronome(currentbeat){
  if (currentbeat % 2 == 0)
  {
    $(".metronomePoint").animate({'left': '0px'},20);
  }
  else {
    $(".metronomePoint").animate({'left': '15px'},20);
  }

}


var Metronome = React.createClass({

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.currentbeat != this.props.currentbeat)
    {
        moveMetronome(nextProps.currentbeat);
    }
},


  render:function(){
    return (
      <div className="metronome" style={{'position':'relative', 'background':'#222', 'height':'100%','width':'100%'}}>
        <div className="metronomePoint" style={metronomePointStyle}>
        </div>
      </div>
    );
    }
});

module.exports = Metronome;
