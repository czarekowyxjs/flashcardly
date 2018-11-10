import React, { Component } from 'react';
import TinyLoader from "../../../Commons/Loader/TinyLoader.jsx";

class SettingsPrimary extends Component {
	state = {
		editableOption: "",
		username: this.props.user.userData.username,
		email: this.props.user.userData.email
	}

	componentDidMount() {
		const lang = this.props.user.lang;
		document.title = lang.titles.primarySettings;
	}

	handleEditableOptionToggle = (e) => {
		const dataName = e.target.dataset.name;

		switch(dataName) {
			case "username":
				return this.props.methods.switchUsernameStatus(false, false, !this.props.settings.username.editable);
			case "email":
				return this.props.methods.switchEmailStatus(false, false, !this.props.settings.email.editable);
			default:
				return;
		}
	}

	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSaveUsername = (e) => {
		if(this.state.username.length < 3 || this.state.username.length > 48) return;
		else this.props.methods.updateUserUsername(this.state.username);
	}

	handleSaveEmail = (e) => {
		if(this.state.email.length < 5 || this.state.email.length > 255) return;
		else this.props.methods.updateUserEmail(this.state.email);
	}

	render() {
		const user = this.props.user;
		const lang = user.lang;
		const settings = this.props.settings;
		return (
			<div className="settings_body">
				<div className="settings_title">
					<h3>{lang.titles.primarySettings}</h3>
				</div>
				<div className="settings_page">
					<div className="settings_edit_table">
						<div className="settings_edit_table_item">

							<span className="settings_edit_table_item--key">{lang.username}</span>
							<span className="settings_edit_table_item--value">
								{
									settings.username.editable
									? <input 
										type="text" 
										value={this.state.username} 
										name="username" 
										onChange={this.handleInputChange}
										className="settings_input"
									/>
									: user.userData.username
								}
							</span>
								{
									settings.username.editable
									? (
										settings.username.processing && !settings.username.loaded
										? 
										<div className="settings_loader_wrapper">
											<TinyLoader/>
										</div>
										:
										<div className="settings_edit_table-item--option__extended">
											<span className="settings_edit_table-item--option__extended--action" onClick={this.handleEditableOptionToggle} data-name="username">{lang.shorts.cancel}</span>
											<span className="settings_edit_table-item--option__extended--static">{lang.shorts.or}</span>
											<span className="settings_edit_table-item--option__extended--action" onClick={this.handleSaveUsername}>{lang.shorts.save}</span>
										</div>
									)
									: <span className="settings_edit_table_item--option" onClick={this.handleEditableOptionToggle} data-name="username">{lang.shorts.edit}</span>
								}
						</div>
						<div className="settings_edit_table_item">

							<span className="settings_edit_table_item--key">{lang.emailAddress}</span>
							<span className="settings_edit_table_item--value">
								{
									settings.email.editable
									? <input 
										type="text" 
										value={this.state.email} 
										name="email" 
										onChange={this.handleInputChange}
										className="settings_input"
									/>
									: user.userData.email
								}
							</span>
								{
									settings.email.editable
									? (
										settings.email.processing && !settings.email.loaded
										? 
										<div className="settings_loader_wrapper">
											<TinyLoader/>
										</div>
										:
										<div className="settings_edit_table-item--option__extended">
											<span className="settings_edit_table-item--option__extended--action" onClick={this.handleEditableOptionToggle} data-name="email">{lang.shorts.cancel}</span>
											<span className="settings_edit_table-item--option__extended--static">{lang.shorts.or}</span>
											<span className="settings_edit_table-item--option__extended--action" onClick={this.handleSaveEmail}>{lang.shorts.save}</span>
										</div>
									)
									: <span className="settings_edit_table_item--option" onClick={this.handleEditableOptionToggle} data-name="email">{lang.shorts.edit}</span>
								}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default SettingsPrimary;