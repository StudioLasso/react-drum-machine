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
  filename: 'src/js/components/InstrumentBits.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'src/js/components/InstrumentBits.js',
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

var bitOnStyle = {
  'border': '1px solid #CCC',
  'width': '80%',
  'height': '80%',
  'margin': 'auto',
  'background': 'silver'
};

var bitOffStyle = {
  'width': '50%',
  'height': '80%',
  'margin': 'auto'
};

function getBitStyle(bitValue) {
  if (bitValue == 1) {
    return bitOnStyle;
  } else {
    return bitOffStyle;
  }
}

var InstrumentBits = _wrapComponent('_component')(React.createClass({
  displayName: 'InstrumentBits',


  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return this.props.beatslist != nextProps.beatslist;
  },

  bitClicked: function bitClicked(event) {
    var bitIndex = $(event.target).parent().data('index');
    var bitValue = $(event.target).parent().attr('data-bitvalue');
    //var bitValue = $(event.target).text();
    var currentInstrument = $(event.target).closest('.instrumentBits').data('index');

    if (parseInt(bitValue) == 1) {
      DrumKitActions.changeBit(currentInstrument, bitIndex, 0);
    } else {
      DrumKitActions.changeBit(currentInstrument, bitIndex, 1);
    }
  },

  render: function render() {
    var s = {
      instrumentBits: {
        'height': '24px',
        'display': 'table',
        'width': this.props.timeWidth
      },
      instrumentBitsContent: {
        'display': 'table-cell',
        'verticalAlign': 'middle'
      },
      bitContentStyle: {
        'float': 'left',
        'borderRight': '1px solid #CCC',
        'width': this.props.divisionsWidth,
        'height': '100%'
      },
      bitIsPlayedStyle: {
        'float': 'left',
        'outline': '1px solid silver',
        'width': this.props.divisionsWidth,
        'height': '10',
        'background': 'black'
      }
    };

    var instrumentBits = this.props.beatslist.map(function (bit, i) {
      return React.createElement(
        'div',
        { style: s.bitContentStyle, 'data-bitvalue': bit, key: i, 'data-index': i, onClick: this.bitClicked, className: 'instrumentBit' },
        React.createElement('div', { style: getBitStyle(bit) })
      );
    }.bind(this));

    return React.createElement(
      'div',
      { className: 'instrumentBits', style: s.instrumentBits, 'data-index': this.props.instindex },
      React.createElement(
        'div',
        { style: s.instrumentBitsContent },
        instrumentBits
      )
    );
  }
}));

