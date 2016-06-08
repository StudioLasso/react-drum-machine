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
  filename: 'src/js/components/InstrumentBitsList.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'src/js/components/InstrumentBitsList.js',
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
var InstrumentBits = require('./InstrumentBits');
var DivisionCopier = require('./DivisionCopier');
var DrumKitActions = require('../actions/DrumKitActions');

var InstrumentsList = _wrapComponent('_component')(React.createClass({
  displayName: 'InstrumentsList',


  handleTimeMove: function handleTimeMove(e) {
    DrumKitActions.setCurrentTime(e.target.value);
  },

  render: function render() {
    var instrumentBitNodes = this.props.instruments.map(function (instrument, i) {
      return React.createElement(InstrumentBits, {
        timeWidth: this.props.timeWidth,
        divisionsWidth: this.props.divisionsWidth,
        beatslist: instrument.bits,
        key: i,
        instindex: i });
    }.bind(this));

    return React.createElement(
      'div',
      { className: 'instrumentBitsList' },
      instrumentBitNodes,
      React.createElement(DivisionCopier, { measurenumber: this.props.measurenumber, beatpermeasure: this.props.beatpermeasure, beatwidth: this.props.beatwidth })
    );
  }
}));

module.exports = InstrumentsList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9jb21wb25lbnRzL0luc3RydW1lbnRCaXRzTGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBWjtBQUNBLElBQUksaUJBQWdCLFFBQVEsa0JBQVIsQ0FBcEI7QUFDQSxJQUFJLGlCQUFpQixRQUFRLGtCQUFSLENBQXJCO0FBQ0EsSUFBSSxpQkFBaUIsUUFBUSwyQkFBUixDQUFyQjs7QUFHQSxJQUFJLCtDQUFrQixNQUFNLFdBQU4sQ0FBa0I7QUFBQTs7O0FBRXRDLGtCQUFlLHdCQUFTLENBQVQsRUFBVztBQUN4QixtQkFBZSxjQUFmLENBQThCLEVBQUUsTUFBRixDQUFTLEtBQXZDO0FBQ0QsR0FKcUM7O0FBTXRDLFVBQVEsa0JBQVc7QUFDakIsUUFBSSxxQkFBcUIsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUE0QixVQUFTLFVBQVQsRUFBb0IsQ0FBcEIsRUFBdUI7QUFDMUUsYUFDRSxvQkFBQyxjQUFEO0FBQ0UsbUJBQVcsS0FBSyxLQUFMLENBQVcsU0FEeEI7QUFFRSx3QkFBZ0IsS0FBSyxLQUFMLENBQVcsY0FGN0I7QUFHRSxtQkFBVyxXQUFXLElBSHhCO0FBSUUsYUFBSyxDQUpQO0FBS0UsbUJBQVcsQ0FMYixHQURGO0FBU0QsS0FWbUQsQ0FVakQsSUFWaUQsQ0FVNUMsSUFWNEMsQ0FBM0IsQ0FBekI7O0FBWUEsV0FDRTtBQUFBO01BQUEsRUFBSyxXQUFVLG9CQUFmO01BQ0csa0JBREg7TUFFRSxvQkFBQyxjQUFELElBQWdCLGVBQWUsS0FBSyxLQUFMLENBQVcsYUFBMUMsRUFBeUQsZ0JBQWdCLEtBQUssS0FBTCxDQUFXLGNBQXBGLEVBQW9HLFdBQVcsS0FBSyxLQUFMLENBQVcsU0FBMUg7QUFGRixLQURGO0FBTUQ7QUF6QnFDLENBQWxCLENBQWxCLENBQUo7O0FBNEJBLE9BQU8sT0FBUCxHQUFpQixlQUFqQiIsImZpbGUiOiJJbnN0cnVtZW50Qml0c0xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEluc3RydW1lbnRCaXRzPSByZXF1aXJlKCcuL0luc3RydW1lbnRCaXRzJyk7XG52YXIgRGl2aXNpb25Db3BpZXIgPSByZXF1aXJlKCcuL0RpdmlzaW9uQ29waWVyJyk7XG52YXIgRHJ1bUtpdEFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL0RydW1LaXRBY3Rpb25zJyk7XG5cblxudmFyIEluc3RydW1lbnRzTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBoYW5kbGVUaW1lTW92ZTpmdW5jdGlvbihlKXtcbiAgICBEcnVtS2l0QWN0aW9ucy5zZXRDdXJyZW50VGltZShlLnRhcmdldC52YWx1ZSk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaW5zdHJ1bWVudEJpdE5vZGVzID0gdGhpcy5wcm9wcy5pbnN0cnVtZW50cy5tYXAoKGZ1bmN0aW9uKGluc3RydW1lbnQsaSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEluc3RydW1lbnRCaXRzXG4gICAgICAgICAgdGltZVdpZHRoPXt0aGlzLnByb3BzLnRpbWVXaWR0aH1cbiAgICAgICAgICBkaXZpc2lvbnNXaWR0aD17dGhpcy5wcm9wcy5kaXZpc2lvbnNXaWR0aH1cbiAgICAgICAgICBiZWF0c2xpc3Q9e2luc3RydW1lbnQuYml0c31cbiAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgaW5zdGluZGV4PXtpfT5cbiAgICAgICAgPC9JbnN0cnVtZW50Qml0cz5cbiAgICAgICk7XG4gICAgfSkuYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnN0cnVtZW50Qml0c0xpc3RcIj5cbiAgICAgICAge2luc3RydW1lbnRCaXROb2Rlc31cbiAgICAgICAgPERpdmlzaW9uQ29waWVyIG1lYXN1cmVudW1iZXI9e3RoaXMucHJvcHMubWVhc3VyZW51bWJlcn0gYmVhdHBlcm1lYXN1cmU9e3RoaXMucHJvcHMuYmVhdHBlcm1lYXN1cmV9IGJlYXR3aWR0aD17dGhpcy5wcm9wcy5iZWF0d2lkdGh9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSW5zdHJ1bWVudHNMaXN0O1xuIl19