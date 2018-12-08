import React, { Component } from 'react';

import "./GamePreviews.css";

class GamePreviews extends Component {
	enterToGameRoom = (e, gameType) => {
		if(this.props.flashcard.flashcardData.Words.length < 1) {
			return;
		}
		switch(gameType) {
			case "standard":
				return this.props.history.replace(`/gameroom/play?fid=${this.props.flashcard.flashcardData.fid}&type=${gameType}`);
			case "guessStandard":
				return this.props.history.replace("/gameroom/play?type=2&fid="+this.props.flashcard.flashcardData.fid);
			default:
				return;
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
				</div>
			</div>
		);
	}
}

export default GamePreviews;