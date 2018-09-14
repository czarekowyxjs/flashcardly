import React, { Component } from 'react';
import SingleWordStandard from "./SingleWordStandard.jsx";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoMdShareAlt } from 'react-icons/io';
import { GoScreenFull, GoScreenNormal } from 'react-icons/go';

import "./Standard.css";

class Standard extends Component {
	state = {
		words: [],
		loaded: false,
		actualWord: 0,
		fullScreen: false
	}

	componentDidMount() {
		const words = this.props.flashcard.flashcardData.Words;
		this.shuffle(words);
		this.setState({
			words: words,
			loaded: true
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
			if(parseInt(this.state.actualWord, 10)+1 < parseInt(this.state.words.length, 10)) {
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

	render() {
		if(!this.state.loaded) {
			return null;
		}
		return (
			<div className={`standard_game_window ${this.state.fullScreen ? "standard_game_window_fullscreen" : ""}`}>
				<div className="standard_game_window_header">
					<div className="standard_game_window_title">
						<div className="standard_game_window_title_url">
							<span>{this.props.flashcard.flashcardData.title}</span>
							<Link to={`/flashcards/${this.props.flashcard.flashcardData.fid}`}><IoMdShareAlt/></Link>
						</div>
						<p>Standard learn mode</p>
					</div>
					<div className="standard_game_window_num">
						<span>{`${this.state.actualWord+1} in ${this.state.words.length}`}</span>
					</div>
					<div className="standard_game_window_screen" onClick={this.changeScreenMode}>
						{this.state.fullScreen ? <GoScreenNormal/> : <GoScreenFull/>}
					</div>
				</div>
				<div className="standard_game_window_body">
					<div className="standard_game_window_body_arrow" onClick={(e) => this.changeWordNumber(e, "back")}>
						<FaAngleLeft/>
					</div>
					<SingleWordStandard word={this.state.words[this.state.actualWord]}/>
					<div className="standard_game_window_body_arrow" onClick={(e) => this.changeWordNumber(e, "next")}>
						<FaAngleRight/>
					</div>
				</div>
			</div>
		);
	}
}

export default Standard;