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
	},
	emailPrivacy: {
		processing: false,
		loaded: false,
		editable: false
	},
	loginByUsername: {
		processing: false,
		loaded: false,
		editable: false
	}
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "SETTINGS_TO_INITIAL":
			return initialState;
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
		case "SWITCH_EMAILPRIVACY_STATUS":
			return {
				...state,
				emailPrivacy: action.payload
			};
		case "SWITCH_LOGINBYUSERNAME_STATUS":
			return {
				...state,
				loginByUsername: action.payload
			};
		default:
			return state;
	}
}