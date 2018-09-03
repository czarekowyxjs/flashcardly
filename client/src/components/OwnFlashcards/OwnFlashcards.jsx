import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlusCircleBtn from '../Commons/PlusBtn/PlusCircleBtn.jsx';

class OwnFlashcards extends Component {
	render() {
		return (
			<div className="flashcards_window">
				<div className="flashcards_block">
					<div className="flashcards_block_header">
						<div className="flashcards_block_add_btn">
							<Link to="/flashcards/create">
								<PlusCircleBtn onClick={this.goToFlashcardCreator}/>
							</Link>
						</div>
						<div className="flashcards_block_header_title">
							<h3>Your flashcards</h3>
						</div>
					</div>
					<div className="flashcards_block_body">

					</div>
				</div>
			</div>
		);
	}
}

export default OwnFlashcards;