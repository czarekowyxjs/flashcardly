import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./SingleFlashcardPreview.css";

class SingleFlashcardPreview extends Component {
	render() {
		const lang = this.props.lang;
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
							<p>{`${lang.contents.flashcardPreviewContain} ${flashcard.Words.length}${flashcard.Words.length === 1 ? lang.shorts.word : lang.shorts.words}`}</p>
						</div>
					</div>
					<div className="flashcard_preview_btn">
						<Link to={`/flashcards/${flashcard.fid}`} className="flashcardly_btn flashcardly_btn--white">{flashcard.Words.length === 0 ? lang.buttons.addFirstWord : lang.buttons.learn}</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default SingleFlashcardPreview;