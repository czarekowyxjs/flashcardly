import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFlashcardSet, setFetchFlashcardLoaded } from '../../actions/flashcardActions';
import TableOfFlashcardWords from './TableOfFlashcardWords.jsx';
import ProcessUnixTime from '../../helpers/ProcessUnixTime.js';

import "./SingleFlashcard.css";

class SingleFlashcard extends Component {
	componentDidMount() {
		this.props.fetchFlashcardSet(this.props.match.params.fid);
	}

	componentWillUnmount() {
		this.props.setFetchFlashcardLoaded(false);
	}

	render() {
		if(!this.props.flashcard.fetchFlashcardLoaded) {
			return <p>Loading flashcard data...</p>;
		}
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
									<Link to={`/users/${this.props.flashcard.flashcardData.author._id}`}>{this.props.flashcard.flashcardData.author.social.facebook.firstName}</Link>
								</p>
							</div>
						</div>
					</div>
					<div className="single_flashcard_body">
						<TableOfFlashcardWords/>
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

export default connect(mapStateToProps, { fetchFlashcardSet, setFetchFlashcardLoaded })(SingleFlashcard);