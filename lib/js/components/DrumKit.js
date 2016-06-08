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
  filename: 'src/js/components/DrumKit.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
  filename: 'src/js/components/DrumKit.js',
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
var DrumKitStore = require('../stores/DrumKitStore');
var InstrumentBitsList = require('./InstrumentBitsList');
var InstrumentInfos = require('./InstrumentInfos');
var DrumKitConsole = require('./DrumKitConsole');
var TimeLine = require('./TimeLine');
var PlayGround = require('./PlayGround');
var Metronome = require('./Metronome');
var MusicChoice = require('./MusicChoice');
var CurrentBitDisplayer = require('./CurrentBitDisplayer');

var timeWidth = 6200;

function getdrumkitData() {
  var dkinfo = DrumKitStore.getDrumKitInfos();
  return {
    bpm: dkinfo.bpm,
    time: dkinfo.time,
    divisionnumber: dkinfo.divisionnumber,
    instruments: dkinfo.instruments,
    beatpermeasure: dkinfo.beatpermeasure,
    divisionperbeat: dkinfo.divisionperbeat,
    elapsedtime: dkinfo.elapsedtime
  };
}

function getMeasureNumber(divisionnumber, divisionperbeat, beatpermeasure) {
  if (divisionnumber / divisionperbeat / beatpermeasure) {
    return Math.floor(divisionnumber / divisionperbeat / beatpermeasure);
  } else {
    return 0;
  }
}

function getCurrentDivision() {
  return {
    currentdivision: DrumKitStore.getCurrentDivision()
  };
}

function GetCurrentBeat() {
  return {
    currentbeat: DrumKitStore.getCurrentBeat()
  };
}

function getDivisionWidth(divisionnumber) {
  return timeWidth / divisionnumber;
}

function getBeatsWidth(divisionnumber, divisionperbeat) {
  return timeWidth / divisionnumber * divisionperbeat;
}

function GetCurrentTime() {
  return {
    elapsedtime: DrumKitStore.getCurrentTime()
  };
}

var DrumKit = _wrapComponent('_component')(React.createClass({
  displayName: 'DrumKit',

  getInitialState: function getInitialState() {
    return getdrumkitData();
  },

  componentDidMount: function componentDidMount() {
    DrumKitStore.addChangedListener(this._onChange);
    DrumKitStore.addCurrentBeatListener(this._onBeatChange);
    DrumKitStore.addDivisionListener(this._onDivisionChange);
    DrumKitStore.addPausedsedTimeListener(this._OnTimeChanged);
    DrumKitActions.loadDrumKit(0);
  },

  handleKeyDown: function handleKeyDown(event) {
    switch (event.keyCode) {
      case 72:
        DrumKitActions.changeBit(0, this.state.currentdivision, 1);
        break;
      case 83:
        DrumKitActions.changeBit(1, this.state.currentdivision, 1);
        break;
      case 75:
        DrumKitActions.changeBit(3, this.state.currentdivision, 1);
        break;
      default:
      //do nothing
    }
  },
  render: function render() {
    var s = {
      timeStyle: {
        'width': timeWidth
      },
      tlcontent: {
        'height': "12px",
        'marginTop': '5px',
        'marginBottom': '20px'
      }
    };
    return React.createElement(
      'div',
      { className: 'drumKit', onKeyDown: this.handleKeyDown },
      React.createElement(
        'div',
        null,
        React.createElement(DrumKitConsole, { currentbeat: this.state.currentbeat, elapsedtime: this.state.elapsedtime, divisionperbeat: this.state.divisionperbeat, beatpermeasure: this.state.beatpermeasure, divisionnumber: this.state.divisionnumber, bpm: this.state.bpm, time: this.state.time })
      ),
      React.createElement(
        'div',
        { className: 'instrumentInfosContent', style: { 'float': 'left' } },
        React.createElement(
          'div',
          { className: 'metronome', style: { 'height': "12px", 'marginTop': '5px', 'marginBottom': '20px', 'width': '80%' } },
          React.createElement(Metronome, { bpm: this.state.bpm, currentbeat: this.state.currentbeat })
        ),
        React.createElement(InstrumentInfos, { instruments: this.state.instruments })
      ),
      React.createElement(
        'div',
        { className: 'notesContent', style: { 'float': 'left', 'maxWidth': '1000px', 'overflowX': 'auto', 'overflowY': 'hidden', 'position': 'relative' } },
        React.createElement(
          'div',
          { className: 'timeLineContainer', style: s.timeStyle },
          React.createElement(TimeLine, { songTime: this.state.time, elapsedtime: this.state.elapsedtime, timeWidth: timeWidth, style: s.tlcontent })
        ),
        React.createElement(
          'div',
          { className: 'InstrumentBitsListContainer', style: s.timeStyle },
          React.createElement(CurrentBitDisplayer, { timewidth: timeWidth, beatwidth: getBeatsWidth(this.state.divisionnumber, this.state.divisionperbeat), currentbeat: this.state.currentbeat, beatpermeasure: this.state.beatpermeasure }),
          React.createElement(InstrumentBitsList, { measurenumber: getMeasureNumber(this.state.divisionnumber, this.state.divisionperbeat, this.state.beatpermeasure), timeWidth: timeWidth, divisionsWidth: getDivisionWidth(this.state.divisionnumber), beatwidth: getBeatsWidth(this.state.divisionnumber, this.state.divisionperbeat), beatpermeasure: this.state.beatpermeasure, instruments: this.state.instruments })
        )
      ),
      React.createElement('div', { style: { 'clear': 'both' } }),
      React.createElement(
        'div',
        null,
        React.createElement(MusicChoice, null)
      )
    );
  },
  _onChange: function _onChange() {
    this.setState(getdrumkitData());
  },

  _onDivisionChange: function _onDivisionChange() {
    this.setState(getCurrentDivision());
  },

  _onBeatChange: function _onBeatChange() {
    this.setState(GetCurrentBeat());
  },

  _OnTimeChanged: function _OnTimeChanged() {
    this.setState(GetCurrentTime());
  }
}));

