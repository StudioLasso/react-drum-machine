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

require('pubsub-js');

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

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.store = (0, _store2.default)();

		_this.store.dispatch(actions.setDivisionSize(_this.props.divisionSize));
		_this.store.subscribe(function () {
			props.onChange(_this.store.getState());
		});
		return _this;
	}

	_createClass(App, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.song !== this.props.song) {
				if (nextProps.song) {
					this.store.dispatch(actions.loadSong(nextProps.song));
				}
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.store.dispatch(actions.initDrumkit());

			if (this.props.song) {
				this.store.dispatch(actions.loadSong(this.props.song));
			}

			this.props.onLoaded(this.getState(), this.getActions(), this.getInfoAPI());

			var dispatchAction = function dispatchAction(m, d) {
				if (d.action && typeof actions[d.action] === 'function') {
					_this2.store.dispatch(actions[d.action](d.args));
				}
			};

			PubSub.subscribe('drum', dispatchAction);
			if (this.props.id) {
				PubSub.subscribe('' + this.props.id, dispatchAction);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			PubSub.unsubscribe('drum');
			if (this.props.id) {
				PubSub.unsubscribe('' + this.props.id);
			}
		}
	}, {
		key: 'getInfoAPI',
		value: function getInfoAPI() {
			return {
				getElapsedTime: this.getElapsedTime.bind(this),
				getCurrentBeat: this.getCurrentBeat.bind(this),
				getCurrentDivision: this.getCurrentDivision.bind(this),
				elapsedTimeToSize: this.elapsedTimeToSize.bind(this),
				sizeToTime: this.sizeToTime.bind(this),
				getSongSize: this.getSongSize.bind(this)
			};
		}
	}, {
		key: 'getActions',
		value: function getActions() {
			return (0, _redux.bindActionCreators)(actions, this.store.dispatch);
		}
	}, {
		key: 'getState',
		value: function getState() {
			return this.store.getState();
		}
	}, {
		key: 'subscribe',
		value: function subscribe(cb) {
			return this.store.subscribe(cb);
		}
	}, {
		key: 'getElapsedTime',
		value: function getElapsedTime() {
			return time.getElapsedTime(this.store.getState().player, (0, _services.getWebAudioTime)());
		}
	}, {
		key: 'getCurrentBeat',
		value: function getCurrentBeat() {
			var state = this.store.getState();
			return time.getCurrentBeat(state.player, state.song, (0, _services.getWebAudioTime)());
		}
	}, {
		key: 'getCurrentDivision',
		value: function getCurrentDivision() {
			var state = this.store.getState();
			return time.getCurrentDivision(state.player, state.song, (0, _services.getWebAudioTime)());
		}
	}, {
		key: 'elapsedTimeToSize',
		value: function elapsedTimeToSize() {
			var elapsedTime = time.getElapsedTime(this.store.getState().player, (0, _services.getWebAudioTime)());
			var state = this.store.getState();
			return time.timeToSize(elapsedTime, state.player, state.song);
		}
	}, {
		key: 'sizeToTime',
		value: function sizeToTime(size) {
			var state = this.store.getState();
			return time.sizeToTime(size, state.player, state.song);
		}
	}, {
		key: 'getSongSize',
		value: function getSongSize() {
			var state = this.store.getState();
			return time.getSongSize(state.player, state.song);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_reactRedux.Provider,
				{ store: this.store },
				_react2.default.createElement(_Drumkit2.default, this.props)
			);
		}
	}], [{
		key: 'getInitialState',
		value: function getInitialState() {
			return (0, _store2.default)().getState();
		}
	}, {
		key: 'getInitialActions',
		value: function getInitialActions() {
			return actions;
		}
	}]);

	return App;
}(_react2.default.Component);

App.propTypes = {
	onChange: _react2.default.PropTypes.func,
	onLoaded: _react2.default.PropTypes.func,
	divisionSize: _react2.default.PropTypes.number,
	song: _react2.default.PropTypes.object,
	id: _react2.default.PropTypes.string
};
App.defaultProps = {
	onChange: function onChange() {
		return true;
	},
	onLoaded: function onLoaded() {
		return true;
	},
	divisionSize: 20,
	song: null,
	id: null
};
exports.default = App;
module.exports = exports['default'];