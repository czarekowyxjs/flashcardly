const initialState = {
	fetchFlashcardGameLoaded: false,
	gameable: false
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "FETCH_FLASHCARD_GAME_LOADED":
			return {
				...state,
				fetchFlashcardGameLoaded: action.payload
			};
		case "SET_GAMEABLE":
			return {
				...state,
				gameable: action.payload
			};
		default:
			return state;
	}
};