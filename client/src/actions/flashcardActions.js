import axios from 'axios';
import store from "../store";

/**
	FLASHCARD CREATOR
*/
export const createNewFlashcard = (flashcard) => {
	return async dispatch => {
		const userState = store.getState().user;
		dispatch(setCreateFlashcardLoaded(false));
		try {
			const response = await axios.post("/api/v1/flashcards/create", flashcard, {
				headers: {
					authorization: userState.userData.social.facebook.signedRequest
				}
			});

			dispatch({
				type: "FETCH_FLASHCARD_DATA",
				payload: response.data.flashcard
			});
			dispatch(setCreateFlashcardLoaded(true));
		} catch(e) {
			console.log(e.response);
		}
	};
};

export const setCreateFlashcardLoaded = (payload) => {
	return {
		type: "CREATE_FLASHCARD_LOADED",
		payload: payload
	};
};
/** 
	FLASHCARD SETTINGS
*/
export const fetchFlashcardSet = (flashcardID) => {
	return async dispatch => {
		const userState = store.getState().user;
		dispatch(setFetchFlashcardLoaded(false));
		try {
			const response = await axios.get("/api/v1/flashcards/"+flashcardID, {
				headers: {
					authorization: userState.userData.social.facebook.signedRequest
				}
			});
			dispatch({
				type: "FETCH_FLASHCARD_DATA",
				payload: response.data.flashcard
			});
			console.log(response);
			dispatch(setFetchFlashcardLoaded(true));
		} catch(e) {	
			console.log(e.response);
		}
	};	
};

export const setFetchFlashcardLoaded = (payload) => {
	return {
		type: "FETCH_FLASHCARD_LOADED",
		payload: payload
	};
};