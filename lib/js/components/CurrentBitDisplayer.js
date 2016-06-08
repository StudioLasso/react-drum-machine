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
  filename: 'src/js/components/CurrentBitDisplayer.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'src/js/components/CurrentBitDisplayer.js',
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

function getElapsedTimeWidth(beatwidth, currentbeat) {
  if (beatwidth * currentbeat) {
    return beatwidth * currentbeat;
  } else {
    return 0;
  }
}

function getMeasureWidth(beatwidth, beatpermeasure) {
  if (beatwidth * beatpermeasure) {
    return beatwidth * beatpermeasure * 2;
  } else {
    return 0;
  }
}

var CurrentBitDisplayer = _wrapComponent('_component')(React.createClass({
  displayName: 'CurrentBitDisplayer',


  render: function render() {
    var thisStyle = {
      'position': 'absolute',
      'height': '100%',
      'backgroundColor': '#555',
      'background': 'linear-gradient(to right, #555 50%, silver 50%)',
      'backgroundSize': getMeasureWidth(this.props.beatwidth, this.props.beatpermeasure),
      'width': this.props.timewidth,
      'zIndex': '-1',
      'opacity': '0.5'
    };
    var currentBitShower = {
      'height': '100%',
      'width': this.props.beatwidth,
      'backgroundColor': 'black',
      'left': getElapsedTimeWidth(this.props.beatwidth, this.props.currentbeat),
      'position': 'absolute'
    };
    return React.createElement(
      'div',
      { className: 'currentBitDisplayer', style: thisStyle },
      React.createElement('div', { style: currentBitShower })
    );
  }
}));

