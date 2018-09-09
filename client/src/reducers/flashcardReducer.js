const initialState = {
	createFlashcardLoaded: false,
	fetchFlashcardLoaded: false,
	addWordLoaded: true,
	addWordError: {},
	flashcardData: {},
	authorData: {}
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "RETURN_FLASHCARD_TO_INITIAL":
			return initialState;
		case "CREATE_FLASHCARD_LOADED":
			return {
				...state,
				createFlashcardLoaded: action.payload
			};
		case "FETCH_FLASHCARD_LOADED":
			return {
				...state,
				fetchFlashcardLoaded: action.payload,
				addWordError: {}
			};
		case "FETCH_FLASHCARD_DATA":
			return {
				...state,
				flashcardData: action.payload.flashcardData,
				authorData: action.payload.authorData
			};
		case "ADD_WORD_LOADED":
			return {
				...state,
				addWordLoaded: action.payload,
				addWordError: {}
			};
		case "ADD_WORD_ERROR":
			return {
				...state,
				addWordError: action.payload
			};
		case "LAND_UP_WORDS":
			return {
				...state,
				flashcardData: action.payload
			};
		default:
			return state;
	}
};