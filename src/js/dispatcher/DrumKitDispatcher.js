var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var DrumKitDispatcher = assign(new Dispatcher(), {
  handleViewAction: function(action) {
    this.dispatch({
      source: 'DRUMKIT_ACTION',
      action: action
    });
  }
});

module.exports = DrumKitDispatcher;