module.exports = CurrentBitDisplayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9jb21wb25lbnRzL0N1cnJlbnRCaXREaXNwbGF5ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVo7O0FBRUEsU0FBUyxtQkFBVCxDQUE2QixTQUE3QixFQUF3QyxXQUF4QyxFQUNBO0FBQ0UsTUFBRyxZQUFZLFdBQWYsRUFDQTtBQUNFLFdBQU8sWUFBWSxXQUFuQjtBQUNELEdBSEQsTUFJSztBQUNILFdBQU8sQ0FBUDtBQUNEO0FBQ0Y7O0FBRUQsU0FBUyxlQUFULENBQXlCLFNBQXpCLEVBQW9DLGNBQXBDLEVBQ0E7QUFDRSxNQUFHLFlBQVksY0FBZixFQUNBO0FBQ0UsV0FBTyxZQUFZLGNBQVosR0FBNkIsQ0FBcEM7QUFDRCxHQUhELE1BSUs7QUFDSCxXQUFPLENBQVA7QUFDRDtBQUNGOztBQUVELElBQUksbURBQXNCLE1BQU0sV0FBTixDQUFrQjtBQUFBOzs7QUFFMUMsVUFBTyxrQkFBVTtBQUNmLFFBQUksWUFBWTtBQUNkLGtCQUFXLFVBREc7QUFFZCxnQkFBVSxNQUZJO0FBR2QseUJBQWtCLE1BSEo7QUFJZCxvQkFBYyxpREFKQTtBQUtkLHdCQUFrQixnQkFBZ0IsS0FBSyxLQUFMLENBQVcsU0FBM0IsRUFBc0MsS0FBSyxLQUFMLENBQVcsY0FBakQsQ0FMSjtBQU1kLGVBQVMsS0FBSyxLQUFMLENBQVcsU0FOTjtBQU9kLGdCQUFVLElBUEk7QUFRZCxpQkFBVTtBQVJJLEtBQWhCO0FBVUEsUUFBSSxtQkFBbUI7QUFDckIsZ0JBQVUsTUFEVztBQUVyQixlQUFTLEtBQUssS0FBTCxDQUFXLFNBRkM7QUFHckIseUJBQW1CLE9BSEU7QUFJckIsY0FBUSxvQkFBb0IsS0FBSyxLQUFMLENBQVcsU0FBL0IsRUFBMEMsS0FBSyxLQUFMLENBQVcsV0FBckQsQ0FKYTtBQUtyQixrQkFBWTtBQUxTLEtBQXZCO0FBT0EsV0FDRTtBQUFBO01BQUEsRUFBSyxXQUFVLHFCQUFmLEVBQXFDLE9BQU8sU0FBNUM7TUFDRSw2QkFBSyxPQUFPLGdCQUFaO0FBREYsS0FERjtBQUtDO0FBekJ1QyxDQUFsQixDQUF0QixDQUFKOztBQTRCQSxPQUFPLE9BQVAsR0FBaUIsbUJBQWpCIiwiZmlsZSI6IkN1cnJlbnRCaXREaXNwbGF5ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5mdW5jdGlvbiBnZXRFbGFwc2VkVGltZVdpZHRoKGJlYXR3aWR0aCwgY3VycmVudGJlYXQpXG57XG4gIGlmKGJlYXR3aWR0aCAqIGN1cnJlbnRiZWF0KVxuICB7XG4gICAgcmV0dXJuIGJlYXR3aWR0aCAqIGN1cnJlbnRiZWF0XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0TWVhc3VyZVdpZHRoKGJlYXR3aWR0aCwgYmVhdHBlcm1lYXN1cmUpXG57XG4gIGlmKGJlYXR3aWR0aCAqIGJlYXRwZXJtZWFzdXJlKVxuICB7XG4gICAgcmV0dXJuIGJlYXR3aWR0aCAqIGJlYXRwZXJtZWFzdXJlICogMjtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gMDtcbiAgfVxufVxuXG52YXIgQ3VycmVudEJpdERpc3BsYXllciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXI6ZnVuY3Rpb24oKXtcbiAgICB2YXIgdGhpc1N0eWxlID0ge1xuICAgICAgJ3Bvc2l0aW9uJzonYWJzb2x1dGUnLFxuICAgICAgJ2hlaWdodCc6ICcxMDAlJyxcbiAgICAgICdiYWNrZ3JvdW5kQ29sb3InOicjNTU1JyxcbiAgICAgICdiYWNrZ3JvdW5kJzogJ2xpbmVhci1ncmFkaWVudCh0byByaWdodCwgIzU1NSA1MCUsIHNpbHZlciA1MCUpJyxcbiAgICAgICdiYWNrZ3JvdW5kU2l6ZSc6IGdldE1lYXN1cmVXaWR0aCh0aGlzLnByb3BzLmJlYXR3aWR0aCwgdGhpcy5wcm9wcy5iZWF0cGVybWVhc3VyZSksXG4gICAgICAnd2lkdGgnOiB0aGlzLnByb3BzLnRpbWV3aWR0aCxcbiAgICAgICd6SW5kZXgnOiAnLTEnLFxuICAgICAgJ29wYWNpdHknOicwLjUnXG4gICAgfVxuICAgIHZhciBjdXJyZW50Qml0U2hvd2VyID0ge1xuICAgICAgJ2hlaWdodCc6ICcxMDAlJyxcbiAgICAgICd3aWR0aCc6IHRoaXMucHJvcHMuYmVhdHdpZHRoLFxuICAgICAgJ2JhY2tncm91bmRDb2xvcic6ICdibGFjaycsXG4gICAgICAnbGVmdCc6IGdldEVsYXBzZWRUaW1lV2lkdGgodGhpcy5wcm9wcy5iZWF0d2lkdGgsIHRoaXMucHJvcHMuY3VycmVudGJlYXQpLFxuICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3VycmVudEJpdERpc3BsYXllclwiIHN0eWxlPXt0aGlzU3R5bGV9PlxuICAgICAgICA8ZGl2IHN0eWxlPXtjdXJyZW50Qml0U2hvd2VyfT48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ3VycmVudEJpdERpc3BsYXllcjtcbiJdfQ==