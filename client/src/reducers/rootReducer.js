import { combineReducers } from 'redux';
import userReducer from './userReducer';
import flashcardReducer from './flashcardReducer';
import gameReducer from "./gameReducer";


export default combineReducers({
		user: userReducer,
		flashcard: flashcardReducer,
		game: gameReducer
});