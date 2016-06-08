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
  filename: 'src/js/components/MusicChoice.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'src/js/components/MusicChoice.js',
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

var MusicChoice = _wrapComponent('_component')(React.createClass({
  displayName: 'MusicChoice',

  handleClick: function handleClick(event) {
    DrumKitActions.loadDrumKit($(event.target).attr('value'));
  },
  render: function render() {
    return React.createElement(
      'div',
      { id: 'musicChoice', className: 'musicChoice' },
      React.createElement(
        'div',
        { style: { 'float': 'left' } },
        React.createElement(
          'a',
          { className: 'navbar-brand', href: '#', onClick: this.handleClick, value: 0 },
          'Muscle Museum'
        )
      ),
      React.createElement(
        'div',
        { style: { 'float': 'left' } },
        React.createElement(
          'a',
          { className: 'navbar-brand', href: '#', onClick: this.handleClick, value: 1 },
          'Bliss'
        )
      ),
      React.createElement(
        'div',
        { style: { 'float': 'left' } },
        React.createElement(
          'a',
          { className: 'navbar-brand', href: '#', onClick: this.handleClick, value: 2 },
          'Empty'
        )
      )
    );
  }
}));

module.exports = MusicChoice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9jb21wb25lbnRzL011c2ljQ2hvaWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSSxRQUFRLFFBQVEsT0FBUixDQUFaO0FBQ0EsSUFBSSxpQkFBaUIsUUFBUSwyQkFBUixDQUFyQjs7QUFHQSxJQUFJLDJDQUFjLE1BQU0sV0FBTixDQUFrQjtBQUFBOztBQUNsQyxlQUFZLHFCQUFTLEtBQVQsRUFBZTtBQUN6QixtQkFBZSxXQUFmLENBQTJCLEVBQUUsTUFBTSxNQUFSLEVBQWdCLElBQWhCLENBQXFCLE9BQXJCLENBQTNCO0FBQ0QsR0FIaUM7QUFJbEMsVUFBTyxrQkFBVTtBQUNmLFdBQ0U7QUFBQTtNQUFBLEVBQUssSUFBRyxhQUFSLEVBQXNCLFdBQVUsYUFBaEM7TUFDRTtBQUFBO1FBQUEsRUFBSyxPQUFPLEVBQUMsU0FBUSxNQUFULEVBQVo7UUFDRTtBQUFBO1VBQUEsRUFBRyxXQUFVLGNBQWIsRUFBNEIsTUFBSyxHQUFqQyxFQUFxQyxTQUFTLEtBQUssV0FBbkQsRUFBZ0UsT0FBTyxDQUF2RTtVQUFBO0FBQUE7QUFERixPQURGO01BSUU7QUFBQTtRQUFBLEVBQUssT0FBTyxFQUFDLFNBQVEsTUFBVCxFQUFaO1FBQ0U7QUFBQTtVQUFBLEVBQUcsV0FBVSxjQUFiLEVBQTRCLE1BQUssR0FBakMsRUFBcUMsU0FBUyxLQUFLLFdBQW5ELEVBQWdFLE9BQU8sQ0FBdkU7VUFBQTtBQUFBO0FBREYsT0FKRjtNQU9FO0FBQUE7UUFBQSxFQUFLLE9BQU8sRUFBQyxTQUFRLE1BQVQsRUFBWjtRQUNFO0FBQUE7VUFBQSxFQUFHLFdBQVUsY0FBYixFQUE0QixNQUFLLEdBQWpDLEVBQXFDLFNBQVMsS0FBSyxXQUFuRCxFQUFnRSxPQUFPLENBQXZFO1VBQUE7QUFBQTtBQURGO0FBUEYsS0FERjtBQWFDO0FBbEIrQixDQUFsQixDQUFkLENBQUo7O0FBcUJBLE9BQU8sT0FBUCxHQUFpQixXQUFqQiIsImZpbGUiOiJNdXNpY0Nob2ljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgRHJ1bUtpdEFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL0RydW1LaXRBY3Rpb25zJyk7XG5cblxudmFyIE11c2ljQ2hvaWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBoYW5kbGVDbGljazpmdW5jdGlvbihldmVudCl7XG4gICAgRHJ1bUtpdEFjdGlvbnMubG9hZERydW1LaXQoJChldmVudC50YXJnZXQpLmF0dHIoJ3ZhbHVlJykpO1xuICB9LFxuICByZW5kZXI6ZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cIm11c2ljQ2hvaWNlXCIgY2xhc3NOYW1lPVwibXVzaWNDaG9pY2VcIiA+XG4gICAgICAgIDxkaXYgc3R5bGU9e3snZmxvYXQnOidsZWZ0J319PlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIjXCIgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30gdmFsdWU9ezB9Pk11c2NsZSBNdXNldW08L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7J2Zsb2F0JzonbGVmdCd9fT5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiI1wiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9IHZhbHVlPXsxfT5CbGlzczwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3snZmxvYXQnOidsZWZ0J319PlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIjXCIgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30gdmFsdWU9ezJ9PkVtcHR5PC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTXVzaWNDaG9pY2U7XG4iXX0=