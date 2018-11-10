import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { loginByLocalData } from '../../actions/authActions';
import Footer from '../Footer/Footer.jsx';

import "./Auth.css";

class Login extends Component {
	state = {
		email: "",
		password: ""
	}

	componentDidMount() {
		document.title = this.props.user.lang.titles.loginTitle;
	}

	handleFormLoginChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleLoginFormSubmit = (e) => {
		e.preventDefault();

		this.props.loginByLocalData(this.state.email, this.state.password);
	}

	render() {
		const lang = this.props.user.lang;
		//
		if(this.props.user.isLoggedIn) {
			return <Redirect to="/"/>;
		}
		return (
			<div className="app_root">
				<div className="app_login">
					<div className="login_wrapper">
						<div className="login_header">
							<h2>{lang.titles.loginTitle}</h2>
						</div>
						<div className="login_body">
							<form onSubmit={this.handleLoginFormSubmit}>
								<label htmlFor="email">{lang.emailAddressOrUsername}</label>
								<input
									type="text"
									id="email"
									value={this.state.email}
									name="email"
									onChange={this.handleFormLoginChange}
									className="flashcardly_input"
								/> 
								<label htmlFor="password">{lang.password}</label>
								<input
									type="password"
									id="password"
									value={this.state.password}
									name="password"
									onChange={this.handleFormLoginChange}
									className="flashcardly_input"
								/>
								<div className="login_body_footer">
									<div className="login_redirect_info">
										<span>{lang.contents.loginFooterInfo.content}</span>
										<Link to="/signup">{lang.contents.loginFooterInfo.registerURL}</Link>
									</div>
									<div className="flashcardly_btn_container">
										<button className="flashcardly_btn flashcardly_btn--common">
											{lang.buttons.login}
										</button>
									</div>
								</div>
							</form>
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

export default connect(mapStateToProps, { loginByLocalData })(Login);