module.exports = InstrumentBits;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9jb21wb25lbnRzL0luc3RydW1lbnRCaXRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSSxRQUFRLFFBQVEsT0FBUixDQUFaO0FBQ0EsSUFBSSxpQkFBaUIsUUFBUSwyQkFBUixDQUFyQjs7QUFHQSxJQUFJLGFBQWE7QUFDZixZQUFVLGdCQURLO0FBRWYsV0FBUSxLQUZPO0FBR2YsWUFBUyxLQUhNO0FBSWYsWUFBUyxNQUpNO0FBS2YsZ0JBQWE7QUFMRSxDQUFqQjs7QUFRQSxJQUFJLGNBQWM7QUFDaEIsV0FBUSxLQURRO0FBRWhCLFlBQVMsS0FGTztBQUdoQixZQUFTO0FBSE8sQ0FBbEI7O0FBTUEsU0FBUyxXQUFULENBQXFCLFFBQXJCLEVBQStCO0FBQzdCLE1BQUcsWUFBVSxDQUFiLEVBQWU7QUFBQyxXQUFPLFVBQVA7QUFBa0IsR0FBbEMsTUFDSztBQUFDLFdBQU8sV0FBUDtBQUFtQjtBQUMxQjs7QUFFRCxJQUFJLDhDQUFpQixNQUFNLFdBQU4sQ0FBa0I7QUFBQTs7O0FBRXBDLHlCQUF1QiwrQkFBUyxTQUFULEVBQW9CLFNBQXBCLEVBQStCO0FBQ3BELFdBQU8sS0FBSyxLQUFMLENBQVcsU0FBWCxJQUF3QixVQUFVLFNBQXpDO0FBQ0YsR0FKb0M7O0FBTXJDLGNBQVcsb0JBQVMsS0FBVCxFQUFlO0FBQ3hCLFFBQUksV0FBVyxFQUFFLE1BQU0sTUFBUixFQUFnQixNQUFoQixHQUF5QixJQUF6QixDQUE4QixPQUE5QixDQUFmO0FBQ0EsUUFBSSxXQUFXLEVBQUUsTUFBTSxNQUFSLEVBQWdCLE1BQWhCLEdBQXlCLElBQXpCLENBQThCLGVBQTlCLENBQWY7O0FBRUEsUUFBSSxvQkFBb0IsRUFBRSxNQUFNLE1BQVIsRUFBZ0IsT0FBaEIsQ0FBd0IsaUJBQXhCLEVBQTJDLElBQTNDLENBQWdELE9BQWhELENBQXhCOztBQUVBLFFBQUcsU0FBUyxRQUFULEtBQXNCLENBQXpCLEVBQ0E7QUFDRSxxQkFBZSxTQUFmLENBQXlCLGlCQUF6QixFQUE0QyxRQUE1QyxFQUFzRCxDQUF0RDtBQUNELEtBSEQsTUFJSztBQUNILHFCQUFlLFNBQWYsQ0FBeUIsaUJBQXpCLEVBQTRDLFFBQTVDLEVBQXNELENBQXREO0FBQ0Q7QUFDRixHQW5Cb0M7O0FBcUJyQyxVQUFRLGtCQUFXO0FBQ2pCLFFBQUksSUFBSTtBQUNOLHNCQUFnQjtBQUNkLGtCQUFTLE1BREs7QUFFZCxtQkFBVyxPQUZHO0FBR2QsaUJBQVMsS0FBSyxLQUFMLENBQVc7QUFITixPQURWO0FBTU4sNkJBQXNCO0FBQ3BCLG1CQUFXLFlBRFM7QUFFcEIseUJBQWlCO0FBRkcsT0FOaEI7QUFVTix1QkFBaUI7QUFDZixpQkFBUyxNQURNO0FBRWYsdUJBQWUsZ0JBRkE7QUFHZixpQkFBUSxLQUFLLEtBQUwsQ0FBVyxjQUhKO0FBSWYsa0JBQVM7QUFKTSxPQVZYO0FBZ0JOLHdCQUFrQjtBQUNoQixpQkFBUyxNQURPO0FBRWhCLG1CQUFVLGtCQUZNO0FBR2hCLGlCQUFRLEtBQUssS0FBTCxDQUFXLGNBSEg7QUFJaEIsa0JBQVMsSUFKTztBQUtoQixzQkFBYTtBQUxHO0FBaEJaLEtBQVI7O0FBeUJBLFFBQUksaUJBQWlCLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBMEIsVUFBUyxHQUFULEVBQWEsQ0FBYixFQUFnQjtBQUM3RCxhQUNFO0FBQUE7UUFBQSxFQUFLLE9BQU8sRUFBRSxlQUFkLEVBQStCLGlCQUFlLEdBQTlDLEVBQW1ELEtBQUssQ0FBeEQsRUFBMkQsY0FBWSxDQUF2RSxFQUEwRSxTQUFTLEtBQUssVUFBeEYsRUFBb0csV0FBVSxlQUE5RztRQUNFLDZCQUFLLE9BQU8sWUFBWSxHQUFaLENBQVo7QUFERixPQURGO0FBS0QsS0FONkMsQ0FNM0MsSUFOMkMsQ0FNdEMsSUFOc0MsQ0FBekIsQ0FBckI7O0FBUUEsV0FDRTtBQUFBO01BQUEsRUFBSyxXQUFVLGdCQUFmLEVBQWdDLE9BQU8sRUFBRSxjQUF6QyxFQUF5RCxjQUFZLEtBQUssS0FBTCxDQUFXLFNBQWhGO01BQ0U7QUFBQTtRQUFBLEVBQUssT0FBTyxFQUFFLHFCQUFkO1FBQ0c7QUFESDtBQURGLEtBREY7QUFPRDtBQTlEb0MsQ0FBbEIsQ0FBakIsQ0FBSjs7QUFpRUEsT0FBTyxPQUFQLEdBQWlCLGNBQWpCIiwiZmlsZSI6Ikluc3RydW1lbnRCaXRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBEcnVtS2l0QWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvRHJ1bUtpdEFjdGlvbnMnKTtcblxuXG52YXIgYml0T25TdHlsZSA9IHtcbiAgJ2JvcmRlcic6ICcxcHggc29saWQgI0NDQycsXG4gICd3aWR0aCc6JzgwJScsXG4gICdoZWlnaHQnOic4MCUnLFxuICAnbWFyZ2luJzonYXV0bycsXG4gICdiYWNrZ3JvdW5kJzonc2lsdmVyJ1xufVxuXG52YXIgYml0T2ZmU3R5bGUgPSB7XG4gICd3aWR0aCc6JzUwJScsXG4gICdoZWlnaHQnOic4MCUnLFxuICAnbWFyZ2luJzonYXV0bydcbn1cblxuZnVuY3Rpb24gZ2V0Qml0U3R5bGUoYml0VmFsdWUpIHtcbiAgaWYoYml0VmFsdWU9PTEpe3JldHVybiBiaXRPblN0eWxlfVxuICBlbHNlIHtyZXR1cm4gYml0T2ZmU3R5bGV9XG59XG5cbnZhciBJbnN0cnVtZW50Qml0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICByZXR1cm4gdGhpcy5wcm9wcy5iZWF0c2xpc3QgIT0gbmV4dFByb3BzLmJlYXRzbGlzdDtcbiAgfSxcblxuICBiaXRDbGlja2VkOmZ1bmN0aW9uKGV2ZW50KXtcbiAgICB2YXIgYml0SW5kZXggPSAkKGV2ZW50LnRhcmdldCkucGFyZW50KCkuZGF0YSgnaW5kZXgnKTtcbiAgICB2YXIgYml0VmFsdWUgPSAkKGV2ZW50LnRhcmdldCkucGFyZW50KCkuYXR0cignZGF0YS1iaXR2YWx1ZScpO1xuICAgIC8vdmFyIGJpdFZhbHVlID0gJChldmVudC50YXJnZXQpLnRleHQoKTtcbiAgICB2YXIgY3VycmVudEluc3RydW1lbnQgPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmluc3RydW1lbnRCaXRzJykuZGF0YSgnaW5kZXgnKTtcblxuICAgIGlmKHBhcnNlSW50KGJpdFZhbHVlKSA9PSAxKVxuICAgIHtcbiAgICAgIERydW1LaXRBY3Rpb25zLmNoYW5nZUJpdChjdXJyZW50SW5zdHJ1bWVudCwgYml0SW5kZXgsIDApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIERydW1LaXRBY3Rpb25zLmNoYW5nZUJpdChjdXJyZW50SW5zdHJ1bWVudCwgYml0SW5kZXgsIDEpO1xuICAgIH1cbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzID0ge1xuICAgICAgaW5zdHJ1bWVudEJpdHM6IHtcbiAgICAgICAgJ2hlaWdodCc6JzI0cHgnLFxuICAgICAgICAnZGlzcGxheSc6ICd0YWJsZScsXG4gICAgICAgICd3aWR0aCc6IHRoaXMucHJvcHMudGltZVdpZHRoXG4gICAgICB9LFxuICAgICAgaW5zdHJ1bWVudEJpdHNDb250ZW50OntcbiAgICAgICAgJ2Rpc3BsYXknOiAndGFibGUtY2VsbCcsXG4gICAgICAgICd2ZXJ0aWNhbEFsaWduJzogJ21pZGRsZScsXG4gICAgICB9LFxuICAgICAgYml0Q29udGVudFN0eWxlOiB7XG4gICAgICAgICdmbG9hdCc6ICdsZWZ0JyxcbiAgICAgICAgJ2JvcmRlclJpZ2h0JzogJzFweCBzb2xpZCAjQ0NDJyxcbiAgICAgICAgJ3dpZHRoJzp0aGlzLnByb3BzLmRpdmlzaW9uc1dpZHRoLFxuICAgICAgICAnaGVpZ2h0JzonMTAwJScsXG4gICAgICB9LFxuICAgICAgYml0SXNQbGF5ZWRTdHlsZToge1xuICAgICAgICAnZmxvYXQnOiAnbGVmdCcsXG4gICAgICAgICdvdXRsaW5lJzonMXB4IHNvbGlkIHNpbHZlcicsXG4gICAgICAgICd3aWR0aCc6dGhpcy5wcm9wcy5kaXZpc2lvbnNXaWR0aCxcbiAgICAgICAgJ2hlaWdodCc6JzEwJyxcbiAgICAgICAgJ2JhY2tncm91bmQnOidibGFjaydcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGluc3RydW1lbnRCaXRzID0gdGhpcy5wcm9wcy5iZWF0c2xpc3QubWFwKChmdW5jdGlvbihiaXQsaSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBzdHlsZT17cy5iaXRDb250ZW50U3R5bGV9IGRhdGEtYml0dmFsdWU9e2JpdH0ga2V5PXtpfSBkYXRhLWluZGV4PXtpfSBvbkNsaWNrPXt0aGlzLmJpdENsaWNrZWR9IGNsYXNzTmFtZT1cImluc3RydW1lbnRCaXRcIj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXtnZXRCaXRTdHlsZShiaXQpfT48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0pLmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5zdHJ1bWVudEJpdHNcIiBzdHlsZT17cy5pbnN0cnVtZW50Qml0c30gZGF0YS1pbmRleD17dGhpcy5wcm9wcy5pbnN0aW5kZXh9PlxuICAgICAgICA8ZGl2IHN0eWxlPXtzLmluc3RydW1lbnRCaXRzQ29udGVudH0+XG4gICAgICAgICAge2luc3RydW1lbnRCaXRzfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnN0cnVtZW50Qml0cztcbiJdfQ==