import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logoutLocal } from '../../actions/authActions';

class Logout extends Component {
	componentDidMount() {
		this.props.logoutLocal();
	}

	render() {
		if(!this.props.user.isLoggedIn) {
			return <Redirect to="/signin"/>;
		}
		return null;
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, { logoutLocal })(Logout);