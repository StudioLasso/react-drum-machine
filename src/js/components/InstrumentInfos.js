var React = require('react');


var InstrumentInfos = React.createClass({
  render: function() {
    var instrumentInfosNodes = this.props.instruments.map(function(instrument,i) {
      return (
        <div className="instrumentName" key={i} style={{width:'64',height:'24','outline':'1px solid'}}>
          <img src={instrument.imgurl} alt={instrument.name} height="24" width="24" />
        </div>
      );
    });

    return (
      <div className="instrumentInfosList">
        {instrumentInfosNodes}
      </div>
    );
  },
});

module.exports = InstrumentInfos;
