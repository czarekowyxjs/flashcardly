import React, { Component } from 'react';

import "./UserBar.css";

class UserBar extends Component {
	render() {
		let loaded = true;
		if(!this.props.user.social) loaded = false;
		if(!loaded) return <p>Loading...</p>;
		return (
			<div className="app_user_bar">
				<div className="app_user_bar_av">
					<img src={this.props.user.social.facebook.picture.url} alt={`${this.props.user.social.facebook.fullName}'s avatar`}/>
				</div>
				<div className="app_user_bar_basic_info">
					<p className="user_bar_basic_info--fullname">{this.props.user.social.facebook.fullName}</p>
					<p className="user_bar_basic_info--displayname">{this.props.user._id}</p>
				</div>
			</div>
		);
	}
}

export default UserBar;