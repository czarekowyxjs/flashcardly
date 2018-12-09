import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import CreateFlashcards from '../CreateFlashcards/CreateFlashcards.jsx';
import SingleFlashcard from '../SingleFlashcard/SingleFlashcard.jsx';
import OwnFlashcards from '../OwnFlashcards/OwnFlashcards.jsx';
import SingleFlashcardEdit from '../SingleFlashcardEdit/SingleFlashcardEdit.jsx';

import "./Flashcards.css";

class Flashcards extends Component {
	render() {
		return (
			<div className="app_root">
				<div className="app_layout">
					<Header/>
					<div className="app_body">
						<div className="app_body_content">
							<Switch>
								<Route path={`${this.props.match.path}`} render={(props) => <OwnFlashcards {...props}/>} exact={true}/>
								<Route path={`${this.props.match.path}/create`} render={(props) => <CreateFlashcards {...props}/>}/>
								<Route path={`${this.props.match.path}/:fid`} render={(props) => <SingleFlashcard {...props}/>} exact={true}/>
								<Route path={`${this.props.match.path}/:fid/settings`} render={(props) => <SingleFlashcardEdit {...props}/>}/>
							</Switch>
						</div>
					</div>
					<Footer/>
				</div>
			</div>			
		);
	}
}

export default Flashcards;