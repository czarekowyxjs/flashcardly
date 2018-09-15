import React, { Component } from 'react';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import OwnFlashcards from '../OwnFlashcards/OwnFlashcards.jsx';

import "./Dashboard.css";

class Dashboard extends Component {
	componentDidMount() {
		document.title = "Flashcardly - dashboard";
	}

	render() {
		return (
			<div className="app_root">
				<div className="app_layout">
					<Header/>
					<div className="app_body">
						<div className="app_body_content">
							<OwnFlashcards/>
						</div>
					</div>
					<Footer/>
				</div>
			</div>
		);
	}
}

export default Dashboard;