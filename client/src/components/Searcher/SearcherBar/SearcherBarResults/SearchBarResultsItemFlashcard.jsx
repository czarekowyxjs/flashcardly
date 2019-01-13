import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchBarResultsItemFlashcard extends Component {
	render() {
		const flashcard = this.props.item;
		return (
			<div className="search_bar_results_item_flashcard">
				<Link to={`/redirect/%2Fflashcards%2F${flashcard.fid}`}>
					<div className="search_bar_results_item_flashcard_content">
						<div className="search_bar_resultes_flashcard_title">
							<p>{flashcard.title}</p>
						</div>
					</div>
				</Link>
			</div>
		)
	}
}

export default SearchBarResultsItemFlashcard;