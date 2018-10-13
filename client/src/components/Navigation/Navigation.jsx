import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {  MdPlaylistAddCheck } from 'react-icons/md';

import "./Navigation.css";

class Navigation extends Component {
	render() {
		return (
			<div className="app_nav_global">
				<nav>
					<ul className="nav_global_directly">
						<li><NavLink to="/"><span>FLashcards</span></NavLink></li>
						<li><NavLink to="/tasks"><i><MdPlaylistAddCheck/></i></NavLink></li>
						<li><NavLink to="/signout"><span>Logout</span></NavLink></li>
					</ul>
				</nav>
			</div>
		);
	}
}


export default Navigation;