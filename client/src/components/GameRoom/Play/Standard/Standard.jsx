import React, { Component } from 'react';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { IoIosSync, IoIosRefresh } from 'react-icons/io';
import SingleWord from './SingleWord.jsx';
import ShuffleArray from '../../../../helpers/ShuffleArray';

import "./Standard.css";

class Standard extends Component {
	state = {
		actualWord: 0,
		firstColumn: true,
		words: [],
		loaded: false
	}

	componentDidMount() {
		this.setState({
			words: ShuffleArray(this.props.flashcard.Words),
			count: this.props.flashcard.Words.length,
			loaded: true
		});

		window.addEventListener("keyup", this.handleChangeWordByKey, false);
		window.addEventListener("keyup", this.handleReverseCardByKey, false);
	}

	componentWillUnmount() {
		window.removeEventListener("keyup", this.handleChangeWordByKey, false);
		window.removeEventListener("keyup", this.handleReverseCardByKey, false);
	}

	handleShuffleWords = () => {
		this.setState({
			words: ShuffleArray(this.props.flashcard.Words),
			actualWord: 0
		});
	}

	handleChangeWordByKey = (e) => {
		switch(e.keyCode) {
			case 37:
				return this.changeWord(e, "back");
			case 39:
				return this.changeWord(e, "next");
			default:
				return;
		}
	}

	handleReverseCardByKey = (e) => {
		if(e.keyCode === 13) return this.reverseCard();
	}

	changeWord = (e, direction) => {
		if((direction === "back" && this.state.actualWord === 0) || (direction === "next" && this.state.actualWord === this.state.count-1)) return;

		let changeValue = 1;

		if(direction === "back") changeValue = -1;

		this.setState(prevState => ({
			actualWord: prevState.actualWord+changeValue
		}));
	}

	reverseCard = () => {
		this.setState(prevState => ({
			firstColumn: !prevState.firstColumn
		}));
	}

	render() {
		if(!this.state.loaded) return <p>Loading</p>;

		const methods = {
			reverseCard: this.reverseCard
		};

		return (
			<div className="standard_game_window">
				<div className="standard_game_wrapper">
					<div className="standard_game_arrow standard_game_back" onClick={(e) => this.changeWord(e, "back")}>
						<MdNavigateBefore/>
					</div>
					<SingleWord methods={methods} firstColumn={this.state.firstColumn} word={this.state.words[this.state.actualWord]}/>
					<div className="standard_game_arrow standard_game_next" onClick={(e) => this.changeWord(e, "next")}>
						<MdNavigateNext/>
					</div>
				</div>
				<div className="standard_game_footer">
					<div className="standard_game_info">
						<div className="standard_game_info_box">
							<span>
								Column name: 
							</span>
							<span>
								{
									this.state.firstColumn 
									? this.props.flashcard.firstColumnName
									: this.props.flashcard.secondColumnName
								}
							</span>
						</div>
						<div className="standard_game_info_box">
							<span>
								Word number: 
							</span>
							<span>
								{`${this.state.actualWord+1}/${this.state.count}`}
							</span>
						</div>
					</div>
					<div className="standard_game_options">
						<div onClick={this.handleShuffleWords} className="standard_game_option">
							<span>
								Shuffle words
							</span>
							<i>
								<IoIosRefresh/>
							</i>
						</div>
						<div onClick={this.reverseCard} className="standard_game_option">
							<span>
								Reverse card
							</span>
							<i>
								<IoIosSync/>
							</i>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Standard;