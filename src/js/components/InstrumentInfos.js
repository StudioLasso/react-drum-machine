var React = require('react');
var DrumKitActions = require('../actions/DrumKitActions');


var inst = {id: 1, key:"13", name: "hihat", imgurl: "img/hihat.png", soundurl: "sounds/hihat.mp3", bits: [1]};
var InstrumentInfos = React.createClass({


  handleAdd:function(){
    DrumKitActions.addInstrument(inst);
  },
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
        <button type="button" className="btn btn-default btn-sm" data-toggle="modal" data-target="#myModal">Add</button>

        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Choose instrument to add</h4>
              </div>
              <div className="modal-body">
                <p>Some text in the modal.</p>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={this.handleAdd} className="btn btn-default">Add Instrument</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  },
});

module.exports = InstrumentInfos;
