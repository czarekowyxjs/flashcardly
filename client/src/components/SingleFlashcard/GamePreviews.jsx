import React, { Component } from 'react';

import "./GamePreviews.css";

class GamePreviews extends Component {
	enterToGameRoom = (e, gameType) => {
		if(this.props.flashcard.flashcardData.Words.length < 1) {
			return;
		}
		// standard mode = 1
		if(gameType === "standard") {
			this.props.history.replace("/gameroom/play?type=1&fid="+this.props.flashcard.flashcardData.fid);
		}
	}

	render() {
		return (
			<div className="single_flashcard_games">
				<div className="single_flashcard_games_wrapper">
					<div className="single_flashcard_game">
						<div className="single_flashcard_game_header" onClick={(e) => this.enterToGameRoom(e, "standard")}>
							<p>{this.props.lang.titles.standardLearning}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default GamePreviews;