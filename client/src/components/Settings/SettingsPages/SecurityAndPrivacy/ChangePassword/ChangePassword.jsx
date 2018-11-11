import React, { Component } from 'react';
import ChangePasswordForm from './ChangePasswordForm.jsx';
import CircleLoader from '../../../../Commons/Loader/CircleLoader.jsx';

class ChangePassword extends Component {
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
					{
						settings.password.processing && !settings.password.loaded
						? <CircleLoader/>
						: <ChangePasswordForm methods={methods} user={user} settings={settings} />
					}
					</div>)
					: null
				}
			</div>
		);	
	}
}

export default ChangePassword;