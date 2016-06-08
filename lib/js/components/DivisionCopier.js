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
  filename: 'src/js/components/DivisionCopier.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'src/js/components/DivisionCopier.js',
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

function getMeasureWidth(beatwidth, beatpermeasure) {
  if (beatwidth * beatpermeasure) {
    return beatwidth * beatpermeasure;
  } else {
    return 0;
  }
}
var DivisionCopier = _wrapComponent('_component')(React.createClass({
  displayName: 'DivisionCopier',


  handleCopy: function handleCopy(e) {
    DrumKitActions.copyMeasure($(e.target).attr('value'));
  },

  handlePast: function handlePast(e) {
    DrumKitActions.pastMeasure($(e.target).attr('value'));
  },

  handleClear: function handleClear(e) {
    DrumKitActions.clearMeasure($(e.target).attr('value'));
  },

  render: function render() {
    var divisioncopierStyle = {
      'height': '24px',
      'width': getMeasureWidth(this.props.beatwidth, this.props.beatpermeasure),
      'float': 'left'
    };

    var rows = [];
    for (var i = 0; i < this.props.measurenumber; i++) {
      rows.push(React.createElement(
        'div',
        { key: i, style: divisioncopierStyle },
        React.createElement(
          'div',
          { style: { 'float': 'left' } },
          React.createElement(
            'span',
            { onClick: this.handleCopy, value: i },
            'Copy'
          )
        ),
        React.createElement(
          'div',
          { style: { 'float': 'left' } },
          React.createElement(
            'span',
            { onClick: this.handlePast, value: i },
            'Paste'
          )
        ),
        React.createElement(
          'div',
          { style: { 'float': 'left' } },
          React.createElement(
            'span',
            { onClick: this.handleClear, value: i },
            'Clear'
          )
        ),
        React.createElement(
          'div',
          { style: { 'float': 'left' } },
          React.createElement(
            'span',
            null,
            i
          )
        )
      ));
    }

    return React.createElement(
      'div',
      { className: 'divisionCopier' },
      rows,
      React.createElement('div', { style: { 'clear': 'both' } })
    );
  }
}));

