const initialState = {
	primaryFlashcardData: {
		processing: false,
		loaded: false
	},
	primaryFlashcardLoadedData: {},
	fetchFlashcardGameLoaded: false
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "FLASHCARD_PRIMARY_STATUS":
			return {
				...state,
				primaryFlashcardData: action.payload
			};
		case "FETCH_FLASHCARD_PRIMARY":
			return {
				...state,
				primaryFlashcardLoadedData: action.payload
			};
		default:
			return state;
	}
};