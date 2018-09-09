import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFlashcardSet, setFetchFlashcardLoaded, addNewWordToSet, returnFlashcardToInitial, deleteWord, setWordAsEditable, setWordAsNotEditable, editWord } from '../../actions/flashcardActions';
import TableOfFlashcardWords from './TableOfFlashcardWords.jsx';
import ProcessUnixTime from '../../helpers/ProcessUnixTime.js';

import "./SingleFlashcard.css";

class SingleFlashcard extends Component {
	componentDidMount() {
		this.props.fetchFlashcardSet(this.props.match.params.fid);
	}

	componentWillUnmount() {
		this.props.returnFlashcardToInitial();
	}

	handlerAddNewWord = (firstColWord, secondColWord) => {
		this.props.addNewWordToSet(firstColWord, secondColWord, this.props.flashcard.flashcardData.fid);
	}

	handlerDeleteWord = (wid) => {
		this.props.deleteWord(wid);
	}

	handlerEditableWord = (wid) => {
		this.props.setWordAsEditable(wid);
	}

	handlerCancelEditWord = wid => {
		this.props.setWordAsNotEditable(wid);
	}

	handlerEditWord = (firstColWord, secondColWord, wid) => {
		this.props.editWord(firstColWord, secondColWord, wid);
	}

	render() {
		if(!this.props.flashcard.fetchFlashcardLoaded) {
			return <p>Loading flashcard data...</p>;
		}
		const methods = {
			handlerAddNewWord: this.handlerAddNewWord,
			handlerDeleteWord: this.handlerDeleteWord,
			handlerEditableWord: this.handlerEditableWord,
			handlerCancelEditWord: this.handlerCancelEditWord,
			handlerEditWord: this.handlerEditWord
		};
		return (
			<div className="flashcards_window">
				<div className="flashcards_block">
					<div className="single_flashcard_header">
						<div className="single_flashcard_header_title">
							<div className="flashcard_header_title_direct">
								<h3>{this.props.flashcard.flashcardData.title}</h3>
							</div>
							<div className="flashcard_header_title_user">
								<p>
									<span>Created</span>
									<time>{ProcessUnixTime(this.props.flashcard.flashcardData.createdAt)}</time> 
									<span>by</span>
									<Link to={`/users/${this.props.flashcard.authorData.uid}`}>{this.props.flashcard.authorData.Facebook.firstName}</Link>
								</p>
							</div>
						</div>
					</div>
					<div className="single_flashcard_body">
						<TableOfFlashcardWords flashcard={this.props.flashcard} methods={methods}/>
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

export default connect(mapStateToProps, { fetchFlashcardSet, setFetchFlashcardLoaded, addNewWordToSet, returnFlashcardToInitial, deleteWord, setWordAsEditable, setWordAsNotEditable, editWord })(SingleFlashcard);