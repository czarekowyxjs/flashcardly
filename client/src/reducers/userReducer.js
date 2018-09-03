const initialState = {
	isLoggedIn: false,
	authLoaded: false,
	userData: {}
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
		default:
			return state;
	}
};
