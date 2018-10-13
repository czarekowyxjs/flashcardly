import React, { Component } from 'react';
import { IoIosSearch } from "react-icons/io";
import { MdClose } from 'react-icons/md';

import './WordSearcher.css';

class WordSearcher extends Component {
	state = {
		visibility: false,
		searchValue: ""
	}

	handleSearcherClick = () => {
		this.setState({
			visibility: !this.state.visibility
		});
	}

	handleSearchChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleWordSearchSubmit = (e) => {
		if(this.state.searchValue.length > 0) {
			this.handleSearcherClick();
			this.findWord();
		}
	}

	findWord = () => {
		const words = this.props.flashcardData.flashcardData.Words;
		let idToFind = null;

		for(let i = 0;i < words.length;++i) {
			if(words[i].firstColumnValue === this.state.searchValue || words[i].secondColumnValue === this.state.searchValue) {
				idToFind = words[i].wid;
				break;
			}
		}

		if(idToFind == null) return;
		this.setState({
			searchValue: ""
		}, this.props.methods.handleFindWordSearcher(idToFind));
	}

	renderDialogSearcher = () => {
		if(!this.state.visibility) return;
		return (
			<div className="flashcardly_dialog_bg">
				<div className="flashcardly_dialog">
					<div className="flashcardly_dialog_header">
						<div className="flashcardly_dialog_title">
							<h3>Word finder</h3>
						</div>
						<div className="flashcardly_dialog_close" onClick={this.handleSearcherClick}>
							<MdClose/>
						</div>
					</div>
					<div className="flashcardly_dialog_body">
						<div className="single_flashcard_word_searcher_body">
							<input 
								type="text" 
								className="flashcardly_input"
								value={this.state.searchValue}
								onChange={this.handleSearchChange}
								name="searchValue"
							/>
							<div className="flashcardly_btn_container">
								<button type="submit" className="flashcardly_btn flashcardly_btn--common" onClick={this.handleWordSearchSubmit}>
									Find
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="single_flashcard_word_searcher_loup" title="Find word">
				{this.props.searched
					? (<div className="single_flashcard_word_searcher_bg"></div>)
					: null
				}

				<IoIosSearch onClick={this.handleSearcherClick}/>
				{this.renderDialogSearcher()}
			</div>
		);
	}
}

export default WordSearcher;