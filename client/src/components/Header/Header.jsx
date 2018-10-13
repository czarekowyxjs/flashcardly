import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserAvatar } from '../../actions/userActions';
import UserBar from '../UserBar/UserBar.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import TopAsides from '../Asides/TopAsides/TopAsides.jsx';
import AvatarPopUp from './AvatarPopUp/AvatarPopUp.jsx';

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
					? <AvatarPopUp user={this.props.user} methods={methods}/>
					: null
				}
				<div className="app_header_row">
					<UserBar user={this.props.user} methods={methods}/>
					<Navigation/>
				</div>
				<div className="app_header_row">
					<TopAsides/>
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