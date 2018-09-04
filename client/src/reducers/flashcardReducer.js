const initialState = {
	createFlashcardLoaded: false,
	fetchFlashcardLoaded: false,
	flashcardData: {}
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "CREATE_FLASHCARD_LOADED":
			return {
				...state,
				createFlashcardLoaded: action.payload
			};
		case "FETCH_FLASHCARD_LOADED":
			return {
				...state,
				fetchFlashcardLoaded: action.payload
			};
		case "FETCH_FLASHCARD_DATA":
			return {
				...state,
				flashcardData: action.payload
			};
		default:
			return state;
	}
};