import React, { Component } from 'react';

import "./SingleFlashcardPreview.css";

class SingleFlashcardPreview extends Component {
	render() {
		const flashcard = this.props.flashcard;
		return (
			<div className="single_flashcard_preview_wrapper">
				<div className="single_flashcard_preview">
					<div className="single_flashcard_preview_title">
						<h3>{flashcard.title}</h3>
					</div>
					<div className="flashcard_preview_table">
						<div className="flashcard_preview_table_header">
							<div className="flashcard_preview_table_field">
								<span>{flashcard.firstColumnName}</span>
							</div>
							<div className="flashcard_preview_table_field">
								<span>{flashcard.secondColumnName}</span>
							</div>						
						</div>
						<div className="flashcard_preview_table_desc">
							<p>{`This set of flashcards contains ${flashcard.Words.length}${flashcard.Words.length === 1 ? " word" : " words"}`}</p>
						</div>
					</div>
					<div className="flashcard_preview_btn">
						<a href={`/flashcards/${flashcard.fid}`} className="flashcardly_btn flashcardly_btn--white">{flashcard.Words.length === 0 ? "Add first word!" : "Enter and learn!"}</a>
					</div>
				</div>
			</div>
		);
	}
}

export default SingleFlashcardPreview;