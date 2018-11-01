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
					<div className="single_flashcard_game" onClick={(e) => this.enterToGameRoom(e, "standard")}>
						<div className="single_flashcard_game_header">
							<p>{this.props.lang.titles.standardLearning}</p>
						</div>
					</div>
					<div className="single_flashcard_game" onClick={(e) => this.enterToGameRoom(e, "guessStandard")}>
						<div className="single_flashcard_game_header">
							<p>{this.props.lang.titles.guessByWriting}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default GamePreviews;