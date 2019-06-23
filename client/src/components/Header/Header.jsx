import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserAvatar } from '../../actions/userActions';
import Navigation from '../Navigation/Navigation.jsx';
import AvatarPopUp from './AvatarPopUp/AvatarPopUp.jsx';
import Logo from './Logo.jsx';

class Header extends Component {
	state = {
		visibleAvatarPopUp: false
	}

	handleAvatarClick = () => {
		this.setState({
			visibleAvatarPopUp: !this.state.visibleAvatarPopUp
		});
	}

	handleAvatarSelect = (avName) => {
		this.props.updateUserAvatar(avName);
	}

	render() {
		const methods = {
			handleAvatarClick: this.handleAvatarClick,
			handleAvatarSelect: this.handleAvatarSelect
		}

		return (
			<div className="app_header">
				{
					this.state.visibleAvatarPopUp 
					? <AvatarPopUp lang={this.props.user.lang} user={this.props.user} methods={methods}/>
					: null
				}
				<div className="app_header_row">
					<Logo/>
					<Navigation lang={this.props.user.lang} user={this.props.user} methods={methods}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, { updateUserAvatar })(Header);