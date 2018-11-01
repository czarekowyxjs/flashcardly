import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserScreenParameters } from '../actions/userActions';
import { localAuth, localAuthReverse } from '../actions/authActions';
import Loader from '../components/Commons/Loader/Loader.jsx';

export const RequireAuth = (Component) => {
	class RequireAuthComponent extends React.Component {
		constructor(props) {
			super(props)

			this.props.getUserScreenParameters();
		}

		componentDidMount() {
			this.props.localAuth();
		}

		render() {
			const lang = this.props.user.lang;
			if(!this.props.user.auth.loaded && this.props.user.userData.username && this.props.user.auth.processing) {
				return <Component {...this.props}/>;
			}
			if(!this.props.user.auth.loaded) {
				return <Loader message={lang.shorts.loadingAccountData}/>;
			}
			if(!this.props.user.isLoggedIn) {
				return <Redirect to="/signin"/>;
			} else {
				return <Component {...this.props}/>;
			}
		}
	}

	const mapStateToProps = state => {
		return {
			user: state.user
		};
	};

	return connect(mapStateToProps, { getUserScreenParameters, localAuth })(RequireAuthComponent);
};

export const RequireAuthReverse = (Component) => {
	class RequireAuthReverseComponent extends React.Component {
		componentDidMount() {
			this.props.localAuthReverse();
		}

		render() {
			const lang = this.props.user.lang;
			if(!this.props.user.auth.loaded && this.props.user.auth.processing) {
				return <Component {...this.props}/>;
			}
			if(!this.props.user.auth.loaded) {
				return <Loader message={lang.shorts.loading}/>;
			}
			if(this.props.user.auth.loaded && !this.props.user.isLoggedIn) {
				return <Component {...this.props}/>;
			} else {
				return <Redirect to="/"/>;
			}
		}
	}

	const mapStateToProps = state => {
		return {
			user: state.user
		}
	}

	return connect(mapStateToProps, { localAuthReverse })(RequireAuthReverseComponent);
}