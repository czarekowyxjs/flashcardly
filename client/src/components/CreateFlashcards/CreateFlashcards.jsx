import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PoundedLine from '../Commons/PoundedLine/PoundedLine.jsx';
import { createNewFlashcard, setCreateFlashcardLoaded } from '../../actions/flashcardActions';

class CreateFlashcards extends Component {
	state = {
		flashcardTitle: '',
		flashcardFirstCol: '',
		flashcardSecondCol: ''
	}

	componentWillUnmount() {
		this.props.setCreateFlashcardLoaded(false);
	}

	handleCreatorSubmit = (e) => {
		e.preventDefault();
		//
		this.props.createNewFlashcard({
			title: this.state.flashcardTitle,
			firstCol: this.state.flashcardFirstCol,
			secondCol: this.state.flashcardSecondCol
		});
	}

	handleCreatorChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		if(this.props.flashcard.createFlashcardLoaded) {
			return <Redirect to={`/flashcards/${this.props.flashcard.flashcardData.fid}`}/>
		}
		return (
			<div className="flashcards_window">
				<div className="flashcards_block">
					<div className="flashcards_block_header">
						<div className="flashcards_block_header_title">
							<h3>Creator of flashcards</h3>
							<div className="flashcards_block_header_description">
								<p>Welcome to the creator of flashcards. You can make new flashcards here. How long will it take? Only 30 seconds! Yes, that fast! And after made this one, you can start learning.</p>
							</div>
						</div>
					</div>
					<PoundedLine/>
					<div className="flashcards_block_body flashcards_block_body_creator">
						<div className="flashcards_block_body_form_creator">
							<form onSubmit={this.handleCreatorSubmit}>
								<div className="form_creator_field">
									<label htmlFor="flashcardTitle">Title of the set of flashcards</label>
									<input 
										type="text"
										className="flashcardly_input"
										name="flashcardTitle"
										onChange={this.handleCreatorChange}
										value={this.state.flashcardTitle}
									/>
									<p>This field must have between 2 and 28 letters.</p>
								</div>
								<div className="form_creator_field">
									<label htmlFor="flashcardFirstCol">Name of the first column</label>
									<input 
										type="text"
										className="flashcardly_input"
										name="flashcardFirstCol"
										onChange={this.handleCreatorChange}
										value={this.state.flashcardFirstCol}
									/>
									<p>This field must have between 2 and 20 letters.</p>
								</div>
								<div className="form_creator_field">
									<label htmlFor="flashcardSecondCol">Name of the second column</label>
									<input 
										type="text"
										className="flashcardly_input"
										name="flashcardSecondCol"
										onChange={this.handleCreatorChange}
										value={this.state.flashcardSecondCol}
									/>
									<p>This field must have between 2 and 20 letters.</p>
								</div>
								<div className="form_creator_field_btn">
									<button type="submit" className="flashcardly_btn flashcardly_btn--common">Confirm</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>		
		);
	}
}

const mapStateToProps = state => {
	return {
		flashcard: state.flashcard
	};
};

export default connect(mapStateToProps, { createNewFlashcard, setCreateFlashcardLoaded })(CreateFlashcards);