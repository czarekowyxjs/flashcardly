import { combineReducers } from 'redux';
import userReducer from './userReducer';
import flashcardReducer from './flashcardReducer';
import gameReducer from "./gameReducer";
import settingsReducer from './settingsReducer';
import searchReducer from './searchReducer';

export default combineReducers({
		user: userReducer,
		flashcard: flashcardReducer,
		game: gameReducer,
		settings: settingsReducer,
		search: searchReducer
});