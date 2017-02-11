'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _CurrentBit = require('./CurrentBit');

var _CurrentBit2 = _interopRequireDefault(_CurrentBit);

var _actions = require('../../actions');

var actions = _interopRequireWildcard(_actions);

var _services = require('../../services');

var _time = require('../../utils/time');

var time = _interopRequireWildcard(_time);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CurrentBitContainer = function (_Component) {
	_inherits(CurrentBitContainer, _Component);

	function CurrentBitContainer(props) {
		_classCallCheck(this, CurrentBitContainer);

		var _this = _possibleConstructorReturn(this, (CurrentBitContainer.__proto__ || Object.getPrototypeOf(CurrentBitContainer)).call(this, props));

		_this.state = {
			currentBeat: 0
		};
		return _this;
	}

	_createClass(CurrentBitContainer, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			var refresh = function refresh() {
				var webAudioTime = (0, _services.getWebAudioTime)();
				_this2.setState({
					currentBeat: time.getCurrentBeat(_this2.props.player, _this2.props.song, webAudioTime)
				});
				_this2.nextRefresh = setTimeout(function () {
					return requestAnimationFrame(refresh);
				}, 100);
			};

			requestAnimationFrame(refresh);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.nextRefresh) {
				clearTimeout(this.nextRefresh);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_CurrentBit2.default, {
				song: this.props.song,
				beatSize: this.props.beatSize,
				songSize: this.props.songSize,
				currentBeat: this.state.currentBeat,
				beatPerMeasure: this.props.beatPerMeasure });
		}
	}]);

	return CurrentBitContainer;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (state, props) {
	return {
		beatSize: state.player.divisionSize * state.song.divisionperbeat,
		songSize: time.getSongSize(state.player, state.song),
		divisionPerBeat: state.song.divisionperbeat,
		divisionNumber: state.song.divisionnumber,
		beatPerMeasure: state.song.beatpermeasure,
		player: state.player,
		song: state.song
	};
}, function (dispatch) {
	return {
		actions: (0, _redux.bindActionCreators)(actions, dispatch)
	};
})(CurrentBitContainer);
module.exports = exports['default'];