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

var _actions = require('../../actions');

var actions = _interopRequireWildcard(_actions);

var _InstrumentBitsList = require('../InstrumentBitsList');

var _InstrumentBitsList2 = _interopRequireDefault(_InstrumentBitsList);

var _InstrumentInfos = require('../InstrumentInfos');

var _InstrumentInfos2 = _interopRequireDefault(_InstrumentInfos);

var _CurrentBit = require('../CurrentBit');

var _CurrentBit2 = _interopRequireDefault(_CurrentBit);

var _AutoScroll = require('../AutoScroll');

var _AutoScroll2 = _interopRequireDefault(_AutoScroll);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
	DrumKit: {
		displayName: 'DrumKit'
	}
};

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	filename: 'src/components/Drumkit/index.js',
	components: _components,
	locals: [module],
	imports: [_react3.default]
});

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	filename: 'src/components/Drumkit/index.js',
	components: _components,
	locals: [],
	imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
	return function (Component) {
		return _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformHmrLibIndexJs2(_UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
	};
}

var s = {
	container: {
		display: 'flex',
		position: 'relative'
	},
	instruments: {
		width: '1000px',
		overflowX: 'hidden',
		overflowY: 'hidden',
		position: 'relative'
	}
};

var timeWidth = 6200;

var DrumKit = _wrapComponent('DrumKit')(function (_React$Component) {
	_inherits(DrumKit, _React$Component);

	function DrumKit() {
		_classCallCheck(this, DrumKit);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(DrumKit).apply(this, arguments));
	}

	_createClass(DrumKit, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.dispatch(actions.initDrumkit({ id: 0 }));
		}
	}, {
		key: 'render',
		value: function render() {
			var timeStyle = {
				width: timeWidth
			};

			return _react3.default.createElement(
				'div',
				{ style: s.container },
				_react3.default.createElement(_InstrumentInfos2.default, null),
				_react3.default.createElement(
					'div',
					{ style: s.instruments, id: 'rightPanel' },
					_react3.default.createElement(_AutoScroll2.default, null),
					_react3.default.createElement(
						'div',
						{ style: timeStyle },
						_react3.default.createElement(_CurrentBit2.default, { timeWidth: timeWidth }),
						_react3.default.createElement(_InstrumentBitsList2.default, { timeWidth: timeWidth })
					)
				)
			);
		}
	}], [{
		key: 'getBitsOffset',
		value: function getBitsOffset() {
			var el = document.getElementById('rightPanel');
			return el && el.offsetLeft;
		}
	}]);

	return DrumKit;
}(_react3.default.Component));

exports.default = (0, _reactRedux.connect)()(DrumKit);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0RydW1raXQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBRUE7O0lBQVksTzs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sSUFBSTtBQUNULFlBQVc7QUFDVixXQUFTLE1BREM7QUFFVixZQUFVO0FBRkEsRUFERjtBQUtULGNBQWE7QUFDWixTQUFPLFFBREs7QUFFWixhQUFXLFFBRkM7QUFHWixhQUFXLFFBSEM7QUFJWixZQUFVO0FBSkU7QUFMSixDQUFWOztBQWFBLElBQU0sWUFBWSxJQUFsQjs7Ozs7Ozs7Ozs7OztzQ0FHcUI7QUFDbkIsUUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixRQUFRLFdBQVIsQ0FBb0IsRUFBQyxJQUFJLENBQUwsRUFBcEIsQ0FBcEI7QUFDQTs7OzJCQU9RO0FBQ1IsT0FBTSxZQUFZO0FBQ2pCLFdBQU87QUFEVSxJQUFsQjs7QUFJQSxVQUNDO0FBQUE7SUFBQSxFQUFLLE9BQU8sRUFBRSxTQUFkO0lBQ0MsOERBREQ7SUFFQztBQUFBO0tBQUEsRUFBSyxPQUFPLEVBQUUsV0FBZCxFQUEyQixJQUFHLFlBQTlCO0tBQ0MseURBREQ7S0FFQztBQUFBO01BQUEsRUFBSyxPQUFPLFNBQVo7TUFDQyxzREFBWSxXQUFXLFNBQXZCLEdBREQ7TUFFQyw4REFBb0IsV0FBVyxTQUEvQjtBQUZEO0FBRkQ7QUFGRCxJQUREO0FBWUE7OztrQ0F0QnNCO0FBQ3RCLE9BQU0sS0FBSyxTQUFTLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBWDtBQUNBLFVBQU8sTUFBTSxHQUFHLFVBQWhCO0FBQ0E7Ozs7RUFSb0IsZ0JBQU0sUzs7a0JBOEJiLDJCQUFVLE9BQVYsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgKiBhcyBhY3Rpb25zIGZyb20gJy4uLy4uL2FjdGlvbnMnO1xuaW1wb3J0IEluc3RydW1lbnRCaXRzTGlzdCBmcm9tICcuLi9JbnN0cnVtZW50Qml0c0xpc3QnO1xuaW1wb3J0IEluc3RydW1lbnRJbmZvcyBmcm9tICcuLi9JbnN0cnVtZW50SW5mb3MnO1xuaW1wb3J0IEN1cnJlbnRCaXQgZnJvbSAnLi4vQ3VycmVudEJpdCc7XG5pbXBvcnQgQXV0b1Njcm9sbCBmcm9tICcuLi9BdXRvU2Nyb2xsJztcblxuY29uc3QgcyA9IHtcblx0Y29udGFpbmVyOiB7XG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnXG5cdH0sXG5cdGluc3RydW1lbnRzOiB7XG5cdFx0d2lkdGg6ICcxMDAwcHgnLFxuXHRcdG92ZXJmbG93WDogJ2hpZGRlbicsXG5cdFx0b3ZlcmZsb3dZOiAnaGlkZGVuJyxcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHR9XHRcbn07XG5cbmNvbnN0IHRpbWVXaWR0aCA9IDYyMDA7XG5cbmNsYXNzIERydW1LaXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHR0aGlzLnByb3BzLmRpc3BhdGNoKGFjdGlvbnMuaW5pdERydW1raXQoe2lkOiAwfSkpO1xuXHR9XG5cblx0c3RhdGljIGdldEJpdHNPZmZzZXQoKSB7XG5cdFx0Y29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlnaHRQYW5lbCcpO1xuXHRcdHJldHVybiBlbCAmJiBlbC5vZmZzZXRMZWZ0O1xuXHR9ICBcblxuXHRyZW5kZXIoKSB7XG5cdFx0Y29uc3QgdGltZVN0eWxlID0ge1xuXHRcdFx0d2lkdGg6IHRpbWVXaWR0aFxuXHRcdH07XG4gXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgc3R5bGU9e3MuY29udGFpbmVyfT5cblx0XHRcdFx0PEluc3RydW1lbnRJbmZvcyAvPlxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXtzLmluc3RydW1lbnRzfSBpZD0ncmlnaHRQYW5lbCc+XG5cdFx0XHRcdFx0PEF1dG9TY3JvbGwgLz5cblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt0aW1lU3R5bGV9PlxuXHRcdFx0XHRcdFx0PEN1cnJlbnRCaXQgdGltZVdpZHRoPXt0aW1lV2lkdGh9IC8+XG5cdFx0XHRcdFx0XHQ8SW5zdHJ1bWVudEJpdHNMaXN0IHRpbWVXaWR0aD17dGltZVdpZHRofSAvPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCgpKERydW1LaXQpOyJdfQ==