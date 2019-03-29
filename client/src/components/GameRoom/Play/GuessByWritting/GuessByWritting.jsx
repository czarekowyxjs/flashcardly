import React, { Component } from 'react';
import Start from './Start.jsx';
import Game from './Game.jsx';

import "./GuessByWritting.css";

class GuessByWritting extends Component {
	state = {
		started: false,
		selectedGameType: ""
	}

	prepareGameToStart = () => {
		if(this.state.selectedGameType === "") return;
		this.setState({
			started: true
		});
	}

	updateSelectedGameType = (gameType) => {
		this.setState({
			selectedGameType: gameType
		});
	}

	render() {
		const methods = {
			updateSelectedGameType: this.updateSelectedGameType,
			prepareGameToStart: this.prepareGameToStart
		};

		return (
			<div className="guessStandard_window">
				<div className="guessStandard_wrapper">
					{
						!this.state.started
						? <Start {...this.props} methods={methods} selectedGameType={this.state.selectedGameType}/>
						: <Game {...this.props} methods={methods} selectedGameType={this.state.selectedGameType}/>
					}
				</div>
			</div>
		)
	}
}

export default GuessByWritting;