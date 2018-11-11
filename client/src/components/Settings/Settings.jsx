import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import SettingsNav from './SettingsNav/SettingsNav.jsx';
import SettingsPrimary from './SettingsPages/SettingsPrimary/SettingsPrimary.jsx';
import SecurityAndPrivacy from './SettingsPages/SecurityAndPrivacy/SecurityAndPrivacy.jsx';
import { updateUserUsername, updateUserEmail, updateUserPassword, updateEmailPrivacy, updateLoginByUsername } from "../../actions/userActions";
import { settingsToInitial, switchUsernameStatus, switchEmailStatus, switchPasswordStatus } from '../../actions/settingsActions';

import './Settings.css';

class Settings extends Component {
	render() {
		const user = this.props.user;
		const settings = this.props.settings;
		const methods = {
			settingsToInitial: this.props.settingsToInitial,
			updateUserUsername: this.props.updateUserUsername,
			switchUsernameStatus: this.props.switchUsernameStatus,
			updateUserEmail: this.props.updateUserEmail,
			switchEmailStatus: this.props.switchEmailStatus,
			updateUserPassword: this.props.updateUserPassword,
			switchPasswordStatus: this.props.switchPasswordStatus,
			updateEmailPrivacy: this.props.updateEmailPrivacy,
			updateLoginByUsername: this.props.updateLoginByUsername
		};

		return (
			<div className="app_root">
				<div className="app_layout">
					<Header/>
					<div className="app_body">
						<div className="app_body_content">
							<div className="settings_wrapper">
								<div className="settings_nav_wrapper">
									<SettingsNav user={user} {...this.props}/>
								</div>
								<div className="settings_body_wrapper">
									<Switch>
										<Route path={`${this.props.match.path}/primary`} render={(props) => <SettingsPrimary {...props} user={user} methods={methods} settings={settings} />}/>
										<Route path={`${this.props.match.path}/privacy`} render={(props) => <SecurityAndPrivacy {...props} user={user} methods={methods} settings={settings} />}/>
									</Switch>
								</div>
							</div>
						</div>
					</div>
					<Footer/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.user,
		settings: state.settings
	}
}

export default connect(mapStateToProps, { settingsToInitial, updateUserUsername, switchUsernameStatus, switchEmailStatus, updateUserEmail, switchPasswordStatus, updateUserPassword, updateEmailPrivacy, updateLoginByUsername })(Settings);