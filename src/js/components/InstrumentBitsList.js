var React = require('react');
var InstrumentBits= require('./InstrumentBits');
var DrumKitActions = require('../actions/DrumKitActions');


var InstrumentsList = React.createClass({
  handleTimeMove:function(e){
    DrumKitActions.setCurrentTime(e.target.value);
  },

  render: function() {
    var instrumentBitNodes = this.props.instruments.map((function(instrument,i) {
      return (
        <InstrumentBits
          bitPushed={this.props.bitPushed}
          timeWidth={this.props.timeWidth}
          bitsWidth={this.props.bitsWidth}
          key={i}
          instindex={i}>
        </InstrumentBits>
      );
    }).bind(this));

    return (
      <div className="instrumentBitsList">
        {instrumentBitNodes}
      </div>
    );
  },
});

module.exports = InstrumentsList;
