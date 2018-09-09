import React, { Component } from 'react';

import "./UserBar.css";

class UserBar extends Component {
	render() {
		let loaded = true;
		if(!this.props.user.fb) loaded = false;
		if(!loaded) return <p>Loading...</p>;
		return (
			<div className="app_user_bar">
				<div className="app_user_bar_av">
					<img src={this.props.user.fb.pictureURL} alt={`${this.props.user.fb.firstName+" "+this.props.user.fb.lastName}'s avatar`}/>
				</div>
				<div className="app_user_bar_basic_info">
					<p className="user_bar_basic_info--fullname">{this.props.user.fb.firstName+" "+this.props.user.fb.lastName}</p>
					<p className="user_bar_basic_info--displayname">{this.props.user.common.displayName}</p>
				</div>
			</div>
		);
	}
}

export default UserBar;