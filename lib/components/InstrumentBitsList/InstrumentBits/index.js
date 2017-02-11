'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var s = {
	bit: {
		height: '100%',
		margin: '1px',
		boxSizing: 'border-box'
	},

	bitOn: {
		border: '1px solid #CCC',
		background: 'silver'
	},

	bitOff: {},

	bits: {
		height: '18px'
	},

	content: {
		display: 'inline-block',
		height: '100%'
	},

	bitContent: {
		float: 'left',
		borderRight: '1px solid #CCC',
		height: '100%',
		boxSizing: 'border-box',
		padding: '1px'
	}
};

s.bitOn = _extends({}, s.bit, s.bitOn);
s.bitOff = _extends({}, s.bit, s.bitOff);

var InstrumentBits = function (_Component) {
	_inherits(InstrumentBits, _Component);

	function InstrumentBits() {
		_classCallCheck(this, InstrumentBits);

		return _possibleConstructorReturn(this, (InstrumentBits.__proto__ || Object.getPrototypeOf(InstrumentBits)).apply(this, arguments));
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
				width: this.props.songSize
			});
			s.bitContent = _extends({}, s.bitContent, {
				width: this.props.divisionSize
			});

			var bits = this.props.beats.map(function (bit, i) {
				return _react2.default.createElement(
					'div',
					{
						style: s.bitContent,
						key: i,
						onClick: _this2.bitClicked.bind(_this2, i) },
					_react2.default.createElement('div', { style: bit ? s.bitOn : s.bitOff })
				);
			}.bind(this));

			return _react2.default.createElement(
				'div',
				{
					style: s.bits,
					'data-style': this.props.instindex },
				_react2.default.createElement(
					'div',
					{ style: s.content },
					bits
				)
			);
		}
	}]);

	return InstrumentBits;
}(_react.Component);

exports.default = InstrumentBits;
module.exports = exports['default'];