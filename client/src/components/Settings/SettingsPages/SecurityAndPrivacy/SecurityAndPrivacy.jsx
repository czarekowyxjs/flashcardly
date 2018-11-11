import React, { Component } from 'react';
import ChangePassword from './ChangePassword/ChangePassword.jsx';
import EmailPrivacy from './EmailPrivacy/EmailPrivacy.jsx';
import LoginByUsername from './LoginByUsername/LoginByUsername.jsx';

class SecurityAndPrivacy extends Component {
	componentDidMount() {
		const lang = this.props.user.lang;
		document.title = lang.nav.securityAndPrivacy;
		this.props.methods.settingsToInitial();
	}

	handleEditableOptionToggle = (e) => {
		const dataName = e.target.dataset.name;

		switch(dataName) {
			case "password":
				return this.props.methods.switchPasswordStatus(false, false, !this.props.settings.password.editable);
			case "email":
				return this.props.methods.switchEmailPrivacyStatus(false, false, !this.props.settings.emailPrivacy.editable);
			default:
				return;
		}
	}

	handlePasswordSubmit = (e, form) => {
		e.preventDefault();
		if(this.props.settings.password.processing) return;
		this.props.methods.updateUserPassword(form.currentPassword, form.newPassword, form.newPasswordRepeat);
	}

	render() {
		const user = this.props.user;
		const lang = user.lang;
		const settings = this.props.settings;
		let methods = this.props.methods;
		methods.handleEditableOptionToggle = this.handleEditableOptionToggle;
		methods.handlePasswordSubmit = this.handlePasswordSubmit;
		return (
			<div className="settings_body">
				<div className="settings_title">
					<h3>{lang.nav.securityAndPrivacy}</h3>
				</div>
				<div className="settings_page">
					<div className="settings_edit_table_v2">
						<div className="settings_edit_table_v2_title">
							<h3>{lang.shorts.login}</h3>
						</div>
						<div className="settings_edit_table_v2_items">
							<ChangePassword user={user} settings={settings} methods={methods} />
							<LoginByUsername user={user} settings={settings} methods={methods} />
						</div>
					</div>
					<div className="settings_edit_table_v2">
						<div className="settings_edit_table_v2_title">
							<h3>{lang.titles.privacy}</h3>
						</div>
						<div className="settings_edit_table_v2_items">
							<EmailPrivacy user={user} settings={settings} methods={methods} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default SecurityAndPrivacy;