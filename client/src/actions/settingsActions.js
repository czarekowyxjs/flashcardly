export const settingsToInitial = () => {
	return {
		type: "SETTINGS_TO_INITIAL"
	}
}

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

export const switchEmailPrivacyStatus = (processing, loaded, editable) => {
	return {
		type: "SWITCH_EMAILPRIVACY_STATUS",
		payload: {
			processing,
			loaded,
			editable
		}
	}
}

export const switchLoginByUsernameStatus = (processing, loaded, editable) => {
	return {
		type: "SWITCH_LOGINBYUSERNAME_STATUS",
		payload: {
			processing,
			loaded,
			editable
		}
	}
}

export const switchFlashcardTitleStatus = (processing, loaded, editable) => {
	return {
		type: "SWITCH_FLASHCARDTITLE_STATUS",
		payload: {
			processing,
			loaded,
			editable
		}
	}
}