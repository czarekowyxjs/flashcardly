import React, { Component } from 'react';
import DialogAsideSexAvatar from "./DialogAsideSexAvatar.jsx";

import "./DialogAsides.css";

class DialogAsides extends Component {
	render() {
		if(!this.props.user.userData.User_option.setAvatar) {
			return <DialogAsideSexAvatar user={this.props.user}/>;
		}
	}
}

export default DialogAsides;