import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./Footer.css";

class Footer extends Component {
	render() {
		return (
			<div className="flashcardly_footer">
				<div className="flashcardly_footer_content">
					<div className="flashcardly_footer_nav">
						<ul>
							<li><Link to="/">Flashcardly</Link></li>
							<li><Link to="/privacy">Privacy</Link></li>
							<li><Link to="/cookies">Cookies</Link></li>
						</ul>
					</div>
					<div className="flashcardly_footer_info">
						<a href="https://github.com/czarekowyxjs" rel="noopener noreferrer" target="_BLANK">Cezary Góralski</a>
						<span> &copy; 2018</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;