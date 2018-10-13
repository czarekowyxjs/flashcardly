import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirmEmailAddress } from '../../actions/authActions';
import Footer from '../Footer/Footer.jsx';

import "./ConfirmEmail.css";

class ConfirmEmail extends Component {
	componentDidMount() {
		this.props.confirmEmailAddress(this.props.match.params.hash);
	}

	render() {
		if(this.props.user.confirmEmailLoaded) {
			return (
				<div className="app_root">
					<div className="app_full_center">
						<div className="flashcardly_dialog">
							<div className="flashcardly_dialog_header">
								<div className="flashcardly_dialog_title">
									<h3>{this.props.user.confirmEmailError
										? "Failed to confirm email address"
										: "Successfully confirmed email address"
									}</h3>
								</div>
							</div>
							<div className="flashcardly_dialog_body">
								<div className="flashcardly_btn_container">
									<a href={`${this.props.user.confirmEmailError ? "/signup" : "/signin"}`} className="flashcardly_btn flashcardly_btn--common">
										{this.props.user.confirmEmailError
											? "Sign Up"
											: "Log In"
										}
									</a>
								</div>
							</div>
						</div>
						<Footer/>
					</div>
				</div>
			);
		}
		return null;
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, { confirmEmailAddress })(ConfirmEmail);