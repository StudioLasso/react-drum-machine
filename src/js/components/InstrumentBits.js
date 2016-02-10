var React = require('react');
var DrumKitActions = require('../actions/DrumKitActions');
var DrumKitStore = require('../stores/DrumKitStore');

var bitOnStyle = {
  'border': '1px solid silver',
  'borderRadius':'5px',
  'width':'40%',
  'height':'80%',
  'margin':'auto',
  'background':'silver'
}

var bitOffStyle = {
  'border': '1px solid silver',
  'borderRadius':'5px',
  'width':'40%',
  'height':'80%',
  'margin':'auto'
}



function getBitStyle(bitValue) {
  if(bitValue==1){return bitOnStyle}
  else {return bitOffStyle}
}

function getbits(thisinstrument) {
var thisbits = DrumKitStore.getBitsInstrument(thisinstrument);
  return {
    bits: thisbits
  };
}

var InstrumentBits = React.createClass({
  getInitialState: function() {
    return{
      bits: DrumKitStore.getBitsInstrument(this.props.instindex)
    };
  },

   shouldComponentUpdate: function(nextProps, nextState) {
     console.log("shouldComponentUpdate_bitPushed: " + this.props.bitPushed);
     console.log("shouldComponentUpdate_bitPushed_(nextState): " + nextProps.bitPushed);
     console.log(this.state[nextProps.bitPushed] != nextState[nextProps.bitPushed])
    //  console.log("bitClicked: " + bitClicked)
    //  console.log(this.state[bitClicked]);
    //  console.log(nextState[bitClicked]);
    //  console.log(this.state[bitClicked] != nextState[bitClicked]);
    //  console.log(arraysEqual(this.state, nextState))
     return this.state[nextProps.bitPushed] != nextState[nextProps.bitPushed] ||
     this.props.bitsWidth != nextProps.bitsWidth;
  },

  bitClicked:function(event){
    var bitIndex = $(event.target).parent().data('index');
    var bitValue = $(event.target).parent().attr('data-bitvalue');
    //var bitValue = $(event.target).text();
    var currentInstrument = $(event.target).closest('.instrumentBits').data('index');

    DrumKitActions.bitPushed(bitIndex);

    if(parseInt(bitValue) == 1)
    {
      DrumKitActions.changeBit(currentInstrument, bitIndex, 0);

    }
    else {
      DrumKitActions.changeBit(currentInstrument, bitIndex, 1);
    }
  },

  componentDidMount: function() {
    DrumKitStore.addBitUpdatedListener(this._onChange);
    getbits(this.props.instindex);
  },

  render: function() {
    console.log("InstrumentBits Render----------------------------------------")
    var s = {
      instrumentBits: {
        'height':'24px',
        'outline':'1px solid',
        'display': 'table',
        'width': this.props.timeWidth
      },
      instrumentBitsContent:{
        'display': 'table-cell',
        'verticalAlign': 'middle',
      },
      bitContentStyle: {
        'float': 'left',
        'outline':'1px solid silver',
        'width':this.props.bitsWidth,
        'height':'10',
      },
      bitIsPlayedStyle: {
        'float': 'left',
        'outline':'1px solid silver',
        'width':this.props.bitsWidth,
        'height':'10',
        'background':'black'
      }
    };

    var instrumentBits = this.state.bits.map((function(bit,i) {
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
  _onChange: function() {
    this.setState(DrumKitStore.getBitsInstrument(this.props.instindex));
  },
});

module.exports = InstrumentBits;
