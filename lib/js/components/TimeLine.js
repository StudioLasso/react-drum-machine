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
  filename: 'src/js/components/TimeLine.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'src/js/components/TimeLine.js',
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

function getSecondsWidth(timeWidth, songTime) {
  return timeWidth / songTime;
}

function getelapsedTime(timeWidth, songTime, elapsedTime) {
  return songTime / timeWidth * elapsedTime;
}

function getElapsedTimeWidth(timeWidth, songTime, elapsedTime) {
  if (timeWidth / songTime * elapsedTime) {
    return timeWidth / songTime * elapsedTime;
  } else {
    return 0;
  }
}

var TimeLine = _wrapComponent('_component')(React.createClass({
  displayName: 'TimeLine',


  handlechange: function handlechange(event) {
    DrumKitActions.elapsedtimeChange(getelapsedTime(this.props.timeWidth, this.props.songTime, event.target.value));
  },
  render: function render() {
    var second = {
      'borderLeft': '1px solid',
      'width': getSecondsWidth(this.props.timeWidth, this.props.songTime),
      'height': '8',
      'float': 'left',
      'display': 'block'
    };

    var rows = [];
    for (var i = 0; i < this.props.songTime; i++) {
      rows.push(React.createElement(
        'div',
        { key: i, style: second },
        React.createElement(
          'span',
          { style: { 'fontSize': 'xx-small' } },
          i
        )
      ));
    }
    return React.createElement(
      'div',
      {
        className: 'timeLine',
        style: this.props.style },
      React.createElement('input', {
        type: 'range',
        value: getElapsedTimeWidth(this.props.timeWidth, this.props.songTime, this.props.elapsedtime),
        onChange: this.handlechange,
        max: this.props.timeWidth,
        min: '0',
        step: '1' }),
      rows
    );
  }
}));

