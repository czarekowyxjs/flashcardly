import axios from 'axios';
import { getFullFBUserData, landUpUserData } from './userActions';

export const signInWithFacebook = () => {
	return dispatch => window.FB.login(response => {
		if(response.status === "connected") {
			dispatch(getFullFBUserData(response.authResponse));
		} else if(response.status === 'authorization_expired') {

		} else if(response.status === 'not_authorized') {

		} else {

		}
	});
};

export const transferFacebookData = (fbData) => {
	return async dispatch => {
		try {
			const response = await axios.post("/api/v1/authentication/signin/facebook", {
				data: fbData
			});
			dispatch(landUpUserData(response.data.user));
			dispatch(setLoggedInStatus(true));
			dispatch(setAuthLoadedStatus(true));
		} catch(e) {
			console.log(e.response);
		}
	};
};

export const getLoginStatusFB = () => {
	return dispatch => {
		dispatch(setAuthLoadedStatus(false));
		window.FB.getLoginStatus(response => {
			if(response.status === 'connected') {
				dispatch(getFullFBUserData(response.authResponse));
			} else if(response.status === 'authorization_expired') {
				dispatch(setLoggedInStatus(false));
				dispatch(setAuthLoadedStatus(true));
			} else if(response.status === 'not_authorized') {
				dispatch(setLoggedInStatus(false));
				dispatch(setAuthLoadedStatus(true));
			} else {
				dispatch(setLoggedInStatus(false));
				dispatch(setAuthLoadedStatus(true));
			}
		});
	};
};

export const setLoggedInStatus = (payload) => {
	return {
		type: "LOGGED_IN_STATUS",
		payload: payload
	};
};

export const setAuthLoadedStatus = (payload) => {
	return {
		type: "AUTH_LOADED_STATUS",
		payload: payload
	};
};