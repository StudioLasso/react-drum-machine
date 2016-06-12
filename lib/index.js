'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

require('babel-polyfill');

var _Drumkit = require('./components/Drumkit');

var _Drumkit2 = _interopRequireDefault(_Drumkit);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _time = require('./utils/time');

var time = _interopRequireWildcard(_time);

var _services = require('./services');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App() {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_reactRedux.Provider,
				{ store: _store2.default },
				_react2.default.createElement(_Drumkit2.default, this.props)
			);
		}
	}], [{
		key: 'getActions',
		value: function getActions() {
			return (0, _redux.bindActionCreators)(actions, _store2.default.dispatch);
		}
	}, {
		key: 'getState',
		value: function getState() {
			return _store2.default.getState();
		}
	}, {
		key: 'subscribe',
		value: function subscribe(cb) {
			return _store2.default.subscribe(cb);
		}
	}, {
		key: 'getElapsedTime',
		value: function getElapsedTime() {
			return time.getElapsedTime(_store2.default.getState().player, (0, _services.getWebAudioTime)());
		}
	}, {
		key: 'getCurrentBeat',
		value: function getCurrentBeat() {
			var state = _store2.default.getState();
			return time.getCurrentBeat(state.player, state.song, (0, _services.getWebAudioTime)());
		}
	}, {
		key: 'getCurrentDivision',
		value: function getCurrentDivision() {
			var state = _store2.default.getState();
			return time.getCurrentDivision(state.player, state.song, (0, _services.getWebAudioTime)());
		}
	}, {
		key: 'elapsedTimeToSize',
		value: function elapsedTimeToSize() {
			var elapsedTime = time.getElapsedTime(_store2.default.getState().player, (0, _services.getWebAudioTime)());
			var state = _store2.default.getState();
			return time.timeToSize(elapsedTime, state.player.width, state.song.time);
		}
	}, {
		key: 'sizeToTime',
		value: function sizeToTime(size) {
			var state = _store2.default.getState();
			return time.sizeToTime(size, state.player.width, state.song.time);
		}
	}]);

	return App;
}(_react2.default.Component);

exports.default = App;