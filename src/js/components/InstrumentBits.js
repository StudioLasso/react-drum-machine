var React = require('react');
var DrumKitActions = require('../actions/DrumKitActions');


var bitOnStyle = {
  'border': '1px solid #CCC',
  'width':'80%',
  'height':'80%',
  'margin':'auto',
  'background':'silver'
}

var bitOffStyle = {
  'width':'50%',
  'height':'80%',
  'margin':'auto'
}

function getBitStyle(bitValue) {
  if(bitValue==1){return bitOnStyle}
  else {return bitOffStyle}
}

var InstrumentBits = React.createClass({

   shouldComponentUpdate: function(nextProps, nextState) {
     return this.props.beatslist != nextProps.beatslist;
  },

  bitClicked:function(event){
    var bitIndex = $(event.target).parent().data('index');
    var bitValue = $(event.target).parent().attr('data-bitvalue');
    //var bitValue = $(event.target).text();
    var currentInstrument = $(event.target).closest('.instrumentBits').data('index');

    if(parseInt(bitValue) == 1)
    {
      DrumKitActions.changeBit(currentInstrument, bitIndex, 0);
    }
    else {
      DrumKitActions.changeBit(currentInstrument, bitIndex, 1);
    }
  },

  render: function() {
    var s = {
      instrumentBits: {
        'height':'24px',
        'display': 'table',
        'width': this.props.timeWidth
      },
      instrumentBitsContent:{
        'display': 'table-cell',
        'verticalAlign': 'middle',
      },
      bitContentStyle: {
        'float': 'left',
        'borderRight': '1px solid #CCC',
        'width':this.props.divisionsWidth,
        'height':'100%',
      },
      bitIsPlayedStyle: {
        'float': 'left',
        'outline':'1px solid silver',
        'width':this.props.divisionsWidth,
        'height':'10',
        'background':'black'
      }
    };

    var instrumentBits = this.props.beatslist.map((function(bit,i) {
      return (
        <div style={s.bitContentStyle} data-bitvalue={bit} key={i} data-index={i} onClick={this.bitClicked} className="instrumentBit">
          <div style={getBitStyle(bit)}></div>
        </div>
      );
    }).bind(this));

    return (
      <div className="instrumentBits" style={s.instrumentBits} data-index={this.props.instindex}>
        <div style={s.instrumentBitsContent}>
          {instrumentBits}
        </div>
      </div>
    );
  },
});

module.exports = InstrumentBits;
