'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var s = {
	content: {
		padding: '2em'
	}
};

var modalStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		padding: 0,
		width: '50%'
	}
};

var AddInstrument = function (_Component) {
	_inherits(AddInstrument, _Component);

	function AddInstrument() {
		_classCallCheck(this, AddInstrument);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(AddInstrument).apply(this, arguments));
	}

	_createClass(AddInstrument, [{
		key: 'onSubmit',
		value: function onSubmit(e) {
			this.props.onAdd(this.refs.name.value, this.refs.img.value, this.refs.sound.value);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				_reactModal2.default,
				{
					isOpen: this.props.open,
					style: modalStyles },
				_react2.default.createElement(
					'div',
					{ className: 'modal-header' },
					_react2.default.createElement(
						'button',
						{
							type: 'button',
							className: 'close',
							'data-dismiss': 'modal',
							'aria-label': 'Close',
							onClick: this.props.onClose },
						_react2.default.createElement(
							'span',
							{ 'aria-hidden': 'true' },
							'×'
						)
					),
					_react2.default.createElement(
						'h1',
						null,
						'Add an instrument'
					)
				),
				_react2.default.createElement(
					'div',
					{ style: s.content },
					_react2.default.createElement(
						'form',
						{ onSubmit: this.onSubmit.bind(this), className: 'form-horizontal' },
						_react2.default.createElement(
							'div',
							{ className: 'form-group' },
							_react2.default.createElement(
								'label',
								{ 'for': 'inputName', className: 'col-sm-2 control-label' },
								'name'
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-sm-10' },
								_react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'inputName', ref: 'name', placeholder: 'name' })
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'form-group' },
							_react2.default.createElement(
								'label',
								{ 'for': 'inputImg', className: 'col-sm-2 control-label' },
								'image url'
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-sm-10' },
								_react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'inputImg', ref: 'img', placeholder: 'image url' })
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'form-group' },
							_react2.default.createElement(
								'label',
								{ 'for': 'inputSound', className: 'col-sm-2 control-label' },
								'sound url'
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-sm-10' },
								_react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'inputSound', ref: 'sound', placeholder: 'sound url' })
							)
						),
						_react2.default.createElement('button', { type: 'submit', className: 'hidden' })
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'modal-footer' },
					_react2.default.createElement(
						'button',
						{ type: 'submit', className: 'btn btn-default', onClick: this.onSubmit.bind(this) },
						'Add'
					)
				)
			);
		}
	}]);

	return AddInstrument;
}(_react.Component);

exports.default = AddInstrument;