import { combineReducers } from 'redux';

import song from './song';
import player from './player';

export default combineReducers({
	song,
	player
});