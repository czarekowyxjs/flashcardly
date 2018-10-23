import axios from 'axios';

export const fetchFlashcardToGame = (flashcardID) => {
	return async dispatch => {
		const token = localStorage.getItem("token");
		dispatch(fetchFlashcardToGameLoaded(false));
		try {
			const response = await axios.get("/api/v1/flashcards/"+flashcardID, {
				headers: {
					authorization: token
				}
			});

			for(let i = 0;i < response.data.flashcard.Words.length;++i) {
				response.data.flashcard.Words[i].editable = false;
			}

			dispatch({
				type: "FETCH_FLASHCARD_DATA",
				payload: {
					flashcardData: response.data.flashcard,
					authorData: response.data.author
				}
			});
			dispatch({
				type: "SET_GAMEABLE",
				payload: true
			});
			dispatch(fetchFlashcardToGameLoaded(true));
		} catch(e) {	
			console.log(e.response);
		}
	};	
};

export const fetchFlashcardToGameLoaded = payload => {
	return {
		type: "FETCH_FLASHCARD_GAME_LOADED",
		payload: payload
	};
};