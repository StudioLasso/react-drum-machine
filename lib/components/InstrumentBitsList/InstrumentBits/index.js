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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
	InstrumentBits: {
		displayName: 'InstrumentBits'
	}
};

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	filename: 'src/components/InstrumentBitsList/InstrumentBits/index.js',
	components: _components,
	locals: [module],
	imports: [_react3.default]
});

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	filename: 'src/components/InstrumentBitsList/InstrumentBits/index.js',
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
	bitOn: {
		border: '1px solid #CCC',
		width: '80%',
		height: '80%',
		margin: 'auto',
		background: 'silver'
	},

	bitOff: {
		width: '50%',
		height: '80%',
		margin: 'auto'
	},

	bits: {
		height: '24px',
		display: 'table'
	},

	content: {
		display: 'table-cell',
		verticalAlign: 'middle'
	},

	bitContent: {
		float: 'left',
		borderRight: '1px solid #CCC',
		height: '100%'
	}
};

var InstrumentBits = _wrapComponent('InstrumentBits')(function (_Component) {
	_inherits(InstrumentBits, _Component);

	function InstrumentBits() {
		_classCallCheck(this, InstrumentBits);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(InstrumentBits).apply(this, arguments));
	}

	_createClass(InstrumentBits, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return this.props.beats != nextProps.beats;
		}
	}, {
		key: 'bitClicked',
		value: function bitClicked(bitIndex, e) {
			this.props.changeBit({
				instrumentIndex: this.props.instrumentIndex,
				bitIndex: bitIndex
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			s.bits = _extends({}, s.bits, {
				width: this.props.timeWidth
			});
			s.bitContent = _extends({}, s.bitContent, {
				width: this.props.divisionSize
			});

			var bits = this.props.beats.map(function (bit, i) {
				return _react3.default.createElement(
					'div',
					{
						style: s.bitContent,
						key: i,
						onClick: _this2.bitClicked.bind(_this2, i) },
					_react3.default.createElement('div', { style: bit ? s.bitOn : s.bitOff })
				);
			}.bind(this));

			return _react3.default.createElement(
				'div',
				{
					style: s.bits,
					'data-style': this.props.instindex },
				_react3.default.createElement(
					'div',
					{ style: s.content },
					bits
				)
			);
		}
	}]);

	return InstrumentBits;
}(_react2.Component));

exports.default = InstrumentBits;