var React = require('react');
var InstrumentBits= require('./InstrumentBits');
var DrumKitActions = require('../actions/DrumKitActions');


var InstrumentsList = React.createClass({

  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props != nextProps;
 },

  handleTimeMove:function(e){
    DrumKitActions.setCurrentTime(e.target.value);
  },

  render: function() {
    console.log('InstrumentsList: Render-------------------------------------')
    var instrumentBitNodes = this.props.instruments.map((function(instrument,i) {
      return (
        <InstrumentBits
          bitPushed={this.props.bitPushed}
          timeWidth={this.props.timeWidth}
          divisionsWidth={this.props.divisionsWidth}
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
