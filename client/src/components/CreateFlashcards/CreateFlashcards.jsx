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

	componentDidMount() {
		document.title = "Flashcards creator - Flashacrdly";
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
		const lang = this.props.user.lang;
		if(this.props.flashcard.createFlashcardLoaded) {
			return <Redirect to={`/flashcards/${this.props.flashcard.flashcardData.fid}`}/>
		}
		return (
			<div className="flashcards_window">
				<div className="flashcards_block">
					<div className="flashcards_block_header">
						<div className="flashcards_block_header_title">
							<h3>{lang.titles.flashcardsCreator}</h3>
							<div className="flashcards_block_header_description">
								<p>{lang.contents.flashcardsCreatorDesc}</p>
							</div>
						</div>
					</div>
					<PoundedLine/>
					<div className="flashcards_block_body flashcards_block_body_creator">
						<div className="flashcards_block_body_form_creator">
							<form onSubmit={this.handleCreatorSubmit}>
								<div className="form_creator_field">
									<label htmlFor="flashcardTitle">{lang.titles.flashcardsSetTitle}</label>
									<input 
										type="text"
										className="flashcardly_input"
										name="flashcardTitle"
										onChange={this.handleCreatorChange}
										value={this.state.flashcardTitle}
									/>
									<p>{lang.contents.flashcardsTitleDesc}</p>
								</div>
								<div className="form_creator_field">
									<label htmlFor="flashcardFirstCol">{lang.titles.nameFirstColumn}</label>
									<input 
										type="text"
										className="flashcardly_input"
										name="flashcardFirstCol"
										onChange={this.handleCreatorChange}
										value={this.state.flashcardFirstCol}
									/>
									<p>{lang.contents.nameColumnDesc}</p>
								</div>
								<div className="form_creator_field">
									<label htmlFor="flashcardSecondCol">{lang.titles.nameSecondColumn}</label>
									<input 
										type="text"
										className="flashcardly_input"
										name="flashcardSecondCol"
										onChange={this.handleCreatorChange}
										value={this.state.flashcardSecondCol}
									/>
									<p>{lang.contents.nameColumnDesc}</p>
								</div>
								<div className="form_creator_field_btn">
									<button type="submit" className="flashcardly_btn flashcardly_btn--common">{lang.buttons.confirm}</button>
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
		user: state.user,
		flashcard: state.flashcard
	};
};

export default connect(mapStateToProps, { createNewFlashcard, setCreateFlashcardLoaded })(CreateFlashcards);