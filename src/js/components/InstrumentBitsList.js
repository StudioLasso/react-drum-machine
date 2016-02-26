var React = require('react');
var InstrumentBits= require('./InstrumentBits');
var DivisionCopier = require('./DivisionCopier');
var DrumKitActions = require('../actions/DrumKitActions');


var InstrumentsList = React.createClass({

  handleTimeMove:function(e){
    DrumKitActions.setCurrentTime(e.target.value);
  },

  render: function() {
    var instrumentBitNodes = this.props.instruments.map((function(instrument,i) {
      return (
        <InstrumentBits
          timeWidth={this.props.timeWidth}
          divisionsWidth={this.props.divisionsWidth}
          beatslist={instrument.bits}
          key={i}
          instindex={i}>
        </InstrumentBits>
      );
    }).bind(this));

    return (
      <div className="instrumentBitsList">
        {instrumentBitNodes}
        <DivisionCopier measurenumber={this.props.measurenumber} beatpermeasure={this.props.beatpermeasure} beatwidth={this.props.beatwidth} />
      </div>
    );
  },
});

module.exports = InstrumentsList;
