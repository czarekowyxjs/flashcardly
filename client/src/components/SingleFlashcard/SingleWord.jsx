import React, { Component } from 'react';
import SingleWordOptions from './SingleWordOptions.jsx';
import { IoIosCheckmark } from 'react-icons/io';

class SingleWord extends Component {
	state = {
		firstColWord: this.props.wordData.firstColumnValue,
		secondColWord: this.props.wordData.secondColumnValue
	}

	handleEditableChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleCancelEdit = () => {
		this.props.methods.handlerCancelEditWord(this.props.wordData.wid);
	}

	handleConfirmEdit = () => {
		this.props.methods.handlerEditWord(this.state.firstColWord, this.state.secondColWord, this.props.wordData.wid);
	}

	handleClickToCloseSearched = () => {
		this.props.methods.handleClickToCloseSearchedFromChildren(this.props.wordData.wid);
	}

	render() {
		return (
			<div className={`flashcard_word_table_row ${this.props.wordData.editable ? "flashcard_word_table_row--editable" : null}`} ref={this.props.provideRef} onClick={this.handleClickToCloseSearched}>
				<div className="flashcard_word_table_field flashcard_word_table_field--learned">
					<div className={`flashcard_word_table_field--learned_icon ${this.props.wordData.learned ? "flashcard_word_table_field--learned_icon--true" : "flashcard_word_table_field--learned_icon--false"}`}>
						<IoIosCheckmark/>
					</div>
				</div>
				<div className="flashcard_word_table_field">
					<span>
						{this.props.wordData.editable ?
							<input 
								type="text"
								value={this.state.firstColWord}
								onChange={this.handleEditableChange}
								name="firstColWord"
								className="flashcardly_input"
							/>
							: this.props.wordData.firstColumnValue}
					</span>
					{this.props.wordData.editable ?
						(
							<div className="word_table_editable_options">
								<button 
									className="word_table_editable_btn"
									onClick={this.handleConfirmEdit}>{this.props.lang.titles.saveChanges}</button>
								<span>{this.props.lang.shorts.or}</span>
								<button 
									className="word_table_editable_btn"
									onClick={this.handleCancelEdit}>{this.props.lang.shorts.cancel}</button>
							</div>
						) :
						null
					}
				</div>
				<div className="flashcard_word_table_field">
					<span>
						{this.props.wordData.editable ?
							<input
								type="text"
								name="secondColWord"
								value={this.state.secondColWord}
								onChange={this.handleEditableChange}
								className="flashcardly_input"
							/>
						 : this.props.wordData.secondColumnValue}
					</span>
				</div>
				<SingleWordOptions lang={this.props.lang} wordData={this.props.wordData} methods={this.props.methods}/>
			</div>
		);
	}
}

export default SingleWord;