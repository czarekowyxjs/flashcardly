import axios from 'axios';

export const updateQuery = query => {
	return {
		type: "UPDATE_SEARCH_QUERY",
		payload: query
	}
};

export const setSearcherVisibility = payload => {
	return {
		type: "SET_SEARCHER_VISIBILITY",
		payload: payload
	}
};

export const executeSearchQuery = () => {
	return dispatch => {
		console.log('xd');
	}
}