import axios from 'axios';
import store from '../store';

export const updateQuery = query => {
	return {
		type: "UPDATE_SEARCH_QUERY",
		payload: query
	}
};

export const executeSearchQuery = () => {
	return async dispatch => {
		dispatch(updateSearcherBar(true, false));
		const state = store.getState();
		const query = state.search.query;
		const offset = state.search.offset;
		const limit = state.search.limit;
		const actualResults = state.search.results;
		const token = localStorage.getItem("token");
		if(query.length < 3) return dispatch(updateSearcherBar(false, false));
		try {
			const response = await axios.get(`/api/v1/service/search?query=${query}&limit=${limit}&offset=${offset}`, {
				headers: {
					authorization: token
				}
			});

			if(response.status === 200) {
				const newResults = [].concat(actualResults, response.data.results);
				dispatch(updateSearchData(newResults, offset+limit));
				dispatch(updateSearcherBar(false, true));
			}

		} catch(e) {
			console.log(e.response);
		}
	}
}

export const updateSearcherBar = (processing, loaded) => {
	return {
		type: "UPDATE_SEARCHER_BAR",
		payload: {
			processing,
			loaded
		}
	}
}

export const updateSearchData = (results, offset) => {
	return {
		type: "UPDATE_SEARCH_DATA",
		payload: {
			results,
			offset
		}
	}
}