import React, { Component } from 'react';
import CircleLoader from '../../../Commons/Loader/CircleLoader.jsx';
import SearcherBarResultsItem from './SearcherBarResultsItem.jsx';

import "./SearcherBarResults.css";

class SearcherBarResults extends Component {
	renderResults = () => {
		const results = this.props.search.results;
		return results.map((key, index) => {
			return <SearcherBarResultsItem key={key.uniqueKey} item={key}/>;
		});
	}

	render() {
		const search = this.props.search;
		if(!search.searcherBar.processing && !search.searcherBar.loaded) return null;
		return (
			<div className="searcher_bar_results">
				{
					search.searcherBar.processing && !search.searcherBar.loaded 
					? <CircleLoader/>
					: null
				}
				{
					search.searcherBar.loaded
					? 
						<div className="searcher_bar_results_content">
							{this.renderResults()}
						</div>
					: null
				}
			</div>
		)
	}
}

export default SearcherBarResults;