var React = require('react');


var PlayGround = React.createClass({

  componentDidMount: function() {
    $(".playGroundInstrument").draggable({ containment: "#playground", scroll: false });
  },

  render:function(){

  var instStyle = {
    'cursor': 'move',
    'width':'70px',
    'height':'70px',
    'backgroundColor':'black',
    'border':'1px solid black',
    'margin':'2px',
    'float':'left'
  };
    var Instruments = this.props.instruments.map((function(instrument,i) {
      return (
        <div className="playGroundInstrument" key={i} style={instStyle}></div>
      );
    }).bind(this));
    return (
      <div id="playground" className="playGround" >
      {Instruments}
      </div>
    );
    }
});

module.exports = PlayGround;
