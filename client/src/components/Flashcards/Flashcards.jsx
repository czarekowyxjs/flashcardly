import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import CreateFlashcards from '../CreateFlashcards/CreateFlashcards.jsx';
import SingleFlashcard from '../SingleFlashcard/SingleFlashcard.jsx';
import OwnFlashcards from '../OwnFlashcards/OwnFlashcards.jsx';

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
								<Route path={`${this.props.match.path}/:fid`} render={(props) => <SingleFlashcard {...props}/>}/>
							</Switch>
						</div>
					</div>
				</div>
			</div>			
		);
	}
}

export default Flashcards;