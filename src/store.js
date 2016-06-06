import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas';
import reducers from './reducers';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

let createStoreWithMiddleware;

if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
	createStoreWithMiddleware = compose(
		applyMiddleware(
			logger,
			sagaMiddleware),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)(createStore);
} else {
	createStoreWithMiddleware = compose(
		applyMiddleware(
			sagaMiddleware),
	)(createStore);
}

const store = createStoreWithMiddleware(reducers);

sagaMiddleware.run(sagas);

if (module.hot) {
	// Enable Webpack hot module replacement for reducers
	module.hot.accept('./reducers', () => {
		const nextRootReducer = require('./reducers/index');
		store.replaceReducer(nextRootReducer);
	});
}

export default store;