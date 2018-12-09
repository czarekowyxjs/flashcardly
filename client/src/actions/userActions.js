import axios from 'axios';
import store from "../store";
import { switchUsernameStatus, switchEmailStatus, switchPasswordStatus, switchEmailPrivacyStatus, switchLoginByUsernameStatus } from './settingsActions';

export const getFullFBUserData = (authResponse) => {
	return dispatch => {
	 const fbData = {
	 	authResponse
	 };

	 window.FB.api(authResponse.userID, response => {
	 	fbData.user = response;
	 	
	 }, {
	 	fields: "name,picture,email,first_name,last_name"
	 });
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
			width: window.innerWidth,
			height: window.innerHeight
		}
	};
};

export const confirmFlashcardIntroduce = () => {
	return async dispatch => {
		const userState = store.getState().user;
		const token = localStorage.getItem("token");
		try {
			await axios.put("/api/v1/users/options/introflashcard", {}, {
				headers: {
					authorization: token
				}
			});

			const userData = userState.userData;

			userData.User_option.flashcardIntro = 1;

			dispatch({
				type: "LAND_UP_USER_DATA",
				payload: userData
			});
		} catch(e) {
			console.log(e.response);
		}
	};
};

export const updateUserAvatar = (avName) => {
	return async dispatch => {
		const userState = store.getState().user;

		try {
			const token = localStorage.getItem("token");
			const response = await axios.put('/api/v1/users/avatar', {
				avatarUrl: avName
			}, {
				headers: {
					authorization: token
				}
			});

			if(response.status === 200) {
				userState.userData.avatarUrl = avName;
				dispatch(landUpUserData(userState.userData));				
			}
		} catch(e) {
			console.log(e.response);
		}
	}
}

export const updateUserUsername = (username) => {
	return async dispatch => {
		dispatch(switchUsernameStatus(true, false, true));
		try {

			const userState = store.getState().user;
			const token = localStorage.getItem("token");

			const response = await axios.put("/api/v1/users/username", {
				username
			}, {
				headers: {
					authorization: token
				}
			});

			userState.userData.username = response.data.username;


			dispatch(landUpUserData(userState.userData))
			dispatch(switchUsernameStatus(false, true, false));

		} catch(e) {
			console.log(e.response);
			dispatch(switchUsernameStatus(false, true, true));
		}
	}
}

export const updateUserEmail = (email) => {
	return async dispatch => {
		dispatch(switchEmailStatus(true, false, true));
		try {

			const userState = store.getState().user;
			const token = localStorage.getItem("token");

			const response = await axios.put("/api/v1/users/email", {
				email
			}, {
				headers: {
					authorization: token
				}
			});

			userState.userData.email = response.data.email;


			dispatch(landUpUserData(userState.userData))
			dispatch(switchEmailStatus(false, true, false));

		} catch(e) {
			console.log(e.response);
			dispatch(switchEmailStatus(false, true, true));
		}
	}
}

export const updateUserPassword = (currentPassword, newPassword, newPasswordRepeat) => {
	return async dispatch => {
		dispatch(switchPasswordStatus(true, false, true));
		try {
			const token = localStorage.getItem("token");
			const response = await axios.put("/api/v1/users/password", {
				currentPassword,
				newPassword,
				newPasswordRepeat
			}, {
				headers: {
					authorization: token
				}
			});

			if(response.status === 200) {
				dispatch(switchPasswordStatus(false, true, false));				
			}

		} catch(e) {
			dispatch(switchPasswordStatus(false, true, true));
			console.log(e.response);
		}
	}
}

export const updateEmailPrivacy = () => {
	return async dispatch => {
		dispatch(switchEmailPrivacyStatus(true, false, false));
		try {
			const token = localStorage.getItem("token");
			const userState = store.getState().user;
			const response = await axios.put("/api/v1/users/emailprivacy", {}, {
				headers: {
					authorization: token
				}
			});

			if(response.status === 200) {
				userState.userData.User_option.emailVisibility = !userState.userData.User_option.emailVisibility;
				dispatch(landUpUserData(userState.userData));
			}

		} catch(e) {
			console.log(e.response);
		} finally {
			dispatch(switchEmailPrivacyStatus(false, true, false));
		}
	}
}

export const updateLoginByUsername = () => {
	return async dispatch => {
		dispatch(switchLoginByUsernameStatus(true, false, false));
		try {
			const token = localStorage.getItem("token");
			const userState = store.getState().user;
			const response = await axios.put("/api/v1/users/loginbyusername", {}, {
				headers: {
					authorization: token
				}
			});

			if(response.status === 200) {
				userState.userData.User_option.loginByUsername = !userState.userData.User_option.loginByUsername;
				dispatch(landUpUserData(userState.userData));
			}

		} catch(e) {
			console.log(e.response);
		} finally {
			dispatch(switchLoginByUsernameStatus(false, true, false));
		}
	}
}