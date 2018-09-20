import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFlashcardSet, setFetchFlashcardLoaded, addNewWordToSet, returnFlashcardToInitial, deleteWord, setWordAsEditable, setWordAsNotEditable, editWord } from '../../actions/flashcardActions';
import { confirmFlashcardIntroduce } from '../../actions/userActions';
import TableOfFlashcardWords from './TableOfFlashcardWords.jsx';
import GamePreviews from './GamePreviews.jsx';
import ProcessUnixTime from '../../helpers/ProcessUnixTime.js';
import Loader from '../Commons/Loader/Loader.jsx';
import Introduce from './Introduce.jsx';

import "./SingleFlashcard.css";

class SingleFlashcard extends Component {
	componentDidMount() {
		this.props.returnFlashcardToInitial();
		this.props.fetchFlashcardSet(this.props.match.params.fid);
	}

	componentDidUpdate() {
		if(this.props.flashcard.fetchFlashcardLoaded) {
			document.title = this.props.flashcard.flashcardData.title;
		}		
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

	confirmIntroduce = () => {
		this.props.confirmFlashcardIntroduce();
	}

	render() {
		if(!this.props.flashcard.fetchFlashcardLoaded) {
			return <Loader message="Loading flashcard data"/>;
		}
		const methods = {
			handlerAddNewWord: this.handlerAddNewWord,
			handlerDeleteWord: this.handlerDeleteWord,
			handlerEditableWord: this.handlerEditableWord,
			handlerCancelEditWord: this.handlerCancelEditWord,
			handlerEditWord: this.handlerEditWord,
			confirmIntroduce: this.confirmIntroduce
		};
		return (
			<div className="flashcards_window">
				{!this.props.user.userData.common.User_option.flashcardIntro
					? <Introduce methods={methods}/>
					: null}
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
						<GamePreviews {...this.props}/>
						<TableOfFlashcardWords flashcard={this.props.flashcard} methods={methods}/>
					</div>
				</div>
			</div>	
		);
	}
}

const mapStateToProps = state => {
	return {
		flashcard: state.flashcard,
		user: state.user
	};
};

export default connect(mapStateToProps, { fetchFlashcardSet, setFetchFlashcardLoaded, addNewWordToSet, returnFlashcardToInitial, deleteWord, setWordAsEditable, setWordAsNotEditable, editWord, confirmFlashcardIntroduce })(SingleFlashcard);