import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleCheckLearnedWord } from '../../actions/flashcardActions';
import { fetchFlashcardToGame, fetchFlashcardToGameLoaded } from '../../actions/gameActions';
import Loader from '../Commons/Loader/Loader.jsx';
import Standard from './Standard/Standard.jsx';

class Play extends Component {
	search = {}

	componentDidMount() {
		this.search = new URLSearchParams(this.props.location.search);
		if(this.search.has("fid") && this.search.has("type")) {
			this.props.fetchFlashcardToGame(parseInt(this.search.get("fid"), 10));
		}
	}

	componentWillUnmount() {
		this.props.fetchFlashcardToGameLoaded(false);		
	}

	handlerToggleLearnedWord = (wid) => {
		this.props.toggleCheckLearnedWord(wid);
	}

	renderGame = () => {
		const methods = {
			handlerToggleLearnedWord: this.handlerToggleLearnedWord
		};

		switch(parseInt(this.search.get("type"), 10)) {
			case 1:
				return <Standard flashcard={this.props.flashcard} game={this.props.game} methods={methods}/>;
			default:
				return null;
		}
	}

	render() {
		if(!this.props.game.fetchFlashcardGameLoaded) {
			return <Loader message="Loading game"/>;
		}
		return (
			<div className="game_window">
				{this.renderGame()}		
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		flashcard: state.flashcard,
		game: state.game
	};
};

export default connect(mapStateToProps, { fetchFlashcardToGame, fetchFlashcardToGameLoaded, toggleCheckLearnedWord })(Play);