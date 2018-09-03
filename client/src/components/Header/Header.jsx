import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserBar from '../UserBar/UserBar.jsx';
import Navigation from '../Navigation/Navigation.jsx';

class Header extends Component {
	render() {
		return (
			<div className="app_header">
				<UserBar user={this.props.user.userData}/>
				<Navigation/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps)(Header);