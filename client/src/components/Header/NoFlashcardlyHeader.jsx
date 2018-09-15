import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./NoFlashcardlyHeader.css";

class NoFlashcardlyHeader extends Component {
	render() {
		return (
			<div className="app_header">
				<div className="app_header--noflashcardly">
					<div className="app_header--noflashcardly_bar">
						<div className="app_header--noflashcardly_return">
							<Link to="/">Return to flashcardly</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default NoFlashcardlyHeader;