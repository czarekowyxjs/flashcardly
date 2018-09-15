import React, { Component } from 'react';
import SingleWord from './SingleWord.jsx';
import AddWordForm from './AddWordForm.jsx';
import AddWordLoader from './AddWordLoader.jsx';

import "./TableOfFlashcardWords.css";

class TableOfFlashcardWords extends Component {
	renderTableItems = array => {
		return array.map((word, index) => {
			return <SingleWord key={word.wid} wordData={word} methods={this.props.methods}/>
		});
	}

	render() {
		const flashcard = this.props.flashcard;
		return (
			<div className="single_flashcard_words_table">
				<div className="flashcard_word_table_row flashcard_word_table_row--header">
					<div className="flashcard_word_table_field">
						<span>{flashcard.flashcardData.firstColumnName}</span>
					</div>
					<div className="flashcard_word_table_field">
						<span>{flashcard.flashcardData.secondColumnName}</span>
					</div>
					<div className="flashcard_word_table_field--options">
						<span>xd</span>
					</div>
				</div>
				<AddWordForm methods={this.props.methods} flashcard={flashcard}/>
				{this.renderTableItems(flashcard.flashcardData.Words)}
				{!flashcard.addWordLoaded
					? <AddWordLoader/> 
					: null
					}
			</div>
		);
	}
}

export default TableOfFlashcardWords;