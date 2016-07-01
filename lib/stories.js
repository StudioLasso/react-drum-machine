'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybook = require('@kadira/storybook');

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _storybook.storiesOf)('Drumkit', module).add('divisionSize set to default (20px)', function () {
	return _react2.default.createElement(_2.default, null);
}).add('divisionSize set to 4px', function () {
	return _react2.default.createElement(_2.default, { divisionSize: 4 });
}).add('divisionSize set to 40px', function () {
	return _react2.default.createElement(_2.default, { divisionSize: 40 });
});