import { transferFacebookData } from './authActions';

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