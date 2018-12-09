const initialState = {
	query: "",
	searcherVisibility: false
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "UPDATE_SEARCH_QUERY":
			return {
				...state,
				query: action.payload
			};
		case "SET_SEARCHER_VISIBILITY":
			return {
				...state,
				searcherVisibility: action.payload
			};
		default:
			return state;
	}
}