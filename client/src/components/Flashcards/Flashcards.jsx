import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import CircleLoader from '../Commons/Loader/CircleLoader.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import OwnFlashcards from '../OwnFlashcards/OwnFlashcards.jsx';

import "./Flashcards.css";

const SingleFlashcardEdit = lazy(() => import("../SingleFlashcardEdit/SingleFlashcardEdit.jsx"));
const CreateFlashcards = lazy(() => import("../CreateFlashcards/CreateFlashcards.jsx"));
const SingleFlashcard = lazy(() => import("../SingleFlashcard/SingleFlashcard.jsx"));

class Flashcards extends Component {
	render() {
		return (
			<div className="app_root">
				<div className="app_layout">
					<Header/>
					<div className="app_body">
						<div className="app_body_content">
							<Suspense fallback={<CircleLoader/>}>
								<Switch>
									<Route path={`${this.props.match.path}`} render={(props) => <OwnFlashcards {...props}/>} exact={true}/>
									<Route path={`${this.props.match.path}/create`} render={(props) => <CreateFlashcards {...props}/>}/>
									<Route path={`${this.props.match.path}/:fid`} render={(props) => <SingleFlashcard {...props}/>} exact={true}/>
									<Route path={`${this.props.match.path}/:fid/settings`} render={(props) => <SingleFlashcardEdit {...props}/>}/>
								</Switch>
							</Suspense>
						</div>
					</div>
					<Footer/>
				</div>
			</div>			
		);
	}
}

export default Flashcards;