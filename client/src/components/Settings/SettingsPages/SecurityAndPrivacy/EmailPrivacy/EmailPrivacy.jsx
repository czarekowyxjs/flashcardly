import React, { Component } from 'react';

class EmailPrivacy extends Component {
	handleCheckboxChange = (e) => {
		if(this.props.settings.emailPrivacy.processing && !this.props.settings.emailPrivacy.loaded) return;

		this.props.methods.updateEmailPrivacy();
	}

	render() {
		const user = this.props.user;
		const lang = user.lang;
		const settings = this.props.settings;
		return (
			<div className={`settings_edit_table_v2_item ${settings.emailPrivacy.editable ? "settings_edit_table_v2_item--active" : null}`}>
				<div className="settings_edit_table_v2_item--short">
					<div className="settings_edit_table_v2_item--short_desc">
						<h4>{lang.titles.emailPrivacy}</h4>
						<p>{lang.contents.emailPrivacyDesc}</p>
					</div>
					<div className="settings_edit_table_v2_item--short_btn settings_edit_table_v2_item--short_btn--visible">
						<label className="flashcardly_toggle_btn">
							<input type="checkbox" checked={user.userData.User_option.emailVisibility} onChange={this.handleCheckboxChange}/>
							<span><span></span></span>
						</label>
					</div>
				</div>
			</div>
		)
	}
}

export default EmailPrivacy;