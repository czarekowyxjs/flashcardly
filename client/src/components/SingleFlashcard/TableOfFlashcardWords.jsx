import React, { Component } from 'react';
import SingleWord from './SingleWord.jsx';
import AddWordForm from './AddWordForm.jsx';
import AddWordLoader from './AddWordLoader.jsx';

import "./TableOfFlashcardWords.css";

class TableOfFlashcardWords extends Component {
	constructor(props) {
		super(props);

		this.tableHeaderRef = React.createRef();
	}

	state = {
		searched: false
	}

	renderTableItems = array => {
		return array.map((word, index) => {
			this['wid'+word.wid] = React.createRef();
			return <SingleWord key={word.wid} lang={this.props.lang} provideRef={this['wid'+word.wid]} wordData={word} methods={this.props.methods}/>
		});
	}

	handleFindWordSearcher = (idToFind) => {
		this['wid'+idToFind].current.style.zIndex = 20;
		this.setState({
			searched: true
		}, window.scrollTo(0, this['wid'+idToFind].current.offsetTop-(this.tableHeaderRef.current.offsetHeight*2)));
	}

	handleClickToCloseSearchedFromChildren = (wid) => {
		this['wid'+wid].current.style.zIndex = "";
		this.setState({
			searched: false
		});
	}

	render() {
		const flashcard = this.props.flashcard;

		this.props.methods.handleFindWordSearcher = this.handleFindWordSearcher;
		this.props.methods.handleClickToCloseSearchedFromChildren = this.handleClickToCloseSearchedFromChildren;

		return (
			<div className="single_flashcard_words_table">
				<div className="flashcard_word_table_row flashcard_word_table_row--header" ref={this.tableHeaderRef}>
					<div className="flashcard_word_table_field flashcard_word_table_field--learned">
					</div>
					<div className="flashcard_word_table_field">
						<span>{flashcard.flashcardData.firstColumnName}</span>
					</div>
					<div className="flashcard_word_table_field">
						<span>{flashcard.flashcardData.secondColumnName}</span>
					</div>
					<div className="flashcard_word_table_field--options">
						<span>xd</span>
					</div>
				</div>
				<AddWordForm lang={this.props.lang} methods={this.props.methods} flashcard={flashcard} searched={this.state.searched}/>
				{this.renderTableItems(flashcard.flashcardData.Words)}
				{!flashcard.addWordLoaded
					? <AddWordLoader/> 
					: null
					}
			</div>
		);
	}
}

export default TableOfFlashcardWords;