import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import ProcessUnixTime from '../../helpers/ProcessUnixTime.js';

class SingleFlashcardHeader extends Component {
	render() {
		const lang = this.props.user.lang;
		return (
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
				</div>)
					: null
				}
			</div>
		)
	}
}

export default SingleFlashcardHeader;