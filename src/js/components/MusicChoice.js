var React = require('react');
var DrumKitActions = require('../actions/DrumKitActions');


var MusicChoice = React.createClass({
  handleClick:function(event){
    DrumKitActions.loadDrumKit($(event.target).attr('value'));
  },
  render:function(){
    return (
      <div id="musicChoice" className="musicChoice" >
        <div style={{'float':'left'}}>
          <a className="navbar-brand" href="#" onClick={this.handleClick} value={0}>Muscle Museum</a>
        </div>
        <div style={{'float':'left'}}>
          <a className="navbar-brand" href="#" onClick={this.handleClick} value={1}>Bliss</a>
        </div>
        <div style={{'float':'left'}}>
          <a className="navbar-brand" href="#" onClick={this.handleClick} value={2}>Empty</a>
        </div>
      </div>
    );
    }
});

module.exports = MusicChoice;
