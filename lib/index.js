'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _index = require('/Users/paulmusso1/Documents/perso/vbm/react-drum-machine/node_modules/redbox-react/lib/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('/Users/paulmusso1/Documents/perso/vbm/react-drum-machine/node_modules/react-transform-catch-errors/lib/index.js');

var _index4 = _interopRequireDefault(_index3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _index5 = require('/Users/paulmusso1/Documents/perso/vbm/react-drum-machine/node_modules/react-transform-hmr/lib/index.js');

var _index6 = _interopRequireDefault(_index5);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

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

var _components = {
	App: {
		displayName: 'App'
	}
};

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	filename: 'src/index.js',
	components: _components,
	locals: [module],
	imports: [_react3.default]
});

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	filename: 'src/index.js',
	components: _components,
	locals: [],
	imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
	return function (Component) {
		return _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformHmrLibIndexJs2(_UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
	};
}

var App = _wrapComponent('App')((_temp = _class = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

		_this.store = (0, _store2.default)();

		_this.store.dispatch(actions.setDivisionSize(_this.props.divisionSize));
		_this.store.subscribe(function () {
			props.onChange(_this.store.getState());
		});
		return _this;
	}

	_createClass(App, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.onLoaded(this.getState(), this.getActions(), this.getInfoAPI());
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
			return _react3.default.createElement(
				_reactRedux.Provider,
				{ store: this.store },
				_react3.default.createElement(_Drumkit2.default, this.props)
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
}(_react3.default.Component), _class.propTypes = {
	onChange: _react3.default.PropTypes.func,
	onLoaded: _react3.default.PropTypes.func,
	divisionSize: _react3.default.PropTypes.number
}, _class.defaultProps = {
	divisionSize: 20,
	onChange: function onChange() {
		return true;
	},
	onLoaded: function onLoaded() {
		return true;
	}
}, _temp));

exports.default = App;