import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import sagas from 'sagas';
import reducers from 'reducers';

const logger = createLogger();

export default createStore(
	reducers,
	compose(
		applyMiddleware(
			logger,
			createSagaMiddleware(sagas)
		),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);