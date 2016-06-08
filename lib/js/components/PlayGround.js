"use strict";

var _index = require("/Users/paulmusso1/Documents/perso/vbm/react-drum-machine/node_modules/redbox-react/lib/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("/Users/paulmusso1/Documents/perso/vbm/react-drum-machine/node_modules/react-transform-catch-errors/lib/index.js");

var _index4 = _interopRequireDefault(_index3);

var _react2 = require("react");

var _react3 = _interopRequireDefault(_react2);

var _index5 = require("/Users/paulmusso1/Documents/perso/vbm/react-drum-machine/node_modules/react-transform-hmr/lib/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  _component: {}
};

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
  filename: "src/js/components/PlayGround.js",
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: "src/js/components/PlayGround.js",
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

var PlayGround = _wrapComponent("_component")(React.createClass({
  displayName: "PlayGround",


  componentDidMount: function componentDidMount() {
    $(".playGroundInstrument").draggable({ containment: "#playground", scroll: false });
  },

  render: function render() {

    var instStyle = {
      'cursor': 'move',
      'width': '70px',
      'height': '70px',
      'backgroundColor': 'black',
      'border': '1px solid black',
      'margin': '2px',
      'float': 'left'
    };
    var Instruments = this.props.instruments.map(function (instrument, i) {
      return React.createElement("div", { className: "playGroundInstrument", key: i, style: instStyle });
    }.bind(this));
    return React.createElement(
      "div",
      { id: "playground", className: "playGround" },
      Instruments
    );
  }
}));

module.exports = PlayGround;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9jb21wb25lbnRzL1BsYXlHcm91bmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVo7O0FBR0EsSUFBSSwwQ0FBYSxNQUFNLFdBQU4sQ0FBa0I7QUFBQTs7O0FBRWpDLHFCQUFtQiw2QkFBVztBQUM1QixNQUFFLHVCQUFGLEVBQTJCLFNBQTNCLENBQXFDLEVBQUUsYUFBYSxhQUFmLEVBQThCLFFBQVEsS0FBdEMsRUFBckM7QUFDRCxHQUpnQzs7QUFNakMsVUFBTyxrQkFBVTs7QUFFakIsUUFBSSxZQUFZO0FBQ2QsZ0JBQVUsTUFESTtBQUVkLGVBQVEsTUFGTTtBQUdkLGdCQUFTLE1BSEs7QUFJZCx5QkFBa0IsT0FKSjtBQUtkLGdCQUFTLGlCQUxLO0FBTWQsZ0JBQVMsS0FOSztBQU9kLGVBQVE7QUFQTSxLQUFoQjtBQVNFLFFBQUksY0FBYyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTRCLFVBQVMsVUFBVCxFQUFvQixDQUFwQixFQUF1QjtBQUNuRSxhQUNFLDZCQUFLLFdBQVUsc0JBQWYsRUFBc0MsS0FBSyxDQUEzQyxFQUE4QyxPQUFPLFNBQXJELEdBREY7QUFHRCxLQUo0QyxDQUkxQyxJQUowQyxDQUlyQyxJQUpxQyxDQUEzQixDQUFsQjtBQUtBLFdBQ0U7QUFBQTtNQUFBLEVBQUssSUFBRyxZQUFSLEVBQXFCLFdBQVUsWUFBL0I7TUFDQztBQURELEtBREY7QUFLQztBQTNCOEIsQ0FBbEIsQ0FBYixDQUFKOztBQThCQSxPQUFPLE9BQVAsR0FBaUIsVUFBakIiLCJmaWxlIjoiUGxheUdyb3VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cblxudmFyIFBsYXlHcm91bmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICQoXCIucGxheUdyb3VuZEluc3RydW1lbnRcIikuZHJhZ2dhYmxlKHsgY29udGFpbm1lbnQ6IFwiI3BsYXlncm91bmRcIiwgc2Nyb2xsOiBmYWxzZSB9KTtcbiAgfSxcblxuICByZW5kZXI6ZnVuY3Rpb24oKXtcblxuICB2YXIgaW5zdFN0eWxlID0ge1xuICAgICdjdXJzb3InOiAnbW92ZScsXG4gICAgJ3dpZHRoJzonNzBweCcsXG4gICAgJ2hlaWdodCc6JzcwcHgnLFxuICAgICdiYWNrZ3JvdW5kQ29sb3InOidibGFjaycsXG4gICAgJ2JvcmRlcic6JzFweCBzb2xpZCBibGFjaycsXG4gICAgJ21hcmdpbic6JzJweCcsXG4gICAgJ2Zsb2F0JzonbGVmdCdcbiAgfTtcbiAgICB2YXIgSW5zdHJ1bWVudHMgPSB0aGlzLnByb3BzLmluc3RydW1lbnRzLm1hcCgoZnVuY3Rpb24oaW5zdHJ1bWVudCxpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXlHcm91bmRJbnN0cnVtZW50XCIga2V5PXtpfSBzdHlsZT17aW5zdFN0eWxlfT48L2Rpdj5cbiAgICAgICk7XG4gICAgfSkuYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgaWQ9XCJwbGF5Z3JvdW5kXCIgY2xhc3NOYW1lPVwicGxheUdyb3VuZFwiID5cbiAgICAgIHtJbnN0cnVtZW50c31cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheUdyb3VuZDtcbiJdfQ==