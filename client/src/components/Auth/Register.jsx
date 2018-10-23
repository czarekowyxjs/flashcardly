import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { registerByLocalData } from '../../actions/authActions';
import Footer from '../Footer/Footer.jsx';
import TinyLoader from '../Commons/Loader/TinyLoader.jsx';

import "./Auth.css";

class Register extends Component {
	state = {
		username: "",
		email: "",
		password: "",
		password2: ""
	}

	componentDidMount() {
		document.title = this.props.user.lang.titles.registerTitle;
	}

	handleFormLoginChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleLoginFormSubmit = (e) => {
		e.preventDefault();

		this.props.registerByLocalData(this.state.username, this.state.email, this.state.password, this.state.password2);
	}

	render() {
		const lang = this.props.user.lang;
		if(this.props.user.isLoggedIn) {
			return <Redirect to="/"/>;
		}
		return (
			<div className="app_root">
				<div className="app_login">
					<div className="login_wrapper">
						<div className="login_header">
							<h2>{lang.titles.registerTitle}</h2>
						</div>
						<div className="login_body">
							{
								!this.props.user.register.loaded && this.props.user.register.processing
								? <TinyLoader/>
								: (this.props.user.register.loaded && !this.props.user.register.error
									?	<p>Confirm your email address</p>
									: (<form onSubmit={this.handleLoginFormSubmit}>
										<label htmlFor="username">{lang.username}</label>
										<input
											type="text"
											id="username"
											value={this.state.username}
											name="username"
											onChange={this.handleFormLoginChange}
											className="flashcardly_input"
										/> 
										<p>{lang.contents.registerUsernameDesc}</p>
										<label htmlFor="email">{lang.emailAddress}</label>
										<input
											type="text"
											id="email"
											value={this.state.email}
											name="email"
											onChange={this.handleFormLoginChange}
											className="flashcardly_input"
										/> 
										<p>{lang.contents.registerEmailDesc}</p>
										<label htmlFor="password">{lang.password}</label>
										<input
											type="password"
											id="password"
											value={this.state.password}
											name="password"
											onChange={this.handleFormLoginChange}
											className="flashcardly_input"
										/>
										<p>{lang.contents.registerPasswordDesc}</p>
										<label htmlFor="password2">{lang.repeatPassword}</label>
										<input
											type="password"
											id="password2"
											value={this.state.password2}
											name="password2"
											onChange={this.handleFormLoginChange}
											className="flashcardly_input"
										/>
										<div className="login_body_footer">
											<div className="login_redirect_info">
												<span>{lang.contents.registerFooterInfo.content}</span>
												<Link to="/signin">{lang.contents.registerFooterInfo.loginURL}</Link>
											</div>
											<div className="flashcardly_btn_container">
												<button className="flashcardly_btn flashcardly_btn--common">
													{lang.buttons.register}
												</button>
											</div>
										</div>
									</form>))
							}
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

export default connect(mapStateToProps, { registerByLocalData })(Register);