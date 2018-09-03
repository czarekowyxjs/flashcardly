import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoginStatusFB } from '../actions/authActions';

export const RequireAuth = (Component, type) => {
	class RequireAuthComponent extends React.Component {
		componentDidMount() {
			this.getLoginStatusFB();
		}

		getLoginStatusFB = () => {
			this.props.getLoginStatusFB();
		}

		render() {
			if(!this.props.user.authLoaded) {
				return <p>We are checking your account</p>;
			}
			if(type === "Protect") {
				if(!this.props.user.isLoggedIn) {
					return <Redirect to="/signin"/>;
				} else {
					return <Component {...this.props}/>;
				}
			} else if(type === "Common") {
				if(this.props.user.isLoggedIn) {
					return <Redirect to="/"/>;
				} else {
					return <Component {...this.props}/>;
				}				
			}
		}
	}

	const mapStateToProps = state => {
		return {
			user: state.user
		};
	};

	return connect(mapStateToProps, { getLoginStatusFB })(RequireAuthComponent);
};