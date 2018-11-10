import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './SettingsNav.css';

class SettingsNav extends Component {
	render() {
		const lang = this.props.user.lang;
		return (
			<div className="settings_nav">
				<ul>
					<li className="settings_nav_item"><NavLink activeClassName="settings_nav_item--active" to={`${this.props.match.path}/primary`}>{lang.nav.primary}</NavLink></li>
					<li className="settings_nav_item"><NavLink activeClassName="settings_nav_item--active" to={`${this.props.match.path}/privacy`}>{lang.nav.securityAndPrivacy}</NavLink></li>
					<li className="settings_nav_item"><NavLink activeClassName="settings_nav_item--active" to={`${this.props.match.path}/sessions`}>{lang.nav.sessions}</NavLink></li>
					<li className="settings_nav_item"><NavLink activeClassName="settings_nav_item--active" to={`${this.props.match.path}/delete`}>{lang.nav.deleteAccount}</NavLink></li>
				</ul>
			</div>
		)
	}
}

export default SettingsNav;