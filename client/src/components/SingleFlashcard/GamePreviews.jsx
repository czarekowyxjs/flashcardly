import React, { Component } from 'react';

import "./GamePreviews.css";

class GamePreviews extends Component {
	enterToGameRoom = (e, gameType) => {
		if(gameType === "standard") {
			this.props.history.replace("/gameinit?type=1&fid="+this.props.flashcard.flashcardData.fid);
		}
	}

	render() {
		return (
			<div className="single_flashcard_games">
				<div className="single_flashcard_games_wrapper">
					<div className="single_flashcard_game">
						<div className="single_flashcard_game_header" onClick={(e) => this.enterToGameRoom(e, "standard")}>
							<p>Learn flashcards using the standard method</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default GamePreviews;