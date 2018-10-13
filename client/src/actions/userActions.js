import axios from 'axios';
import store from "../store";

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