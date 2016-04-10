import React from 'react';
import { Provider } from 'react-redux';

import Drumkit from 'components/DrumKit';
import store from './store';

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Drumkit {...this.props} />
			</Provider>
		);
	}
}