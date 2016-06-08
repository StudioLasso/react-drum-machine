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

var _AddInstrument = require('./AddInstrument');

var _AddInstrument2 = _interopRequireDefault(_AddInstrument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
	InstrumentInfos: {
		displayName: 'InstrumentInfos'
	}
};

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	filename: 'src/components/InstrumentInfos/InstrumentInfos.js',
	components: _components,
	locals: [module],
	imports: [_react3.default]
});

var _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	filename: 'src/components/InstrumentInfos/InstrumentInfos.js',
	components: _components,
	locals: [],
	imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
	return function (Component) {
		return _UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformHmrLibIndexJs2(_UsersPaulmusso1DocumentsPersoVbmReactDrumMachineNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
	};
}

var InstrumentInfos = _wrapComponent('InstrumentInfos')(function (_Component) {
	_inherits(InstrumentInfos, _Component);

	function InstrumentInfos(props) {
		_classCallCheck(this, InstrumentInfos);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InstrumentInfos).call(this, props));

		_this.state = {
			addInstrumentOpen: false
		};
		return _this;
	}

	_createClass(InstrumentInfos, [{
		key: 'openModal',
		value: function openModal() {
			this.setState({
				addInstrumentOpen: true
			});
		}
	}, {
		key: 'closeModal',
		value: function closeModal() {
			this.setState({
				addInstrumentOpen: false
			});
		}
	}, {
		key: 'onAdd',
		value: function onAdd(name, imgUrl, soundUrl) {
			this.props.actions.addInstrument({
				name: name,
				imgUrl: imgUrl,
				soundUrl: soundUrl
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var instruments = this.props.instruments.map(function (instrument, i) {
				return _react3.default.createElement(
					'div',
					{ className: 'instrumentName', key: i, style: { width: '64px', height: '24px', 'outline': '1px solid' } },
					_react3.default.createElement('img', { src: instrument.imgurl, alt: instrument.name, height: '24', width: '24' })
				);
			});

			return _react3.default.createElement(
				'div',
				{ className: 'instrumentInfosList' },
				instruments,
				_react3.default.createElement(
					'button',
					{
						onClick: this.openModal.bind(this),
						type: 'button',
						className: 'btn btn-default btn-sm' },
					'Add'
				),
				_react3.default.createElement(_AddInstrument2.default, {
					open: this.state.addInstrumentOpen,
					onClose: this.closeModal.bind(this),
					onAdd: this.onAdd.bind(this) })
			);
		}
	}]);

	return InstrumentInfos;
}(_react2.Component));

exports.default = InstrumentInfos;