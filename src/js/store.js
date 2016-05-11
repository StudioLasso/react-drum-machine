import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import sagas from 'sagas';
import reducers from 'reducers';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	reducers,
	compose(
		applyMiddleware(
			logger,
			sagaMiddleware
		),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

sagaMiddleware.run(sagas);

export default store;