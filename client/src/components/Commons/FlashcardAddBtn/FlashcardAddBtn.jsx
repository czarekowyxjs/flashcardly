import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import "./FlashcardAddBtn.css";

class FlashcardAddBtn extends Component {
	render() {
		return (
			<div className="single_flashcard_preview_wrapper">
				<div className="single_flashcard_preview flashcard_add_btn">
					<Link to="/flashcards/create">
						<span><FiPlus/></span>
					</Link>
				</div>
			</div>
		)
	}
}

export default FlashcardAddBtn;