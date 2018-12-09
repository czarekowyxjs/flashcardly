import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import UserBar from "../UserBar/UserBar.jsx";
import DropDownMenu from './DropDownMenu.jsx';
import SearcherBar from '../Searcher/SearcherBar/SearcherBar.jsx';

import "./Navigation.css";

class Navigation extends Component {
	state = {
		dropDownUserBarMenuVisibility: false
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.changeDropDownUserBarMenuVisibility, false);
	}

	changeDropDownUserBarMenuVisibility = () => {
		this.setState(prevState => ({
			dropDownUserBarMenuVisibility: !prevState.dropDownUserBarMenuVisibility
		}), () => {
			if(this.state.dropDownUserBarMenuVisibility) {
				document.addEventListener("click", this.changeDropDownUserBarMenuVisibility, false);
			} else {
				document.removeEventListener("click", this.changeDropDownUserBarMenuVisibility, false);
			}
		});
	}

	renderDropDownUserBarMenu = () => {
		if(!this.state.dropDownUserBarMenuVisibility) return null;
		const user = this.props.user;
		const lang = this.props.lang;
		return (
			<div className="nav_drop_down_menu">
				<div className="nav_drop_down_menu_content">
					<div className="nav_drop_down_menu_traingle_wrapper">
						<div className="nav_drop_down_menu_traingle"></div>
					</div>
					<div className="nav_drop_down_menu_menu">
						<ul>
							{
								user.screen.width <= 600 
								? (<li><NavLink to="/">{lang.nav.flashcards}</NavLink></li>)
								: null
							}
							<li><NavLink to="#" onClick={this.props.methods.handleAvatarClick}>{lang.titles.changeYourAvatar}</NavLink></li>
							<li><NavLink to="/flashcards/create">{lang.titles.flashcardsCreator}</NavLink></li>
							<li><NavLink to="/settings/primary">{lang.nav.settings}</NavLink></li>
							<li><NavLink to="/signout">{lang.nav.logout}</NavLink></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}

	render() {
		const lang = this.props.lang;
		const user = this.props.user;
		const methods = this.props.methods;
		methods.renderDropDownUserBarMenu = this.renderDropDownUserBarMenu;
		methods.changeDropDownUserBarMenuVisibility = this.changeDropDownUserBarMenuVisibility;
		return (
			<div className="app_nav_global">
				<nav>
					<ul className="nav_global_directly">
						<li className="nav_global_directly_hr"><div className="nav_global_directly_item nav_global_directly_item--hov1">
							<UserBar user={this.props.user} methods={methods}/>
						</div></li>
						{
							user.screen.width > 600 
							? (<li className="nav_global_directly_hr"><NavLink to="/" className="nav_global_directly_item nav_global_directly_item--hov1"><span>{lang.nav.flashcards}</span></NavLink></li>)
							: null
						}
						<li><div className="nav_global_directly_item">
							<SearcherBar lang={lang}/>
						</div></li>
						<li><div className="nav_global_directly_item nav_global_directly_item--col">
							<DropDownMenu visibility={this.state.dropDownUserBarMenuVisibility} methods={methods} lang={lang}/>
						</div></li>
					</ul>
				</nav>
			</div>
		);
	}
}


export default Navigation;