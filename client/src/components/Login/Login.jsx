import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { signInWithFacebook } from '../../actions/authActions';
import Footer from '../Footer/Footer.jsx';

import "./Login.css";

class Login extends Component {
	loginByFacebook = () => {
		this.props.signInWithFacebook();
	}

	render() {
		if(this.props.user.isLoggedIn) {
			return <Redirect to="/"/>;
		}
		return (
			<div className="app_root">
				<div className="app_login">
					<div className="login_wrapper">
						<div className="login_header">
							<h2>Log in to Flashcardly</h2>
						</div>
						<div className="login_body">
							<div className="login_body_item login_body_item--fb" onClick={this.loginByFacebook}>
								<i><img src="/img/fb-square-icon.svg" alt="Facebook's logo"/></i>
								<p>Continue with facebook</p>
							</div>
						</div>
						<div className="login_footer">
							<div className="login_footer_rights">
								<p>
									<span>By continuing, you agree our</span>
									<Link to="/terms">Terms</Link>
									<span> and you consent to the processing of personal data. Check how we collect and use your data in our</span>
									<Link to="/privacy">Privacy Policy</Link>
									<span>.</span>
								</p>
							</div>
						</div>
					</div>
					<Footer/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, { signInWithFacebook })(Login);