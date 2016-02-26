var React = require('react');
var DrumKitActions = require('../actions/DrumKitActions');

function getMeasureWidth(beatwidth, beatpermeasure)
{
  if(beatwidth * beatpermeasure)
  {
    return beatwidth * beatpermeasure;
  }
  else {
    return 0;
  }
}
var DivisionCopier = React.createClass({

  handleCopy:function(e){
    DrumKitActions.copyMeasure($(e.target).attr('value'));
  },

  handlePast:function(e){
    DrumKitActions.pastMeasure($(e.target).attr('value'));

  },

  render:function(){
    var divisioncopierStyle = {
      'height':'24px',
      'width':getMeasureWidth(this.props.beatwidth, this.props.beatpermeasure),
      'float':'left'
    }

    var rows = [];
    for (var i = 0; i < this.props.measurenumber; i++) {
        rows.push(
          <div key={i} style={divisioncopierStyle}>
            <div style={{'float':'left'}}>
              <span className="glyphicon glyphicon-copy" onClick={this.handleCopy} value={i} />
            </div>
            <div style={{'float':'left'}}>
              <span className="glyphicon glyphicon-paste" onClick={this.handlePast} value={i} />
            </div>
            <div style={{'float':'left'}}>
              <span>{i}</span>
            </div>
          </div>
        )
    }

    return (
      <div className="divisionCopier" >
          {rows}
          <div style={{'clear':'both'}}></div>
      </div>
    );
    }
});

module.exports = DivisionCopier;
