import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { GoTasklist } from 'react-icons/go';
import { FaInbox } from 'react-icons/fa';

import "./Navigation.css";

class Navigation extends Component {
	render() {
		return (
			<div className="app_nav_global">
				<nav>
					<ul className="nav_global_directly">
						<li><NavLink to="/"><span>FLashcards</span></NavLink></li>
						<li><NavLink to="/inbox"><i><FaInbox/></i></NavLink></li>
						<li><NavLink to="/tasks"><i><GoTasklist/></i></NavLink></li>
					</ul>
				</nav>
			</div>
		);
	}
}


export default Navigation;