import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Play from './Play.jsx';


class GameRoomWrapper extends Component {
	render() {
		return (
			<div className="app_root">
				<div className="app_layout">
					<Header/>
					<div className="app_body">
						<div className="app_body_content">
							<Switch>
								<Route path={`${this.props.match.path}/play`} component={Play}/>
							</Switch>
						</div>
					</div>
				</div>
			</div>	
		);
	}
}


export default GameRoomWrapper;