import { combineReducers } from 'redux';
import userReducer from './userReducer';
import flashcardReducer from './flashcardReducer';


export default combineReducers({
		user: userReducer,
		flashcard: flashcardReducer
});