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
  filename: 'src/js/components/Metronome.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'src/js/components/Metronome.js',
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

var metronomePointStyle = {
  'width': '10px',
  'height': '8px',
  'position': 'absolute',
  'background': '#eee',
  'left': '0px'
};

function moveMetronome(currentbeat) {
  if (currentbeat % 2 == 0) {
    $(".metronomePoint").animate({ 'left': '0px' }, 20);
  } else {
    $(".metronomePoint").animate({ 'left': '15px' }, 20);
  }
}

var Metronome = _wrapComponent('_component')(React.createClass({
  displayName: 'Metronome',


  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.currentbeat != this.props.currentbeat) {
      moveMetronome(nextProps.currentbeat);
    }
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'metronome', style: { 'position': 'relative', 'background': '#222', 'height': '100%', 'width': '100%' } },
      React.createElement('div', { className: 'metronomePoint', style: metronomePointStyle })
    );
  }
}));

module.exports = Metronome;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9jb21wb25lbnRzL01ldHJvbm9tZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBWjs7QUFFQSxJQUFJLHNCQUFzQjtBQUN4QixXQUFTLE1BRGU7QUFFeEIsWUFBVSxLQUZjO0FBR3hCLGNBQVksVUFIWTtBQUl4QixnQkFBYyxNQUpVO0FBS3hCLFVBQVE7QUFMZ0IsQ0FBMUI7O0FBUUEsU0FBUyxhQUFULENBQXVCLFdBQXZCLEVBQW1DO0FBQ2pDLE1BQUksY0FBYyxDQUFkLElBQW1CLENBQXZCLEVBQ0E7QUFDRSxNQUFFLGlCQUFGLEVBQXFCLE9BQXJCLENBQTZCLEVBQUMsUUFBUSxLQUFULEVBQTdCLEVBQTZDLEVBQTdDO0FBQ0QsR0FIRCxNQUlLO0FBQ0gsTUFBRSxpQkFBRixFQUFxQixPQUFyQixDQUE2QixFQUFDLFFBQVEsTUFBVCxFQUE3QixFQUE4QyxFQUE5QztBQUNEO0FBRUY7O0FBR0QsSUFBSSx5Q0FBWSxNQUFNLFdBQU4sQ0FBa0I7QUFBQTs7O0FBRWhDLDZCQUEyQixtQ0FBUyxTQUFULEVBQW9CO0FBQzdDLFFBQUcsVUFBVSxXQUFWLElBQXlCLEtBQUssS0FBTCxDQUFXLFdBQXZDLEVBQ0E7QUFDSSxvQkFBYyxVQUFVLFdBQXhCO0FBQ0g7QUFDSixHQVBpQzs7QUFVaEMsVUFBTyxrQkFBVTtBQUNmLFdBQ0U7QUFBQTtNQUFBLEVBQUssV0FBVSxXQUFmLEVBQTJCLE9BQU8sRUFBQyxZQUFXLFVBQVosRUFBd0IsY0FBYSxNQUFyQyxFQUE2QyxVQUFTLE1BQXRELEVBQTZELFNBQVEsTUFBckUsRUFBbEM7TUFDRSw2QkFBSyxXQUFVLGdCQUFmLEVBQWdDLE9BQU8sbUJBQXZDO0FBREYsS0FERjtBQU1DO0FBakI2QixDQUFsQixDQUFaLENBQUo7O0FBb0JBLE9BQU8sT0FBUCxHQUFpQixTQUFqQiIsImZpbGUiOiJNZXRyb25vbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgbWV0cm9ub21lUG9pbnRTdHlsZSA9IHtcbiAgJ3dpZHRoJzogJzEwcHgnLFxuICAnaGVpZ2h0JzogJzhweCcsXG4gICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXG4gICdiYWNrZ3JvdW5kJzogJyNlZWUnLFxuICAnbGVmdCc6ICcwcHgnXG59XG5cbmZ1bmN0aW9uIG1vdmVNZXRyb25vbWUoY3VycmVudGJlYXQpe1xuICBpZiAoY3VycmVudGJlYXQgJSAyID09IDApXG4gIHtcbiAgICAkKFwiLm1ldHJvbm9tZVBvaW50XCIpLmFuaW1hdGUoeydsZWZ0JzogJzBweCd9LDIwKTtcbiAgfVxuICBlbHNlIHtcbiAgICAkKFwiLm1ldHJvbm9tZVBvaW50XCIpLmFuaW1hdGUoeydsZWZ0JzogJzE1cHgnfSwyMCk7XG4gIH1cblxufVxuXG5cbnZhciBNZXRyb25vbWUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzKSB7XG4gICAgaWYobmV4dFByb3BzLmN1cnJlbnRiZWF0ICE9IHRoaXMucHJvcHMuY3VycmVudGJlYXQpXG4gICAge1xuICAgICAgICBtb3ZlTWV0cm9ub21lKG5leHRQcm9wcy5jdXJyZW50YmVhdCk7XG4gICAgfVxufSxcblxuXG4gIHJlbmRlcjpmdW5jdGlvbigpe1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1ldHJvbm9tZVwiIHN0eWxlPXt7J3Bvc2l0aW9uJzoncmVsYXRpdmUnLCAnYmFja2dyb3VuZCc6JyMyMjInLCAnaGVpZ2h0JzonMTAwJScsJ3dpZHRoJzonMTAwJSd9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZXRyb25vbWVQb2ludFwiIHN0eWxlPXttZXRyb25vbWVQb2ludFN0eWxlfT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1ldHJvbm9tZTtcbiJdfQ==