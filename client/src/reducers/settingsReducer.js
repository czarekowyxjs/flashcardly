const initialState = {
	username: {
		processing: false,
		loaded: false,
		editable: false
	},
	email: {
		processing: false,
		loaded: false,
		editable: false		
	},
	password: {
		processing: false,
		loaded: false,
		editable: false
	}
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "SWITCH_USERNAME_STATUS":
			return {
				...state,
				username: action.payload
			};
		case "SWITCH_EMAIL_STATUS":
			return {
				...state,
				email: action.payload
			};
		case "SWITCH_PASSWORD_STATUS":
			return {
				...state,
				password: action.payload
			};
		default:
			return state;
	}
}