import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Play from './Play/Play.jsx';

import "./GameRoom.css";

class GameRoom extends Component {
	render() {
		return (
			<div className="app_root">
				<div className="app_layout">
					<Header/>
					<div className="app_body">
						<Switch>
							<Route path="/gameroom/play" render={(props) => <Play {...props} />} />
						</Switch>
					</div>
					<Footer/>
				</div>
			</div>
		)
	}
}

export default GameRoom;