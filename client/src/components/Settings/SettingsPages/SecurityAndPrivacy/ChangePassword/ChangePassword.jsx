import React, { Component } from 'react';

class ChangePassword extends Component {
	state = {
		currentPassword: "",
		newPassword: "",
		newPasswordRepeat: ""
	}

	handleInputEdit = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		const user = this.props.user;
		const lang = user.lang;
		const settings = this.props.settings;
		const methods = this.props.methods;
		return (
			<div className={`settings_edit_table_v2_item ${settings.password.editable ? "settings_edit_table_v2_item--active" : null}`}>
				<div className="settings_edit_table_v2_item--short">
					<div className="settings_edit_table_v2_item--short_desc">
						<h4>{lang.titles.changePassword}</h4>
						<p>{lang.contents.changePasswordDesc}</p>
					</div>
					<div className="settings_edit_table_v2_item--short_btn">
						<button className="flashcardly_url_btn" data-name="password" onClick={methods.handleEditableOptionToggle}>
							{
								settings.password.editable
								? lang.shorts.cancel
								: lang.shorts.edit
							}
						</button>
					</div>
				</div>
				{
					settings.password.editable
					? (<div className="settings_edit_table_v2_item--extended">
						<div className="settings_edit_table_v2_item--extended_form">
							<form onSubmit={(e) => methods.handlePasswordSubmit(e, this.state)}>
								<div className="settings_edit_table_v2_item--extended_form_item">
									<label htmlFor="currentPassword">{lang.shorts.currentPassword}</label>
									<input 
										type="text" 
										className="settings_input"
										name="currentPassword"
										value={this.state.currentPassword}
										onChange={this.handleInputEdit}
									/>
								</div>
								<div className="settings_edit_table_v2_item--extended_form_item">
									<label htmlFor="newPassword">{lang.shorts.newPassword}</label>
									<input 
										type="text" 
										className="settings_input"
										name="newPassword"
										value={this.state.newPassword}
										onChange={this.handleInputEdit}
									/>
								</div>
								<div className="settings_edit_table_v2_item--extended_form_item">
									<label htmlFor="newPasswordRepeat">{lang.shorts.newPasswordRepeat}</label>
									<input 
										type="text" 
										className="settings_input"
										name="newPasswordRepeat"
										value={this.state.newPasswordRepeat}
										onChange={this.handleInputEdit}
									/>
								</div>
								<div className="settings_edit_table_v2_item--extended_form_item flashcardly_btn_container">
									<button type="submit" className="flashcardly_btn flashcardly_btn--common">
										{lang.buttons.confirm}
									</button>
								</div>											
							</form>
						</div>
					</div>)
					: null
				}
			</div>
		);	
	}
}

export default ChangePassword;