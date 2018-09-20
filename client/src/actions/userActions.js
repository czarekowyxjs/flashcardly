import axios from 'axios';
import { transferFacebookData } from './authActions';
import store from "../store";

export const getFullFBUserData = (authResponse) => {
	return dispatch => {
	 const fbData = {
	 	authResponse
	 };

	 window.FB.api(authResponse.userID, response => {
	 	fbData.user = response;
	 	dispatch(transferFacebookData(fbData));
	 }, {
	 	fields: "name,picture,email,first_name,last_name"
	 });
	};
};

export const getFullLocalUserData = () => {
	return dispatch => {

	};
};

export const landUpUserData = (user) => {
	return {
		type: "LAND_UP_USER_DATA",
		payload: user
	};
};

export const getUserScreenParameters = () => {
	return {
		type: "GET_SCREEN_PARAMETERS",
		payload: {
			width: window.screen.availWidth,
			height: window.screen.availHeight
		}
	};
};

export const confirmFlashcardIntroduce = () => {
	return async dispatch => {
		const userState = store.getState().user;
		console.log(userState);
		try {
			const response = await axios.put("/api/v1/users/intro/flashcard", {}, {
				headers: {
					authorization: userState.userData.fb.signedRequest
				}
			});

			console.log(response);
		} catch(e) {
			console.log(e.response);
		}
	};
};