module.exports = TimeLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9jb21wb25lbnRzL1RpbWVMaW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSSxRQUFRLFFBQVEsT0FBUixDQUFaO0FBQ0EsSUFBSSxpQkFBaUIsUUFBUSwyQkFBUixDQUFyQjs7QUFHQSxTQUFTLGVBQVQsQ0FBeUIsU0FBekIsRUFBb0MsUUFBcEMsRUFBOEM7QUFDNUMsU0FBTyxZQUFVLFFBQWpCO0FBQ0Q7O0FBRUQsU0FBUyxjQUFULENBQXdCLFNBQXhCLEVBQW1DLFFBQW5DLEVBQTZDLFdBQTdDLEVBQTBEO0FBQ3hELFNBQU8sV0FBVyxTQUFYLEdBQXVCLFdBQTlCO0FBQ0Q7O0FBRUQsU0FBUyxtQkFBVCxDQUE2QixTQUE3QixFQUF3QyxRQUF4QyxFQUFrRCxXQUFsRCxFQUE4RDtBQUM1RCxNQUFHLFlBQVksUUFBWixHQUF1QixXQUExQixFQUFzQztBQUNwQyxXQUFPLFlBQVksUUFBWixHQUF1QixXQUE5QjtBQUNELEdBRkQsTUFHSztBQUNILFdBQU8sQ0FBUDtBQUNEO0FBRUY7O0FBRUQsSUFBSSx3Q0FBVyxNQUFNLFdBQU4sQ0FBa0I7QUFBQTs7O0FBRS9CLGdCQUFjLHNCQUFTLEtBQVQsRUFBZ0I7QUFDNUIsbUJBQWUsaUJBQWYsQ0FBaUMsZUFBZSxLQUFLLEtBQUwsQ0FBVyxTQUExQixFQUFxQyxLQUFLLEtBQUwsQ0FBVyxRQUFoRCxFQUEwRCxNQUFNLE1BQU4sQ0FBYSxLQUF2RSxDQUFqQztBQUNELEdBSjhCO0FBSy9CLFVBQU8sa0JBQVU7QUFDZixRQUFJLFNBQVM7QUFDWCxvQkFBYyxXQURIO0FBRVgsZUFBUSxnQkFBZ0IsS0FBSyxLQUFMLENBQVcsU0FBM0IsRUFBc0MsS0FBSyxLQUFMLENBQVcsUUFBakQsQ0FGRztBQUdYLGdCQUFTLEdBSEU7QUFJWCxlQUFRLE1BSkc7QUFLWCxpQkFBVTtBQUxDLEtBQWI7O0FBU0EsUUFBSSxPQUFPLEVBQVg7QUFDQSxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksS0FBSyxLQUFMLENBQVcsUUFBL0IsRUFBeUMsR0FBekMsRUFBOEM7QUFDNUMsV0FBSyxJQUFMLENBQ0U7QUFBQTtRQUFBLEVBQUssS0FBSyxDQUFWLEVBQWEsT0FBTyxNQUFwQjtRQUNFO0FBQUE7VUFBQSxFQUFNLE9BQU8sRUFBQyxZQUFXLFVBQVosRUFBYjtVQUNHO0FBREg7QUFERixPQURGO0FBT0Q7QUFDRCxXQUNFO0FBQUE7TUFBQTtBQUNFLG1CQUFVLFVBRFo7QUFFRSxlQUFPLEtBQUssS0FBTCxDQUFXLEtBRnBCO01BR0U7QUFDRSxjQUFLLE9BRFA7QUFFRSxlQUFPLG9CQUFvQixLQUFLLEtBQUwsQ0FBVyxTQUEvQixFQUEwQyxLQUFLLEtBQUwsQ0FBVyxRQUFyRCxFQUErRCxLQUFLLEtBQUwsQ0FBVyxXQUExRSxDQUZUO0FBR0Usa0JBQVUsS0FBSyxZQUhqQjtBQUlFLGFBQUssS0FBSyxLQUFMLENBQVcsU0FKbEI7QUFLRSxhQUFJLEdBTE47QUFNRSxjQUFLLEdBTlAsR0FIRjtNQVlHO0FBWkgsS0FERjtBQWdCRDtBQXpDOEIsQ0FBbEIsQ0FBWCxDQUFKOztBQTRDQSxPQUFPLE9BQVAsR0FBaUIsUUFBakIiLCJmaWxlIjoiVGltZUxpbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIERydW1LaXRBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9EcnVtS2l0QWN0aW9ucycpO1xuXG5cbmZ1bmN0aW9uIGdldFNlY29uZHNXaWR0aCh0aW1lV2lkdGgsIHNvbmdUaW1lKSB7XG4gIHJldHVybiB0aW1lV2lkdGgvc29uZ1RpbWU7XG59XG5cbmZ1bmN0aW9uIGdldGVsYXBzZWRUaW1lKHRpbWVXaWR0aCwgc29uZ1RpbWUsIGVsYXBzZWRUaW1lKSB7XG4gIHJldHVybiBzb25nVGltZSAvIHRpbWVXaWR0aCAqIGVsYXBzZWRUaW1lO1xufVxuXG5mdW5jdGlvbiBnZXRFbGFwc2VkVGltZVdpZHRoKHRpbWVXaWR0aCwgc29uZ1RpbWUsIGVsYXBzZWRUaW1lKXtcbiAgaWYodGltZVdpZHRoIC8gc29uZ1RpbWUgKiBlbGFwc2VkVGltZSl7XG4gICAgcmV0dXJuIHRpbWVXaWR0aCAvIHNvbmdUaW1lICogZWxhcHNlZFRpbWU7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxufVxuXG52YXIgVGltZUxpbmUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgaGFuZGxlY2hhbmdlOiBmdW5jdGlvbihldmVudCkge1xuICAgIERydW1LaXRBY3Rpb25zLmVsYXBzZWR0aW1lQ2hhbmdlKGdldGVsYXBzZWRUaW1lKHRoaXMucHJvcHMudGltZVdpZHRoLCB0aGlzLnByb3BzLnNvbmdUaW1lLCBldmVudC50YXJnZXQudmFsdWUpKVxuICB9LFxuICByZW5kZXI6ZnVuY3Rpb24oKXtcbiAgICB2YXIgc2Vjb25kID0ge1xuICAgICAgJ2JvcmRlckxlZnQnOiAnMXB4IHNvbGlkJyxcbiAgICAgICd3aWR0aCc6Z2V0U2Vjb25kc1dpZHRoKHRoaXMucHJvcHMudGltZVdpZHRoLCB0aGlzLnByb3BzLnNvbmdUaW1lKSxcbiAgICAgICdoZWlnaHQnOic4JyxcbiAgICAgICdmbG9hdCc6J2xlZnQnLFxuICAgICAgJ2Rpc3BsYXknOidibG9jaydcbiAgICB9O1xuXG5cbiAgICB2YXIgcm93cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5zb25nVGltZTsgaSsrKSB7XG4gICAgICByb3dzLnB1c2goXG4gICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17c2Vjb25kfT5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eydmb250U2l6ZSc6J3h4LXNtYWxsJ319PlxuICAgICAgICAgICAge2l9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwidGltZUxpbmVcIlxuICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgdmFsdWU9e2dldEVsYXBzZWRUaW1lV2lkdGgodGhpcy5wcm9wcy50aW1lV2lkdGgsIHRoaXMucHJvcHMuc29uZ1RpbWUsIHRoaXMucHJvcHMuZWxhcHNlZHRpbWUpfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZWNoYW5nZX1cbiAgICAgICAgICBtYXg9e3RoaXMucHJvcHMudGltZVdpZHRofVxuICAgICAgICAgIG1pbj1cIjBcIlxuICAgICAgICAgIHN0ZXA9XCIxXCI+XG4gICAgICAgIDwvaW5wdXQ+XG5cbiAgICAgICAge3Jvd3N9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUaW1lTGluZTtcbiJdfQ==