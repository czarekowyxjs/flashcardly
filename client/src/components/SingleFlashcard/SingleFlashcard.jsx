import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiSettings, FiTrash } from 'react-icons/fi';
import { fetchFlashcardSet, setFetchFlashcardLoaded, addNewWordToSet, returnFlashcardToInitial, deleteWord, setWordAsEditable, setWordAsNotEditable, editWord } from '../../actions/flashcardActions';
import { confirmFlashcardIntroduce } from '../../actions/userActions';
import TableOfFlashcardWords from './TableOfFlashcardWords.jsx';
import GamePreviews from './GamePreviews.jsx';
import ProcessUnixTime from '../../helpers/ProcessUnixTime.js';
import CustomError from '../CustomError/CustomError.jsx';
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
		const lang = this.props.user.lang;
		if(this.props.flashcard.error.status) {
			return <CustomError h={this.props.flashcard.error.h} m={this.props.flashcard.error.m}/>
		}
		//
		if(!this.props.flashcard.fetchFlashcardLoaded) {
			return <Loader message={lang.shorts.loadingFlashcard}/>;
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
				{!this.props.user.userData.User_option.flashcardIntro
					? <Introduce user={this.props.user} methods={methods}/>
					: null}
				<div className="flashcards_block">
					<div className="single_flashcard_header">
						<div className="single_flashcard_header_title">
							<div className="flashcard_header_title_direct">
								<h3>{this.props.flashcard.flashcardData.title}</h3>
							</div>
							<div className="flashcard_header_title_user">
								<p>
									<span>{lang.shorts.created}</span>
									<time>{ProcessUnixTime(this.props.flashcard.flashcardData.createdAt, lang)}</time> 
									<span>{lang.shorts.by}</span>
									<Link to={`/users/${this.props.flashcard.authorData.uid}`}>{this.props.flashcard.authorData.username}</Link>
								</p>
							</div>
						</div>
						{
							this.props.flashcard.userIsAuthor 
							?(<div className="single_flashcard_options">
							<Link to={`${this.props.location.pathname}/settings`} className="single_flashcard_options_item">
								<FiSettings/>
							</Link>
							<Link to="/" className="single_flashcard_options_item">
								<FiTrash/>
							</Link>
						</div>)
							: null
						}
					</div>
					<div className="single_flashcard_body">
						<GamePreviews lang={lang} {...this.props}/>
						<TableOfFlashcardWords lang={lang} flashcard={this.props.flashcard} methods={methods}/>
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