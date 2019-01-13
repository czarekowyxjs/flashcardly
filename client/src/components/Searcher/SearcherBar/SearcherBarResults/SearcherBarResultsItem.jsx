import React, { Component } from 'react';
import SearchBarResultsItemUser from './SearchBarResultsItemUser.jsx';
import SearchBarResultsItemFlashcard from './SearchBarResultsItemFlashcard.jsx';

class SearcherBarResultsItem extends Component {
	renderItem = () => {
		const item = this.props.item;
		switch(item.type) {
			case "user":
				return <SearchBarResultsItemUser item={item}/>;
			case "flashcard":
				return <SearchBarResultsItemFlashcard item={item}/>;
			default:
				return;
		}
	}

	render() {
		return (
			<div className="searcher_bar_results_item">
				{this.renderItem()}
			</div>
		)
	}
}

export default SearcherBarResultsItem;