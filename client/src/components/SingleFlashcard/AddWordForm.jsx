import React, { Component } from 'react';
import { IoIosAdd } from "react-icons/io";
import WordSearcher from './WordSearcher.jsx';

import "./AddWordForm.css";

class AddWordForm extends Component {
	state = {
		firstColWord: '',
		secondColWord: ''
	}

	addNewWord = () => {
		if(!this.props.flashcard.addWordLoaded) {
			return;
		}
		this.props.methods.handlerAddNewWord(this.state.firstColWord, this.state.secondColWord);
		if(!this.props.flashcard.addWordError.error) {
			this.setState({
				firstColWord: '',
				secondColWord: ''
			}, () => this.firstColWordRef.focus());
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleKeyPress = e => {
		if(e.key === "Enter") {
			if(e.target.name === "firstColWord") {
				this.secondColWordRef.focus();
			} else if(e.target.name === "secondColWord") {
				this.addNewWord();
			}
		}
	}

	render() {
		if(!this.props.flashcard.userIsAuthor) return null;
		return (
			<div className={`flashcard_word_table_row flashcard_word_table_row--add`}>
				<div className="flashcard_word_table_field flashcard_word_table_field--learned">
					<WordSearcher lang={this.props.lang} flashcardData={this.props.flashcard} methods={this.props.methods} searched={this.props.searched}/>
				</div>
				<div className="flashcard_word_table_field">
					<span>
						<input
							type="text"
							value={this.state.firstColWord}
							name="firstColWord"
							onChange={this.handleChange}
							className="flashcardly_input"
							ref={el => this.firstColWordRef = el}
							onKeyPress={this.handleKeyPress}
						/>
					</span>
				</div>
				<div className="flashcard_word_table_field">
					<span>
						<input
							type="text"
							value={this.state.secondColWord}
							name="secondColWord"
							onChange={this.handleChange}
							className="flashcardly_input"
							ref={el => this.secondColWordRef = el}
							onKeyPress={this.handleKeyPress}
						/>
					</span>
				</div>
				<div className="flashcard_word_table_field--options">
					<span><IoIosAdd onClick={this.addNewWord}/></span>
				</div>
			</div>
		);
	}
}

export default AddWordForm;