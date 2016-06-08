'use strict';

var _index = require('/Users/paulmusso1/Documents/perso/vbm/react-drum-machine/node_modules/redbox-react/lib/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('/Users/paulmusso1/Documents/perso/vbm/react-drum-machine/node_modules/react-transform-catch-errors/lib/index.js');

var _index4 = _interopRequireDefault(_index3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _index5 = require('/Users/paulmusso1/Documents/perso/vbm/react-drum-machine/node_modules/react-transform-hmr/lib/index.js');

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
  filename: 'src/js/components/InstrumentInfos.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'src/js/components/InstrumentInfos.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformHmrLibIndexJs2(_UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}

var React = require('react');
var DrumKitActions = require('../actions/DrumKitActions');

var inst = { id: 1, key: "13", name: "hihat", imgurl: "img/hihat.png", soundurl: "sounds/hihat.mp3", bits: [1] };
var InstrumentInfos = _wrapComponent('_component')(React.createClass({
  displayName: 'InstrumentInfos',


  handleAdd: function handleAdd() {
    DrumKitActions.addInstrument(inst);
  },
  render: function render() {
    var instrumentInfosNodes = this.props.instruments.map(function (instrument, i) {
      return React.createElement(
        'div',
        { className: 'instrumentName', key: i, style: { width: '64', height: '24', 'outline': '1px solid' } },
        React.createElement('img', { src: instrument.imgurl, alt: instrument.name, height: '24', width: '24' })
      );
    });

    return React.createElement(
      'div',
      { className: 'instrumentInfosList' },
      instrumentInfosNodes,
      React.createElement(
        'button',
        { type: 'button', className: 'btn btn-default btn-sm', 'data-toggle': 'modal', 'data-target': '#myModal' },
        'Add'
      ),
      React.createElement(
        'div',
        { id: 'myModal', className: 'modal fade', role: 'dialog' },
        React.createElement(
          'div',
          { className: 'modal-dialog' },
          React.createElement(
            'div',
            { className: 'modal-content' },
            React.createElement(
              'div',
              { className: 'modal-header' },
              React.createElement(
                'button',
                { type: 'button', className: 'close', 'data-dismiss': 'modal' },
                '×'
              ),
              React.createElement(
                'h4',
                { className: 'modal-title' },
                'Choose instrument to add'
              )
            ),
            React.createElement(
              'div',
              { className: 'modal-body' },
              React.createElement(
                'p',
                null,
                'Some text in the modal.'
              )
            ),
            React.createElement(
              'div',
              { className: 'modal-footer' },
              React.createElement(
                'button',
                { type: 'button', onClick: this.handleAdd, className: 'btn btn-default' },
                'Add Instrument'
              ),
              React.createElement(
                'button',
                { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
                'Close'
              )
            )
          )
        )
      )
    );
  }
}));

module.exports = InstrumentInfos;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9jb21wb25lbnRzL0luc3RydW1lbnRJbmZvcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBWjtBQUNBLElBQUksaUJBQWlCLFFBQVEsMkJBQVIsQ0FBckI7O0FBR0EsSUFBSSxPQUFPLEVBQUMsSUFBSSxDQUFMLEVBQVEsS0FBSSxJQUFaLEVBQWtCLE1BQU0sT0FBeEIsRUFBaUMsUUFBUSxlQUF6QyxFQUEwRCxVQUFVLGtCQUFwRSxFQUF3RixNQUFNLENBQUMsQ0FBRCxDQUE5RixFQUFYO0FBQ0EsSUFBSSwrQ0FBa0IsTUFBTSxXQUFOLENBQWtCO0FBQUE7OztBQUd0QyxhQUFVLHFCQUFVO0FBQ2xCLG1CQUFlLGFBQWYsQ0FBNkIsSUFBN0I7QUFDRCxHQUxxQztBQU10QyxVQUFRLGtCQUFXO0FBQ2pCLFFBQUksdUJBQXVCLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsVUFBUyxVQUFULEVBQW9CLENBQXBCLEVBQXVCO0FBQzNFLGFBQ0U7QUFBQTtRQUFBLEVBQUssV0FBVSxnQkFBZixFQUFnQyxLQUFLLENBQXJDLEVBQXdDLE9BQU8sRUFBQyxPQUFNLElBQVAsRUFBWSxRQUFPLElBQW5CLEVBQXdCLFdBQVUsV0FBbEMsRUFBL0M7UUFDRSw2QkFBSyxLQUFLLFdBQVcsTUFBckIsRUFBNkIsS0FBSyxXQUFXLElBQTdDLEVBQW1ELFFBQU8sSUFBMUQsRUFBK0QsT0FBTSxJQUFyRTtBQURGLE9BREY7QUFLRCxLQU4wQixDQUEzQjs7QUFRQSxXQUNFO0FBQUE7TUFBQSxFQUFLLFdBQVUscUJBQWY7TUFDRyxvQkFESDtNQUVFO0FBQUE7UUFBQSxFQUFRLE1BQUssUUFBYixFQUFzQixXQUFVLHdCQUFoQyxFQUF5RCxlQUFZLE9BQXJFLEVBQTZFLGVBQVksVUFBekY7UUFBQTtBQUFBLE9BRkY7TUFJRTtBQUFBO1FBQUEsRUFBSyxJQUFHLFNBQVIsRUFBa0IsV0FBVSxZQUE1QixFQUF5QyxNQUFLLFFBQTlDO1FBQ0U7QUFBQTtVQUFBLEVBQUssV0FBVSxjQUFmO1VBQ0U7QUFBQTtZQUFBLEVBQUssV0FBVSxlQUFmO1lBQ0U7QUFBQTtjQUFBLEVBQUssV0FBVSxjQUFmO2NBQ0U7QUFBQTtnQkFBQSxFQUFRLE1BQUssUUFBYixFQUFzQixXQUFVLE9BQWhDLEVBQXdDLGdCQUFhLE9BQXJEO2dCQUFBO0FBQUEsZUFERjtjQUVFO0FBQUE7Z0JBQUEsRUFBSSxXQUFVLGFBQWQ7Z0JBQUE7QUFBQTtBQUZGLGFBREY7WUFLRTtBQUFBO2NBQUEsRUFBSyxXQUFVLFlBQWY7Y0FDRTtBQUFBO2dCQUFBO2dCQUFBO0FBQUE7QUFERixhQUxGO1lBUUU7QUFBQTtjQUFBLEVBQUssV0FBVSxjQUFmO2NBQ0U7QUFBQTtnQkFBQSxFQUFRLE1BQUssUUFBYixFQUFzQixTQUFTLEtBQUssU0FBcEMsRUFBK0MsV0FBVSxpQkFBekQ7Z0JBQUE7QUFBQSxlQURGO2NBRUU7QUFBQTtnQkFBQSxFQUFRLE1BQUssUUFBYixFQUFzQixXQUFVLGlCQUFoQyxFQUFrRCxnQkFBYSxPQUEvRDtnQkFBQTtBQUFBO0FBRkY7QUFSRjtBQURGO0FBREY7QUFKRixLQURGO0FBeUJEO0FBeENxQyxDQUFsQixDQUFsQixDQUFKOztBQTJDQSxPQUFPLE9BQVAsR0FBaUIsZUFBakIiLCJmaWxlIjoiSW5zdHJ1bWVudEluZm9zLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBEcnVtS2l0QWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvRHJ1bUtpdEFjdGlvbnMnKTtcblxuXG52YXIgaW5zdCA9IHtpZDogMSwga2V5OlwiMTNcIiwgbmFtZTogXCJoaWhhdFwiLCBpbWd1cmw6IFwiaW1nL2hpaGF0LnBuZ1wiLCBzb3VuZHVybDogXCJzb3VuZHMvaGloYXQubXAzXCIsIGJpdHM6IFsxXX07XG52YXIgSW5zdHJ1bWVudEluZm9zID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cbiAgaGFuZGxlQWRkOmZ1bmN0aW9uKCl7XG4gICAgRHJ1bUtpdEFjdGlvbnMuYWRkSW5zdHJ1bWVudChpbnN0KTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaW5zdHJ1bWVudEluZm9zTm9kZXMgPSB0aGlzLnByb3BzLmluc3RydW1lbnRzLm1hcChmdW5jdGlvbihpbnN0cnVtZW50LGkpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5zdHJ1bWVudE5hbWVcIiBrZXk9e2l9IHN0eWxlPXt7d2lkdGg6JzY0JyxoZWlnaHQ6JzI0Jywnb3V0bGluZSc6JzFweCBzb2xpZCd9fT5cbiAgICAgICAgICA8aW1nIHNyYz17aW5zdHJ1bWVudC5pbWd1cmx9IGFsdD17aW5zdHJ1bWVudC5uYW1lfSBoZWlnaHQ9XCIyNFwiIHdpZHRoPVwiMjRcIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnN0cnVtZW50SW5mb3NMaXN0XCI+XG4gICAgICAgIHtpbnN0cnVtZW50SW5mb3NOb2Rlc31cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbVwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNteU1vZGFsXCI+QWRkPC9idXR0b24+XG5cbiAgICAgICAgPGRpdiBpZD1cIm15TW9kYWxcIiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgcm9sZT1cImRpYWxvZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+JnRpbWVzOzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPkNob29zZSBpbnN0cnVtZW50IHRvIGFkZDwvaDQ+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8cD5Tb21lIHRleHQgaW4gdGhlIG1vZGFsLjwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17dGhpcy5oYW5kbGVBZGR9IGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiPkFkZCBJbnN0cnVtZW50PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEluc3RydW1lbnRJbmZvcztcbiJdfQ==