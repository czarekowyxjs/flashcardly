import React, { Component } from 'react';
import SingleWordStandard from "./SingleWordStandard.jsx";
import { Link } from 'react-router-dom';
import { IoMdShareAlt, IoIosHelpBuoy } from 'react-icons/io';
import { GoScreenFull, GoScreenNormal } from 'react-icons/go';
import { MdRefresh, MdInvertColors, MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

import "./Standard.css";

class Standard extends Component {
	state = {
		loaded: false,
		actualWord: 0,
		fullScreen: false,
		invertColors: false
	}

	componentDidMount() {
		const words = this.props.flashcard.flashcardData.Words;
		const localStorageInvertColors = localStorage.getItem("standardModeInvertColors") === "true";
		this.shuffle(words);
		this.setState({
			loaded: true,
			invertColors: localStorageInvertColors
		});	
		window.addEventListener("keyup", this.changeWordNumber, false);
	}

	componentWillUnmount() {
		window.removeEventListener("keyup", this.changeWordNumber, false);
	}

	shuffle = (array) => {
	    for (let i = array.length - 1; i > 0; i--) {
	        const j = Math.floor(Math.random() * (i + 1));
	        [array[i], array[j]] = [array[j], array[i]];
	    }
	    return array;
	}

	changeWordNumber = (e, direction) => {
		if(e.type === "keyup") {
			if(e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
				return;
			}
		}
		if(direction === "next" || e.key === "ArrowRight") {
			if(parseInt(this.state.actualWord, 10)+1 < parseInt(this.props.flashcard.flashcardData.Words.length, 10)) {
				this.setState({
					actualWord: this.state.actualWord+1
				});
			} 
		} else if(direction === "back" || e.key === "ArrowLeft") {
			if(parseInt(this.state.actualWord, 10)-1 >= 0) {
				this.setState({
					actualWord: this.state.actualWord-1
				});				
			}
		}
	}	

	changeScreenMode = () => {
		this.setState({
			fullScreen: !this.state.fullScreen
		});
	}

	refreshWords = () => {
		this.shuffle(this.props.flashcard.flashcardData.Words);
		this.setState({
			actualWord: 0
		});
	}

	invertColors = () => {
		localStorage.setItem("standardModeInvertColors", !this.state.invertColors);
		this.setState({
			invertColors: !this.state.invertColors
		});
	}

	render() {
		if(!this.state.loaded) {
			return null;
		}
		return (
			<div className={`standard_game_window ${this.state.fullScreen ? "standard_game_window_fullscreen" : ""} ${this.state.invertColors ? "standard_game_window_black" : "standard_game_window_white"}`}>
				<div className="standard_game_window_header">
					<div className="standard_game_window_title">
						<div className="standard_game_window_title_url">
							<span>{this.props.flashcard.flashcardData.title}</span>
							<Link to={`/flashcards/${this.props.flashcard.flashcardData.fid}`}><IoMdShareAlt/></Link>
						</div>
						<p>{this.props.lang.titles.standardLearning}</p>
					</div>
					<div className="standard_game_window_num">
						<span>{`${this.state.actualWord+1} ${this.props.lang.shorts.sthInSth} ${this.props.flashcard.flashcardData.Words.length}`}</span>
					</div>
					<div className="standard_game_window_menu">
						<div className="standard_game_window_refresh" onClick={this.refreshWords} title="Refresh game">
							<MdRefresh/>
						</div>
						<div className="standard_game_window_refresh" onClick={this.invertColors} title={`Change to ${this.state.invertColors ? "Light mode" : "Dark mode"}`}>
							<MdInvertColors/>
						</div>
						<div className="standard_game_window_help" title="Help">
							<IoIosHelpBuoy/>
						</div>
						<div className="standard_game_window_screen" onClick={this.changeScreenMode} title="Change screen mode">
							{this.state.fullScreen ? <GoScreenNormal/> : <GoScreenFull/>}
						</div>
					</div>
				</div>
				<div className="standard_game_window_body">
					<div className="standard_game_window_body_arrow" onClick={(e) => this.changeWordNumber(e, "back")}>
						<MdNavigateBefore/>
					</div>
					<SingleWordStandard word={this.props.flashcard.flashcardData.Words[this.state.actualWord]} methods={this.props.methods}/>
					<div className="standard_game_window_body_arrow" onClick={(e) => this.changeWordNumber(e, "next")}>
						<MdNavigateNext/>
					</div>
				</div>
			</div>
		);
	}
}

export default Standard;