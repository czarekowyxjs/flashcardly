import React, { Component } from 'react';
import ShuffleArray from '../../../../helpers/ShuffleArray';
import CircleLoader from "../../../Commons/Loader/CircleLoader.jsx";
import GameWindowResult from './GameWindowResult.jsx';
import GameWindowWord from "./GameWindowsWord.jsx";
import WordChecking from './WordChecking.jsx';
import Finished from './Finished.jsx';

class GameWindow extends Component {
	state = {
		loaded: false,
		wordChecking: false,
		finished: false,
		duration: 0,
		staticDuration: 0,
		words: [],
		wordNum: 0,
		result: 0,
		good: false
	}

	componentDidMount() {
		this.initGame();
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	updateTimerDuration = () => {
		this.setState(prevState => {
			if(prevState.duration <= 0) {
				clearInterval(this.interval);
				return {
					finished: true
				}
			}
			else return {
				duration: prevState.duration-1
			}
		});
	}

	checkWord = (word) => {
		this.setState(prevState => {
			
			let good = false;

			if(this.props.selectedGameType === "firstToSecond") {
				if(prevState.words[prevState.wordNum].secondColumnValue === word) good = true;
			} else {
				if(prevState.words[prevState.wordNum].firstColumnValue === word) good = true;
			}

			let result = prevState.result;

			if(good) result += 1;

			return {
				result,
				wordChecking: true,
				good
			}

		});
	}

	confirmCheckedWord = (e) => {
		if(e.type === "keyup" && e.key !== "Enter") return;
		this.setState(prevState => {
			let wordNum = prevState.wordNum;
			let finished = false;

			if(prevState.words.length-1 === wordNum) finished = true;
			else wordNum += 1;

			return {
				wordNum,
				finished,
				wordChecking: false
			}
		}, () => {
			if(this.state.finished) clearInterval(this.interval);
		});
	}

	initGame = () => {
		this.setState(prevState => {
			const flashcard = this.props.flashcard;
			const words = ShuffleArray(flashcard.Words);
			const duration = words.length*10;
			this.interval = setInterval(this.updateTimerDuration, 1000);
			return {
				loaded: true,
				words,
				duration,
				staticDuration: duration
			}
		})
	}

	render() {
		console.log(this.state);
		let methods = this.props.methods;
		methods.checkWord = this.checkWord;
		methods.confirmCheckedWord = this.confirmCheckedWord;

		if(!this.state.loaded) return <CircleLoader light={this.props.light}/>

		return (
			<div className="gsb_game_win">
				<div className="gsb_game_wrapper">
					<div className="gsb_game_word">
						{
							this.state.finished && !this.state.wordChecking
							? <Finished result={this.state.result} duration={this.state.duration} staticDuration={this.state.staticDuration} flashcard={this.props.flashcard} lang={this.props.lang}/>
							: null
						}

						{
							!this.state.finished && !this.state.wordChecking
							? <GameWindowWord word={this.state.words[this.state.wordNum]} selectedGameType={this.props.selectedGameType} light={this.props.light} lang={this.props.lang} methods={methods}/>
							: null
						}

						{
							!this.state.finished && this.state.wordChecking
							? <WordChecking good={this.state.good} word={this.state.words[this.state.wordNum]} selectedGameType={this.props.selectedGameType} methods={methods} lang={this.props.lang}/>
							: null
						}
	
					</div>
				</div>
				<GameWindowResult {...this.props} data={this.state}/>
			</div>
		)
	}
}

export default GameWindow;