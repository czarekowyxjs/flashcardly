import React, { Component } from 'react';
import GameCounterWrapper from './GameCounterWrapper.jsx';
import GameWindow from './GameWindow.jsx';

import "./Game.css";

class Game extends Component {
	state = {
		playing: true
	}

	handleCounterCb = () => {
		this.setState({
			playing: true
		});
	}

	render() {
		let methods = this.props.methods;
		methods.handleCounterCb = this.handleCounterCb;

		return (
			<div className="guessByWritting_game">
				{
					this.state.playing
					? <GameWindow lang={this.props.lang} light={this.props.light} flashcard={this.props.flashcard} methods={methods} selectedGameType={this.props.selectedGameType}/>
					: <GameCounterWrapper lang={this.props.lang} methods={methods}/>
				}
			</div>
		)
	}
}

export default Game;