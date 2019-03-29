import React, { Component } from 'react';
import axios from 'axios';
import ShuffleArray from '../../../../helpers/ShuffleArray';
import CircleLoader from "../../../Commons/Loader/CircleLoader.jsx";
import GameWindowResult from './GameWindowResult.jsx';

class GameWindow extends Component {
	state = {
		loaded: false,
		wordChecking: false,
		finished: false,
		duration: 0,
		staticDuration: 0,
		game: {},
		words: [],
		wordNum: 0,
		inputWord: ""
	}

	componentDidMount() {
		this.initGame();
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	updateTimerDuration = () => {
		this.setState(prevState => {
			if(prevState.duration === 0) clearInterval(this.interval);
			else return {
				duration: prevState.duration-1
			}
		});
	}

	onChangeInputWord = (e) => {
		this.setState({
			inputWord: e.target.value
		});
	}

	handleCheckWordBtn = () => {
		this.setState({
			wordChecking: true
		}, () => {
			this.checkWord();
		});
	}

	checkWord = async () => {	
		try {
			const token = localStorage.getItem("token");

			const response = await axios.put("/api/v1/game/gbw/check", {
				input: this.state.inputWord,
				wid: this.state.words[this.state.wordNum].wid,
				gbwid: this.state.game.gbwid,
				selectedGameType: this.props.selectedGameType
			}, {
				headers: {
					authorization: token
				}
			});
			console.log(response);
			if(response.status === 200) {
				this.setState(prevState => {

					let newWordNum;
					let newGame = prevState.game;
					let finished = false;

					if(prevState.wordNum+1 === prevState.game.wordsAmount) finished = true;
					else newWordNum = prevState.wordNum+1;

					if(response.data.result) newGame = newGame.result+1;

					return {
						wordChecking: false,
						wordNum: newWordNum,
						game: newGame,
						finished: finished,
						inputWord: ''
					};
				});
			}

		} catch(e) {
			console.log(e.response);
		}
	}

	initGame = async () => {
		try {
			const token = localStorage.getItem("token");
			const fid = this.props.flashcard.fid;
			const response = await axios.post("/api/v1/game/gbw/create", {
				fid: fid
			}, {
				headers: {
					authorization: token
				}
			});
			
			if(response.status === 200) {
				this.setState({
					loaded: true,
					game: response.data.game,
					duration: response.data.duration,
					staticDuration: response.data.duration,
					words: ShuffleArray(this.props.flashcard.Words)
				}, () => {
					this.interval = setInterval(this.updateTimerDuration, 1000);
				});
			}

		} catch(e) {
			console.log(e.response);
		}
	}

	render() {
		if(!this.state.loaded || this.state.wordChecking) return <CircleLoader light={this.props.light}/>
		return (
			<div className="gsb_game_win">
				<div className="gsb_game_wrapper">
					<div className="gsb_game_word">
						<div className="gsb_game_word_native">
							<span>
								{
									this.props.selectedGameType === "firstToSecond"
									? this.state.words[this.state.wordNum].firstColumnValue
									: this.state.words[this.state.wordNum].secondColumnValue
								}
							</span>
						</div>
						<div className="gsb_game_word_translate">
							<input
								type="text"
								className={`gsb_game_input ${this.props.light ? "dark" : "light"}`}
								value={this.state.inputWord}
								onChange={this.onChangeInputWord}
							/>
							<div className="gsb_game_word_translate_info">
								<span>Your translation</span>
								<button
									className={`flashcardly_btn ${this.props.light ? "lightBorder" : "darkBorder"} flashcardly_btn--common`}
									onClick={this.handleCheckWordBtn}
								>
									Check
								</button>
							</div>
						</div>
					</div>
				</div>
				<GameWindowResult {...this.props} data={this.state}/>
			</div>
		)
	}
}

export default GameWindow;