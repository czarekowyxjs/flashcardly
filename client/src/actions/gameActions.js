import axios from 'axios';

export const fetchFlashcardPrimary = (flashcardID) => {
	return async dispatch => {
		dispatch(fetchFlashcardPrimaryStatus(true, false));
		const token = localStorage.getItem("token");
		try {

			const response = await axios.get(`/api/v1/flashcards/primary/${flashcardID}`, {
				headers: {
					authorization: token
				}
			});

			if(response.status === 200) {
				dispatch({
					type: "FETCH_FLASHCARD_PRIMARY",
					payload: response.data.flashcard
				});
			}

		} catch(e) {
			console.log(e.response);
		} finally {
			dispatch(fetchFlashcardPrimaryStatus(false, true));
		}
	} 
}

export const fetchFlashcardPrimaryStatus = (processing, loaded) => {
	return {
		type: "FLASHCARD_PRIMARY_STATUS",
		payload: {
			processing,
			loaded
		}
	};
};