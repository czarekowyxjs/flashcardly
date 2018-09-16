import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserBar from '../UserBar/UserBar.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import TopAsides from '../Asides/TopAsides/TopAsides.jsx';

class Header extends Component {
	render() {
		return (
			<div className="app_header">
				<div className="app_header_row">
					<UserBar user={this.props.user.userData}/>
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

export default connect(mapStateToProps)(Header);