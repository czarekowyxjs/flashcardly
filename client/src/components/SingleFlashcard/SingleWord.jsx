import React, { Component } from 'react';
import SingleWordOptions from './SingleWordOptions.jsx';

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

	render() {
		return (
			<div className={`flashcard_word_table_row ${this.props.wordData.editable ? "flashcard_word_table_row--editable" : null}`}>
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
									onClick={this.handleConfirmEdit}>Save your changes</button>
								<span>or</span>
								<button 
									className="word_table_editable_btn"
									onClick={this.handleCancelEdit}>Cancel</button>
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
				<SingleWordOptions wordData={this.props.wordData} methods={this.props.methods}/>
			</div>
		);
	}
}

export default SingleWord;