import axios from 'axios';
import { landUpUserData } from './userActions';

export const loginByLocalData = (email, password) => {
	return async dispatch => {
		try {
			const response = await axios.post("/api/v1/authentication/signin", {
				email: email,
				password: password
			});

			if(response.status === 200) {
				dispatch(landUpUserData(response.data.user));
				localStorage.setItem("token", response.data.token.token);
				dispatch(setLoggedStatus(true));
			}
		} catch(e) {
			dispatch(setLoggedStatus(false));
		}
	}
}

export const localAuth = () => {
	return async dispatch => {
		dispatch(setAuthState(false, true));
		try {
			const token = localStorage.getItem("token");
			const response = await axios.post("/api/v1/authentication/verify", {}, {
				headers: {
					authorization: token
				}
			});

			if(response.status === 200) {
				localStorage.setItem("token", response.data.token);
				dispatch(landUpUserData(response.data.user));
				dispatch(setLoggedStatus(true));
				dispatch(setAuthState(true, false));
			}

		} catch(e) {
			dispatch(setLoggedStatus(false));
			dispatch(setAuthState(true, false));
			console.clear();
		}
	}
}

export const localAuthReverse = () => {
	return async dispatch => {
		dispatch(setAuthState(false, true));
		const token = localStorage.getItem("token");
		if(token === null) {
			dispatch(setLoggedStatus(false));
			dispatch(setAuthState(true, false));
		} else {
			try {
				const response = await axios.post("/api/v1/authentication/verifyreverse", {}, {
					headers: {
						authorization: token
					}
				});

				if(response.status === 200) {
					dispatch(setLoggedStatus(true));
					dispatch(setAuthState(true, false));
				} else if(response.status === 203) {
					dispatch(setLoggedStatus(false));
					dispatch(setAuthState(true, false));
				}
			
			} catch(e) {
				dispatch(setLoggedStatus(false));
				dispatch(setAuthState(true, false));
			}
		}
	}
}

export const logoutLocal = () => {
	return async dispatch => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.post("/api/v1/authentication/signout", {}, {
				headers: {
					authorization: token
				}
			});

			if(response.status === 200) {
				localStorage.removeItem("token");
				dispatch(setLoggedStatus(false));
			}
			
		} catch(e) {
			console.log(e.response);
		}
	}
}

export const registerByLocalData = (username, email, password, password2) => {
	return async dispatch => {
		dispatch(setRegisterState(false, true, false));
		try {
			const response = await axios.post("/api/v1/authentication/signup", {
				username,
				email,
				password,
				password2
			});

			if(response.status === 200) {
				dispatch(setRegisterState(true, false, false));
			}

		} catch(e) {
			dispatch(setRegisterState(true, false, true));
		}
	}
}

export const confirmEmailAddress = hash => {
	return async dispatch => {
		try {
			const response = await axios.put("/api/v1/authentication/email/confirm", {
				hash: hash
			});

		
			if(response.status === 200) {
				dispatch(confirmEmailAddressLoaded(true));
			}
 
		} catch(e) {
			dispatch({
				type: "CONFIRM_EMAIL_ERROR",
				payload: true
			});
			dispatch(confirmEmailAddressLoaded(true));
		}
	}
}

export const setAuthLoadedStatus = (payload) => {
	return {
		type: "AUTH_LOADED_STATUS",
		payload: payload
	}
}

export const setAuthState = (loaded, processing) => {
	return {
		type: "AUTH_STATE",
		payload: {
			loaded: loaded,
			processing: processing
		}
	}
}

export const setRegisterState = (loaded, processing, error) => {
	return {
		type: "REGISTER_STATE",
		payload: {
			loaded: loaded,
			processing: processing,
			error: error
		}
	}
}

export const confirmEmailAddressLoaded = payload => {
	return {
		type: "CONFIRM_EMAIL_LOADED",
		payload: payload
	}
}

export const setLoggedStatus = (payload) => {
	return {
		type: "LOGGED_IN_STATUS",
		payload: payload 
	}
}