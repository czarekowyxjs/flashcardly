export const switchUsernameStatus = (processing, loaded, editable) => {
	return {
		type: "SWITCH_USERNAME_STATUS",
		payload: {
			processing,
			loaded,
			editable
		}
	}
}

export const switchEmailStatus = (processing, loaded, editable) => {
	return {
		type: "SWITCH_EMAIL_STATUS",
		payload: {
			processing,
			loaded,
			editable
		}
	}
}

export const switchPasswordStatus = (processing, loaded, editable) => {
	return {
		type: "SWITCH_PASSWORD_STATUS",
		payload: {
			processing,
			loaded,
			editable
		}
	}
}