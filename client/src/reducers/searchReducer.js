const initialState = {
	query: "",
	searcherBar: {
		processing: false,
		loaded: false
	},
	results: [],
	offset: 0,
	limit: 5
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "UPDATE_SEARCH_QUERY":
			return {
				...state,
				query: action.payload,
				results: [],
				searcherBar: {
					processing: false,
					loaded: false
				},
				offset: 0,
				limit: 5
			};
		case "UPDATE_SEARCHER_BAR":
			return {
				...state,
				searcherBar: action.payload
			};
		case "UPDATE_SEARCH_DATA":
			return {
				...state,
				results: action.payload.results,
				offset: action.payload.offset
			};
		default:
			return state;
	}
}