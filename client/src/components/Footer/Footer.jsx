import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LanguageSelect from '../LanguageSelect/LanguageSelect.jsx';

import "./Footer.css";

class Footer extends Component {
	render() {
		const lang = this.props.user.lang;
		return (
			<div className="flashcardly_footer">
				<div className="flashcardly_footer_content">
					<div className="flashcardly_footer_nav">
						<ul>
							<li><Link to="/">Flashcardly</Link></li>
							<li><Link to="/privacy">{lang.nav.privacy}</Link></li>
							<li><Link to="/cookies">{lang.nav.cookies}</Link></li>
							<div className="flashcardly_footer_lang">
								<LanguageSelect lang={lang}/>
							</div>
						</ul>
					</div>
					<div className="flashcardly_footer_info">
						<a href="https://github.com/czarekowyxjs" rel="noopener noreferrer" target="_BLANK">Cezary Góralski</a>
						<span> &copy; 2019</span>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(Footer);