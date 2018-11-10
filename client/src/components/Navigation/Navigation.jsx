import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import UserBar from "../UserBar/UserBar.jsx";
import DropDownMenu from './DropDownMenu.jsx';

import "./Navigation.css";

class Navigation extends Component {
	state = {
		dropDownUserBarMenuVisibility: false
	}

	changeDropDownUserBarMenuVisibility = (e) => {
		this.setState({
			dropDownUserBarMenuVisibility: !this.state.dropDownUserBarMenuVisibility
		});
	}

	renderDropDownUserBarMenu = () => {
		if(!this.state.dropDownUserBarMenuVisibility) return null;
		return (
			<div className="nav_drop_down_menu">
				<div className="nav_drop_down_menu_content">
					<div className="nav_drop_down_menu_traingle_wrapper">
						<div className="nav_drop_down_menu_traingle"></div>
					</div>
					<div className="nav_drop_down_menu_menu">
						<ul onClick={this.changeDropDownUserBarMenuVisibility}>
							<li><NavLink to="#" onClick={this.props.methods.handleAvatarClick}>{this.props.lang.titles.changeYourAvatar}</NavLink></li>
							<li><NavLink to="/flashcards/create">{this.props.lang.titles.flashcardsCreator}</NavLink></li>
							<li><NavLink to="/settings/primary">{this.props.lang.nav.settings}</NavLink></li>
							<li><NavLink to="/signout">{this.props.lang.nav.logout}</NavLink></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}

	render() {
		const lang = this.props.lang;
		const methods = this.props.methods;
		methods.renderDropDownUserBarMenu = this.renderDropDownUserBarMenu;
		methods.changeDropDownUserBarMenuVisibility = this.changeDropDownUserBarMenuVisibility;
		return (
			<div className="app_nav_global">
				<nav>
					<ul className="nav_global_directly">
						<li><div className="nav_global_directly_item">
							<UserBar user={this.props.user} methods={methods}/>
						</div></li>
						<li><NavLink to="/" className="nav_global_directly_item"><span>{lang.nav.flashcards}</span></NavLink></li>
						<li><div className="nav_global_directly_item">
							<DropDownMenu methods={methods} lang={lang}/>
						</div></li>
					</ul>
				</nav>
			</div>
		);
	}
}


export default Navigation;