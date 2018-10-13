import React, { Component } from 'react';

import "./UserBar.css";

class UserBar extends Component {
	render() {
		let loaded = true;
		if(!this.props.user.userData.username) loaded = false;
		if(!loaded) return <p>Loading...</p>;
		return (
			<div className="app_user_bar">
				<div className="app_user_bar_av">
					<img src={`/img/avatars/${this.props.user.userData.avatarUrl || "male_av_1.png"}`} alt="Zdj" onClick={this.props.methods.handleAvatarClick}/>
				</div>
				<div className="app_user_bar_basic_info">
					<p className="user_bar_basic_info--fullname">{this.props.user.userData.username}</p>
					<p className="user_bar_basic_info--displayname">{this.props.user.userData.email}</p>
				</div>
			</div>
		);
	}
}

export default UserBar;