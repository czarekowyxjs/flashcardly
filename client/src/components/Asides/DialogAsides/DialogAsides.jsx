import React, { Component } from 'react';
import DialogAsideTerms from "./DialogAsideTerms.jsx";

import "./DialogAsides.css";

class DialogAsides extends Component {
	render() {
		return null;
		if(this.props.user.userData.common.User_option.termsAccept) {
			return null;
		}
		return (
			<div className="flashcardly_dialog_aside">
				<div className="flashcardly_dialog_aside_wrapper">
					{this.props.user.userData.common.User_option.termsAccept
						? null
						: null 
					}
				</div>
			</div>
		);
	}
}

export default DialogAsides;