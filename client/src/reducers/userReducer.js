const initialState = {
	isLoggedIn: false,
	authLoaded: false,
	userData: {},
	ownFlashcards: [],
	ownFlashcardsPage: 0
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "LOGGED_IN_STATUS":
			return {
				...state,
				isLoggedIn: action.payload
			};
		case "AUTH_LOADED_STATUS":
			return {
				...state,
				authLoaded: action.payload
			};
		case "LAND_UP_USER_DATA":
			return {
				...state,
				userData: action.payload
			};
		case "LAND_UP_OWN_FLASHCARDS":
			return {
				...state,
				ownFlashcards: action.payload
			};
		case "UP_OWN_FLASHCARDS_PAGE":
			return {
				...state,
				ownFlashcardsPage: state.ownFlashcardsPage+1
			};
		case "CLEAR_OWN_FLASHCARDS":
			return {
				...state,
				ownFlashcards: [],
				ownFlashcardsPage: 0
			};
		default:
			return state;
	}
};
