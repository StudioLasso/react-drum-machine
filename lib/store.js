'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _sagas = require('./sagas');

var _sagas2 = _interopRequireDefault(_sagas);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
	var logger = (0, _reduxLogger2.default)();
	var sagaMiddleware = (0, _reduxSaga2.default)();

	var createStoreWithMiddleware = void 0;

	if ('production' === 'development') {
		createStoreWithMiddleware = (0, _redux.compose)((0, _redux.applyMiddleware)(logger, sagaMiddleware), window.devToolsExtension ? window.devToolsExtension() : function (f) {
			return f;
		})(_redux.createStore);
	} else {
		createStoreWithMiddleware = (0, _redux.compose)((0, _redux.applyMiddleware)(sagaMiddleware))(_redux.createStore);
	}

	var store = createStoreWithMiddleware(_reducers2.default);

	sagaMiddleware.run(_sagas2.default);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducers', function () {
			var nextRootReducer = require('./reducers/index');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
};

module.exports = exports['default'];