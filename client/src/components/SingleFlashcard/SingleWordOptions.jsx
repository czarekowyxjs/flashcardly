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
		return (
			<div className="single_word_options">
				<div className="single_word_options_wrapper">
					<ul>
						<li onClick={this.handleWordDelete}>Delete(permanently)</li>
						<li onClick={this.handleEditableWord}>Edit this word</li>
					</ul>
				</div>
			</div>
		);
	}
	render() {
		return (
			<div className="flashcard_word_table_field--options">
				<span onClick={this.toggleOptionsVisibility}><IoIosMore/></span>
				{this.state.optionsVisibility ? this.renderOptions() : null}
			</div>	
		);
	}
}

export default SingleWordOptions;