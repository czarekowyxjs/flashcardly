const initialState = {
	isLoggedIn: false,
	auth: {
		loaded: false,
		processing: false
	},
	register: {
		loaded: false,
		processing: false,
		error: false
	},
	confirmEmailLoaded: false,
	confirmEmailError: false,
	userData: {},
	ownFlashcards: [],
	ownFlashcardsPage: 0,
	ownFlashcardsLoaded: false,
	ownFlashcardsIsMore: false,
	screen: {
		width: 0,
		height: 0
	},
	lang: {}
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "LOGGED_IN_STATUS":
			return {
				...state,
				isLoggedIn: action.payload
			};
		case "AUTH_STATE":
			return {
				...state,
				auth: action.payload
			};
		case "REGISTER_STATE":
			return {
				...state,
				register: action.payload
			};
		case "CONFIRM_EMAIL_LOADED":
			return {
				...state,
				confirmEmailLoaded: action.payload
			};
		case "CONFIRM_EMAIL_ERROR":
			return {
				...state,
				confirmEmailError: action.payload
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
				ownFlashcardsPage: state.ownFlashcardsPage+1,
				ownFlashcardsIsMore: action.payload.isMore
			};
		case "OWN_FLASHCARDS_LOADED":
			return {
				...state,
				ownFlashcardsLoaded: action.payload
			};
		case "CLEAR_OWN_FLASHCARDS":
			return {
				...state,
				ownFlashcards: [],
				ownFlashcardsPage: 0,
				ownFlashcardsLoaded: false,
				ownFlashcardsIsMore: false
			};
		case "GET_SCREEN_PARAMETERS":
			return {
				...state,
				screen: action.payload
			};
		case "LAND_UP_LANG_DATA":
			return {
				...state,
				lang: action.payload
			};
		default:
			return state;
	}
};
