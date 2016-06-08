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

var _reactRedux = require('react-redux');

var _time = require('../../utils/time');

var time = _interopRequireWildcard(_time);

var _services = require('../../services');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
	AutoScroll: {
		displayName: 'AutoScroll'
	}
};

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	filename: 'src/components/AutoScroll/index.js',
	components: _components,
	locals: [module],
	imports: [_react3.default]
});

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	filename: 'src/components/AutoScroll/index.js',
	components: _components,
	locals: [],
	imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
	return function (Component) {
		return _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformHmrLibIndexJs2(_UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
	};
}

var AutoScroll = _wrapComponent('AutoScroll')(function (_React$Component) {
	_inherits(AutoScroll, _React$Component);

	function AutoScroll() {
		_classCallCheck(this, AutoScroll);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(AutoScroll).apply(this, arguments));
	}

	_createClass(AutoScroll, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			var el = document.getElementById('rightPanel');
			var width = el.getBoundingClientRect().width;
			var refresh = function refresh() {
				var elapsedTime = time.getElapsedTime(_this2.props.player, (0, _services.getWebAudioTime)());
				var size = time.timeToSize(elapsedTime, _this2.props.player.width, _this2.props.song.time);
				el.scrollLeft = size > width / 2 ? size - width / 2 : 0;

				setTimeout(function () {
					return window.requestAnimationFrame(refresh);
				}, 20);
			};
			window.requestAnimationFrame(refresh);
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return AutoScroll;
}(_react3.default.Component));

exports.default = (0, _reactRedux.connect)(function (state) {
	return {
		player: state.player,
		song: state.song
	};
})(AutoScroll);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0F1dG9TY3JvbGwvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBRUE7O0lBQVksSTs7QUFDWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FHcUI7QUFBQTs7QUFDbkIsT0FBTSxLQUFLLFNBQVMsY0FBVCxDQUF3QixZQUF4QixDQUFYO0FBQ0EsT0FBTSxRQUFRLEdBQUcscUJBQUgsR0FBMkIsS0FBekM7QUFDQSxPQUFNLFVBQVUsU0FBVixPQUFVLEdBQU07QUFDckIsUUFBTSxjQUFjLEtBQUssY0FBTCxDQUFvQixPQUFLLEtBQUwsQ0FBVyxNQUEvQixFQUF1QyxnQ0FBdkMsQ0FBcEI7QUFDQSxRQUFNLE9BQU8sS0FBSyxVQUFMLENBQWdCLFdBQWhCLEVBQTZCLE9BQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsS0FBL0MsRUFBc0QsT0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUF0RSxDQUFiO0FBQ0EsT0FBRyxVQUFILEdBQWdCLE9BQU8sUUFBUSxDQUFmLEdBQW1CLE9BQU8sUUFBUSxDQUFsQyxHQUFzQyxDQUF0RDs7QUFFQSxlQUFXO0FBQUEsWUFBTSxPQUFPLHFCQUFQLENBQTZCLE9BQTdCLENBQU47QUFBQSxLQUFYLEVBQXdELEVBQXhEO0FBQ0EsSUFORDtBQU9BLFVBQU8scUJBQVAsQ0FBNkIsT0FBN0I7QUFDQTs7OzJCQUNRO0FBQ1IsVUFBTyxJQUFQO0FBQ0E7Ozs7RUFmdUIsZ0JBQU0sUzs7a0JBa0JoQix5QkFBUTtBQUFBLFFBQVU7QUFDaEMsVUFBUSxNQUFNLE1BRGtCO0FBRWhDLFFBQU0sTUFBTTtBQUZvQixFQUFWO0FBQUEsQ0FBUixFQUdYLFVBSFcsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge8KgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0ICogYXMgdGltZSBmcm9tICcuLi8uLi91dGlscy90aW1lJztcbmltcG9ydCB7IGdldFdlYkF1ZGlvVGltZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzJztcblxuY2xhc3MgQXV0b1Njcm9sbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpZ2h0UGFuZWwnKTtcblx0XHRjb25zdCB3aWR0aCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuXHRcdGNvbnN0IHJlZnJlc2ggPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBlbGFwc2VkVGltZSA9IHRpbWUuZ2V0RWxhcHNlZFRpbWUodGhpcy5wcm9wcy5wbGF5ZXIsIGdldFdlYkF1ZGlvVGltZSgpKTtcblx0XHRcdGNvbnN0IHNpemUgPSB0aW1lLnRpbWVUb1NpemUoZWxhcHNlZFRpbWUsIHRoaXMucHJvcHMucGxheWVyLndpZHRoLCB0aGlzLnByb3BzLnNvbmcudGltZSk7XG5cdFx0XHRlbC5zY3JvbGxMZWZ0ID0gc2l6ZSA+IHdpZHRoIC8gMiA/IHNpemUgLSB3aWR0aCAvIDIgOiAwO1xuXHRcdFx0XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVmcmVzaCksIDIwKTtcblx0XHR9O1xuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVmcmVzaCk7XG5cdH1cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3Qoc3RhdGUgPT4gKHtcblx0cGxheWVyOiBzdGF0ZS5wbGF5ZXIsXG5cdHNvbmc6IHN0YXRlLnNvbmdcdFxufSkpKEF1dG9TY3JvbGwpOyJdfQ==