module.exports = DrumKit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9jb21wb25lbnRzL0RydW1LaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVo7QUFDQSxJQUFJLGlCQUFpQixRQUFRLDJCQUFSLENBQXJCO0FBQ0EsSUFBSSxlQUFlLFFBQVEsd0JBQVIsQ0FBbkI7QUFDQSxJQUFJLHFCQUFxQixRQUFRLHNCQUFSLENBQXpCO0FBQ0EsSUFBSSxrQkFBa0IsUUFBUSxtQkFBUixDQUF0QjtBQUNBLElBQUksaUJBQWlCLFFBQVEsa0JBQVIsQ0FBckI7QUFDQSxJQUFJLFdBQVcsUUFBUSxZQUFSLENBQWY7QUFDQSxJQUFJLGFBQWEsUUFBUSxjQUFSLENBQWpCO0FBQ0EsSUFBSSxZQUFZLFFBQVEsYUFBUixDQUFoQjtBQUNBLElBQUksY0FBYyxRQUFRLGVBQVIsQ0FBbEI7QUFDQSxJQUFJLHNCQUFzQixRQUFRLHVCQUFSLENBQTFCOztBQUVBLElBQUksWUFBWSxJQUFoQjs7QUFFQSxTQUFTLGNBQVQsR0FBMEI7QUFDeEIsTUFBSSxTQUFTLGFBQWEsZUFBYixFQUFiO0FBQ0EsU0FBTztBQUNMLFNBQUssT0FBTyxHQURQO0FBRUwsVUFBTSxPQUFPLElBRlI7QUFHTCxvQkFBZSxPQUFPLGNBSGpCO0FBSUwsaUJBQWEsT0FBTyxXQUpmO0FBS0wsb0JBQWUsT0FBTyxjQUxqQjtBQU1MLHFCQUFnQixPQUFPLGVBTmxCO0FBT0wsaUJBQWEsT0FBTztBQVBmLEdBQVA7QUFTRDs7QUFFRCxTQUFTLGdCQUFULENBQTBCLGNBQTFCLEVBQTBDLGVBQTFDLEVBQTJELGNBQTNELEVBQ0E7QUFDRSxNQUFHLGlCQUFpQixlQUFqQixHQUFtQyxjQUF0QyxFQUFxRDtBQUNuRCxXQUFPLEtBQUssS0FBTCxDQUFZLGlCQUFpQixlQUFsQixHQUFxQyxjQUFoRCxDQUFQO0FBQ0QsR0FGRCxNQUdL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b0JNO0FBQUE7UUFBQTtRQUNFLG9CQUFDLFdBQUQ7QUFERjtBQXBCTixLQUZGO0FBMkJELEdBbkUyQjtBQW9FOUIsYUFBVyxxQkFBVztBQUNwQixTQUFLLFFBQUwsQ0FBYyxnQkFBZDtBQUNELEdBdEU2Qjs7QUF3RTlCLHFCQUFtQiw2QkFBVztBQUM1QixTQUFLLFFBQUwsQ0FBYyxvQkFBZDtBQUNELEdBMUU2Qjs7QUE0RTlCLGlCQUFlLHlCQUFXO0FBQ3hCLFNBQUssUUFBTCxDQUFjLGdCQUFkO0FBQ0QsR0E5RTZCOztBQWdGOUIsa0JBQWdCLDBCQUFXO0FBQ3pCLFNBQUssUUFBTCxDQUFjLGdCQUFkO0FBQ0Q7QUFsRjZCLENBQWxCLENBQVYsQ0FBSjs7QUFxRkEsT0FBTyxPQUFQLEdBQWlCLE9BQWpCIiwiZmlsZSI6IkRydW1LaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIERydW1LaXRBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9EcnVtS2l0QWN0aW9ucycpO1xudmFyIERydW1LaXRTdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3Jlcy9EcnVtS2l0U3RvcmUnKTtcbnZhciBJbnN0cnVtZW50Qml0c0xpc3QgPSByZXF1aXJlKCcuL0luc3RydW1lbnRCaXRzTGlzdCcpO1xudmFyIEluc3RydW1lbnRJbmZvcyA9IHJlcXVpcmUoJy4vSW5zdHJ1bWVudEluZm9zJyk7XG52YXIgRHJ1bUtpdENvbnNvbGUgPSByZXF1aXJlKCcuL0RydW1LaXRDb25zb2xlJyk7XG52YXIgVGltZUxpbmUgPSByZXF1aXJlKCcuL1RpbWVMaW5lJyk7XG52YXIgUGxheUdyb3VuZCA9IHJlcXVpcmUoJy4vUGxheUdyb3VuZCcpO1xudmFyIE1ldHJvbm9tZSA9IHJlcXVpcmUoJy4vTWV0cm9ub21lJyk7XG52YXIgTXVzaWNDaG9pY2UgPSByZXF1aXJlKCcuL011c2ljQ2hvaWNlJyk7XG52YXIgQ3VycmVudEJpdERpc3BsYXllciA9IHJlcXVpcmUoJy4vQ3VycmVudEJpdERpc3BsYXllcicpO1xuXG52YXIgdGltZVdpZHRoID0gNjIwMDtcblxuZnVuY3Rpb24gZ2V0ZHJ1bWtpdERhdGEoKSB7XG4gIHZhciBka2luZm8gPSBEcnVtS2l0U3RvcmUuZ2V0RHJ1bUtpdEluZm9zKCk7XG4gIHJldHVybiB7XG4gICAgYnBtOiBka2luZm8uYnBtLFxuICAgIHRpbWU6IGRraW5mby50aW1lLFxuICAgIGRpdmlzaW9ubnVtYmVyOmRraW5mby5kaXZpc2lvbm51bWJlcixcbiAgICBpbnN0cnVtZW50czogZGtpbmZvLmluc3RydW1lbnRzLFxuICAgIGJlYXRwZXJtZWFzdXJlOmRraW5mby5iZWF0cGVybWVhc3VyZSxcbiAgICBkaXZpc2lvbnBlcmJlYXQ6ZGtpbmZvLmRpdmlzaW9ucGVyYmVhdCxcbiAgICBlbGFwc2VkdGltZTogZGtpbmZvLmVsYXBzZWR0aW1lXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldE1lYXN1cmVOdW1iZXIoZGl2aXNpb25udW1iZXIsIGRpdmlzaW9ucGVyYmVhdCwgYmVhdHBlcm1lYXN1cmUpXG57XG4gIGlmKGRpdmlzaW9ubnVtYmVyIC8gZGl2aXNpb25wZXJiZWF0IC8gYmVhdHBlcm1lYXN1cmUpe1xuICAgIHJldHVybiBNYXRoLmZsb29yKChkaXZpc2lvbm51bWJlciAvIGRpdmlzaW9ucGVyYmVhdCkgLyBiZWF0cGVybWVhc3VyZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q3VycmVudERpdmlzaW9uKCl7XG4gIHJldHVybntcbiAgICBjdXJyZW50ZGl2aXNpb246IERydW1LaXRTdG9yZS5nZXRDdXJyZW50RGl2aXNpb24oKVxuICB9O1xufVxuXG5mdW5jdGlvbiBHZXRDdXJyZW50QmVhdCgpe1xuICByZXR1cm57XG4gICAgY3VycmVudGJlYXQ6IERydW1LaXRTdG9yZS5nZXRDdXJyZW50QmVhdCgpXG4gIH07XG59XG5cblxuZnVuY3Rpb24gZ2V0RGl2aXNpb25XaWR0aChkaXZpc2lvbm51bWJlcikge1xuICByZXR1cm4gdGltZVdpZHRoIC8gZGl2aXNpb25udW1iZXI7XG59XG5cbmZ1bmN0aW9uIGdldEJlYXRzV2lkdGgoZGl2aXNpb25udW1iZXIsIGRpdmlzaW9ucGVyYmVhdCkge1xuICByZXR1cm4gdGltZVdpZHRoIC8gZGl2aXNpb25udW1iZXIgKiBkaXZpc2lvbnBlcmJlYXQ7XG59XG5cbmZ1bmN0aW9uIEdldEN1cnJlbnRUaW1lKCl7XG4gIHJldHVybntcbiAgICBlbGFwc2VkdGltZTogRHJ1bUtpdFN0b3JlLmdldEN1cnJlbnRUaW1lKClcbiAgfTtcbn1cblxudmFyIERydW1LaXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGdldGRydW1raXREYXRhKClcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgRHJ1bUtpdFN0b3JlLmFkZENoYW5nZWRMaXN0ZW5lcih0aGlzLl9vbkNoYW5nZSk7XG4gICAgRHJ1bUtpdFN0b3JlLmFkZEN1cnJlbnRCZWF0TGlzdGVuZXIodGhpcy5fb25CZWF0Q2hhbmdlKVxuICAgIERydW1LaXRTdG9yZS5hZGREaXZpc2lvbkxpc3RlbmVyKHRoaXMuX29uRGl2aXNpb25DaGFuZ2UpO1xuICAgIERydW1LaXRTdG9yZS5hZGRQYXVzZWRzZWRUaW1lTGlzdGVuZXIodGhpcy5fT25UaW1lQ2hhbmdlZCk7XG4gICAgRHJ1bUtpdEFjdGlvbnMubG9hZERydW1LaXQoMCk7XG5cbiAgfSxcblxuICBoYW5kbGVLZXlEb3duOmZ1bmN0aW9uKGV2ZW50KXtcbiAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSA3MjpcbiAgICAgICAgICAgICAgICBEcnVtS2l0QWN0aW9ucy5jaGFuZ2VCaXQoMCwgdGhpcy5zdGF0ZS5jdXJyZW50ZGl2aXNpb24sIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA4MzpcbiAgICAgICAgICAgICAgICBEcnVtS2l0QWN0aW9ucy5jaGFuZ2VCaXQoMSwgdGhpcy5zdGF0ZS5jdXJyZW50ZGl2aXNpb24sIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA3NTpcbiAgICAgICAgICAgICAgICBEcnVtS2l0QWN0aW9ucy5jaGFuZ2VCaXQoMywgdGhpcy5zdGF0ZS5jdXJyZW50ZGl2aXNpb24sIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vZG8gbm90aGluZ1xuICAgICAgICB9XG4gIH0sXG4gICAgcmVuZGVyOmZ1bmN0aW9uKCl7XG4gICAgICB2YXIgcyA9IHtcbiAgICAgICAgdGltZVN0eWxlOiB7XG4gICAgICAgICAgJ3dpZHRoJzp0aW1lV2lkdGhcbiAgICAgICAgfSxcbiAgICAgICAgdGxjb250ZW50OiB7XG4gICAgICAgICAgJ2hlaWdodCc6XCIxMnB4XCIsXG4gICAgICAgICAgJ21hcmdpblRvcCc6JzVweCcsXG4gICAgICAgICAgJ21hcmdpbkJvdHRvbSc6JzIwcHgnXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gKFxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJ1bUtpdFwiIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxEcnVtS2l0Q29uc29sZSBjdXJyZW50YmVhdD17dGhpcy5zdGF0ZS5jdXJyZW50YmVhdH0gZWxhcHNlZHRpbWU9e3RoaXMuc3RhdGUuZWxhcHNlZHRpbWV9IGRpdmlzaW9ucGVyYmVhdD17dGhpcy5zdGF0ZS5kaXZpc2lvbnBlcmJlYXR9IGJlYXRwZXJtZWFzdXJlPXt0aGlzLnN0YXRlLmJlYXRwZXJtZWFzdXJlfSBkaXZpc2lvbm51bWJlcj17dGhpcy5zdGF0ZS5kaXZpc2lvbm51bWJlcn0gYnBtPXt0aGlzLnN0YXRlLmJwbX0gdGltZT17dGhpcy5zdGF0ZS50aW1lfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5zdHJ1bWVudEluZm9zQ29udGVudFwiIHN0eWxlPXt7J2Zsb2F0JzonbGVmdCd9fT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZXRyb25vbWVcIiBzdHlsZT17eydoZWlnaHQnOlwiMTJweFwiLCdtYXJnaW5Ub3AnOic1cHgnLCdtYXJnaW5Cb3R0b20nOicyMHB4JywgJ3dpZHRoJzonODAlJ319PlxuICAgICAgICAgICAgICAgIDxNZXRyb25vbWUgYnBtPXt0aGlzLnN0YXRlLmJwbX0gY3VycmVudGJlYXQ9e3RoaXMuc3RhdGUuY3VycmVudGJlYXR9Lz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxJbnN0cnVtZW50SW5mb3MgaW5zdHJ1bWVudHM9e3RoaXMuc3RhdGUuaW5zdHJ1bWVudHN9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3Rlc0NvbnRlbnRcIiBzdHlsZT17eydmbG9hdCc6J2xlZnQnLCdtYXhXaWR0aCc6JzEwMDBweCcsJ292ZXJmbG93WCc6J2F1dG8nLCdvdmVyZmxvd1knOidoaWRkZW4nLCdwb3NpdGlvbic6J3JlbGF0aXZlJ319PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVMaW5lQ29udGFpbmVyXCIgc3R5bGU9e3MudGltZVN0eWxlfT5cbiAgICAgICAgICAgICAgICA8VGltZUxpbmUgc29uZ1RpbWU9e3RoaXMuc3RhdGUudGltZX0gZWxhcHNlZHRpbWU9e3RoaXMuc3RhdGUuZWxhcHNlZHRpbWV9IHRpbWVXaWR0aD17dGltZVdpZHRofSBzdHlsZT17cy50bGNvbnRlbnR9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkluc3RydW1lbnRCaXRzTGlzdENvbnRhaW5lclwiIHN0eWxlPXtzLnRpbWVTdHlsZX0+XG4gICAgICAgICAgICAgICAgPEN1cnJlbnRCaXREaXNwbGF5ZXIgIHRpbWV3aWR0aD17dGltZVdpZHRofSBiZWF0d2lkdGg9e2dldEJlYXRzV2lkdGgodGhpcy5zdGF0ZS5kaXZpc2lvbm51bWJlciwgdGhpcy5zdGF0ZS5kaXZpc2lvbnBlcmJlYXQpfSBjdXJyZW50YmVhdD17dGhpcy5zdGF0ZS5jdXJyZW50YmVhdH0gYmVhdHBlcm1lYXN1cmU9e3RoaXMuc3RhdGUuYmVhdHBlcm1lYXN1cmV9IC8+XG4gICAgICAgICAgICAgICAgPEluc3RydW1lbnRCaXRzTGlzdCBtZWFzdXJlbnVtYmVyPXtnZXRNZWFzdXJlTnVtYmVyKHRoaXMuc3RhdGUuZGl2aXNpb25udW1iZXIsIHRoaXMuc3RhdGUuZGl2aXNpb25wZXJiZWF0LCB0aGlzLnN0YXRlLmJlYXRwZXJtZWFzdXJlKX0gdGltZVdpZHRoPXt0aW1lV2lkdGh9IGRpdmlzaW9uc1dpZHRoPXtnZXREaXZpc2lvbldpZHRoKHRoaXMuc3RhdGUuZGl2aXNpb25udW1iZXIpfSBiZWF0d2lkdGg9e2dldEJlYXRzV2lkdGgodGhpcy5zdGF0ZS5kaXZpc2lvbm51bWJlciwgdGhpcy5zdGF0ZS5kaXZpc2lvbnBlcmJlYXQpfSBiZWF0cGVybWVhc3VyZT17dGhpcy5zdGF0ZS5iZWF0cGVybWVhc3VyZX0gaW5zdHJ1bWVudHM9e3RoaXMuc3RhdGUuaW5zdHJ1bWVudHN9Lz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3snY2xlYXInOidib3RoJ319PjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxNdXNpY0Nob2ljZSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApXG4gICAgfSxcbiAgX29uQ2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKGdldGRydW1raXREYXRhKCkpO1xuICB9LFxuXG4gIF9vbkRpdmlzaW9uQ2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKGdldEN1cnJlbnREaXZpc2lvbigpKTtcbiAgfSxcblxuICBfb25CZWF0Q2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKEdldEN1cnJlbnRCZWF0KCkpO1xuICB9LFxuXG4gIF9PblRpbWVDaGFuZ2VkOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKEdldEN1cnJlbnRUaW1lKCkpO1xuICB9LFxuICB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEcnVtS2l0O1xuIl19