module.exports = DivisionCopier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9jb21wb25lbnRzL0RpdmlzaW9uQ29waWVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSSxRQUFRLFFBQVEsT0FBUixDQUFaO0FBQ0EsSUFBSSxpQkFBaUIsUUFBUSwyQkFBUixDQUFyQjs7QUFFQSxTQUFTLGVBQVQsQ0FBeUIsU0FBekIsRUFBb0MsY0FBcEMsRUFDQTtBQUNFLE1BQUcsWUFBWSxjQUFmLEVBQ0E7QUFDRSxXQUFPLFlBQVksY0FBbkI7QUFDRCxHQUhELE1BSUs7QUFDSCxXQUFPLENBQVA7QUFDRDtBQUNGO0FBQ0QsSUFBSSw4Q0FBaUIsTUFBTSxXQUFOLENBQWtCO0FBQUE7OztBQUVyQyxjQUFXLG9CQUFTLENBQVQsRUFBVztBQUNwQixtQkFBZSxXQUFmLENBQTJCLEVBQUUsRUFBRSxNQUFKLEVBQVksSUFBWixDQUFpQixPQUFqQixDQUEzQjtBQUNELEdBSm9DOztBQU1yQyxjQUFXLG9CQUFTLENBQVQsRUFBVztBQUNwQixtQkFBZSxXQUFmLENBQTJCLEVBQUUsRUFBRSxNQUFKLEVBQVksSUFBWixDQUFpQixPQUFqQixDQUEzQjtBQUVELEdBVG9DOztBQVdyQyxlQUFZLHFCQUFTLENBQVQsRUFBVztBQUNyQixtQkFBZSxZQUFmLENBQTRCLEVBQUUsRUFBRSxNQUFKLEVBQVksSUFBWixDQUFpQixPQUFqQixDQUE1QjtBQUNELEdBYm9DOztBQWVyQyxVQUFPLGtCQUFVO0FBQ2YsUUFBSSxzQkFBc0I7QUFDeEIsZ0JBQVMsTUFEZTtBQUV4QixlQUFRLGdCQUFnQixLQUFLLEtBQUwsQ0FBVyxTQUEzQixFQUFzQyxLQUFLLEtBQUwsQ0FBVyxjQUFqRCxDQUZnQjtBQUd4QixlQUFRO0FBSGdCLEtBQTFCOztBQU1BLFFBQUksT0FBTyxFQUFYO0FBQ0EsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssS0FBTCxDQUFXLGFBQS9CLEVBQThDLEdBQTlDLEVBQW1EO0FBQy9DLFdBQUssSUFBTCxDQUNFO0FBQUE7UUFBQSxFQUFLLEtBQUssQ0FBVixFQUFhLE9BQU8sbUJBQXBCO1FBQ0U7QUFBQTtVQUFBLEVBQUssT0FBTyxFQUFDLFNBQVEsTUFBVCxFQUFaO1VBQ0U7QUFBQTtZQUFBLEVBQU0sU0FBUyxLQUFLLFVBQXBCLEVBQWdDLE9BQU8sQ0FBdkM7WUFBQTtBQUFBO0FBREYsU0FERjtRQUlFO0FBQUE7VUFBQSxFQUFLLE9BQU8sRUFBQyxTQUFRLE1BQVQsRUFBWjtVQUNFO0FBQUE7WUFBQSxFQUFNLFNBQVMsS0FBSyxVQUFwQixFQUFnQyxPQUFPLENBQXZDO1lBQUE7QUFBQTtBQURGLFNBSkY7UUFPRTtBQUFBO1VBQUEsRUFBSyxPQUFPLEVBQUMsU0FBUSxNQUFULEVBQVo7VUFDRTtBQUFBO1lBQUEsRUFBTSxTQUFTLEtBQUssV0FBcEIsRUFBaUMsT0FBTyxDQUF4QztZQUFBO0FBQUE7QUFERixTQVBGO1FBVUU7QUFBQTtVQUFBLEVBQUssT0FBTyxFQUFDLFNBQVEsTUFBVCxFQUFaO1VBQ0U7QUFBQTtZQUFBO1lBQU87QUFBUDtBQURGO0FBVkYsT0FERjtBQWdCSDs7QUFFRCxXQUNFO0FBQUE7TUFBQSxFQUFLLFdBQVUsZ0JBQWY7TUFDSyxJQURMO01BRUksNkJBQUssT0FBTyxFQUFDLFNBQVEsTUFBVCxFQUFaO0FBRkosS0FERjtBQU1DO0FBaERrQyxDQUFsQixDQUFqQixDQUFKOztBQW1EQSxPQUFPLE9BQVAsR0FBaUIsY0FBakIiLCJmaWxlIjoiRGl2aXNpb25Db3BpZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIERydW1LaXRBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9EcnVtS2l0QWN0aW9ucycpO1xuXG5mdW5jdGlvbiBnZXRNZWFzdXJlV2lkdGgoYmVhdHdpZHRoLCBiZWF0cGVybWVhc3VyZSlcbntcbiAgaWYoYmVhdHdpZHRoICogYmVhdHBlcm1lYXN1cmUpXG4gIHtcbiAgICByZXR1cm4gYmVhdHdpZHRoICogYmVhdHBlcm1lYXN1cmU7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cbnZhciBEaXZpc2lvbkNvcGllciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBoYW5kbGVDb3B5OmZ1bmN0aW9uKGUpe1xuICAgIERydW1LaXRBY3Rpb25zLmNvcHlNZWFzdXJlKCQoZS50YXJnZXQpLmF0dHIoJ3ZhbHVlJykpO1xuICB9LFxuXG4gIGhhbmRsZVBhc3Q6ZnVuY3Rpb24oZSl7XG4gICAgRHJ1bUtpdEFjdGlvbnMucGFzdE1lYXN1cmUoJChlLnRhcmdldCkuYXR0cigndmFsdWUnKSk7XG5cbiAgfSxcblxuICBoYW5kbGVDbGVhcjpmdW5jdGlvbihlKXtcbiAgICBEcnVtS2l0QWN0aW9ucy5jbGVhck1lYXN1cmUoJChlLnRhcmdldCkuYXR0cigndmFsdWUnKSk7XG4gIH0sXG5cbiAgcmVuZGVyOmZ1bmN0aW9uKCl7XG4gICAgdmFyIGRpdmlzaW9uY29waWVyU3R5bGUgPSB7XG4gICAgICAnaGVpZ2h0JzonMjRweCcsXG4gICAgICAnd2lkdGgnOmdldE1lYXN1cmVXaWR0aCh0aGlzLnByb3BzLmJlYXR3aWR0aCwgdGhpcy5wcm9wcy5iZWF0cGVybWVhc3VyZSksXG4gICAgICAnZmxvYXQnOidsZWZ0J1xuICAgIH1cblxuICAgIHZhciByb3dzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnByb3BzLm1lYXN1cmVudW1iZXI7IGkrKykge1xuICAgICAgICByb3dzLnB1c2goXG4gICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXtkaXZpc2lvbmNvcGllclN0eWxlfT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3snZmxvYXQnOidsZWZ0J319PlxuICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNvcHl9IHZhbHVlPXtpfT5Db3B5PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7J2Zsb2F0JzonbGVmdCd9fT5cbiAgICAgICAgICAgICAgPHNwYW4gb25DbGljaz17dGhpcy5oYW5kbGVQYXN0fSB2YWx1ZT17aX0+UGFzdGU8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3snZmxvYXQnOidsZWZ0J319PlxuICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsZWFyfSB2YWx1ZT17aX0+Q2xlYXI8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3snZmxvYXQnOidsZWZ0J319PlxuICAgICAgICAgICAgICA8c3Bhbj57aX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpdmlzaW9uQ29waWVyXCIgPlxuICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3snY2xlYXInOidib3RoJ319PjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEaXZpc2lvbkNvcGllcjtcbiJdfQ==