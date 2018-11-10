import React, { Component } from 'react';
import { IoIosMore } from 'react-icons/io';

class SingleWordOptions extends Component {
	state = {
		optionsVisibility: false
	}

	toggleOptionsVisibility = () => {
		this.setState({
			optionsVisibility: !this.state.optionsVisibility
		});		
	}

	handleWordDelete = () => {
		this.props.methods.handlerDeleteWord(this.props.wordData.wid);
		this.toggleOptionsVisibility();
	}

	handleEditableWord = () => {
		this.props.methods.handlerEditableWord(this.props.wordData.wid);
		this.toggleOptionsVisibility();
	}

	renderOptions = () => {
		const flashcard = this.props.flashcard;

		return (
			<div className="single_word_options">
				<div className="single_word_options_wrapper">
					<ul>
						{flashcard.userIsAuthor ? <li onClick={this.handleWordDelete}>{this.props.lang.titles.deleteWord}</li> : null}
						{flashcard.userIsAuthor ? <li onClick={this.handleEditableWord}>{this.props.lang.titles.editWord}</li> : null}
						{!flashcard.userIsAuthor ? <li>{this.props.lang.titles.reportWordErrorToAuthor}</li> : null}
						{!flashcard.userIsAuthor ? <li>{this.props.lang.titles.reportWordToAdmin}</li> : null}
					</ul>
				</div>
			</div>
		);
	}
	render() {
		return (
			<div className="flashcard_word_table_field--options">
				<span onClick={this.toggleOptionsVisibility}>
					<IoIosMore/>
				</span>
				{this.state.optionsVisibility ? this.renderOptions() : null}
			</div>	
		);
	}
}

export default SingleWordOptions;