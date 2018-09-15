import React, { Component } from 'react';

import "./Loader.css";

class TinyLoader extends Component {
	render() {
		return (
			<div className="flashcardly_tiny_loader">
				<div className="flashcardly_tiny_anim">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		);
	}
}

export default TinyLoader;