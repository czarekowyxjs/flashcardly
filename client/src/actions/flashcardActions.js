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
			const response = await axios.post("/api/v1/flashcard/create", flashcard, {
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
