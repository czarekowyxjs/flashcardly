import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {  MdPlaylistAddCheck } from 'react-icons/md';

import "./Navigation.css";

class Navigation extends Component {
	render() {
		const lang = this.props.lang;
		return (
			<div className="app_nav_global">
				<nav>
					<ul className="nav_global_directly">
						<li><NavLink to="/"><span>{lang.nav.flashcards}</span></NavLink></li>
						<li><NavLink to="/tasks"><i><MdPlaylistAddCheck/></i></NavLink></li>
						<li><NavLink to="/signout"><span>{lang.nav.logout}</span></NavLink></li>
					</ul>
				</nav>
			</div>
		);
	}
}


export default Navigation;