import React, { Component } from 'react';

import "./Loader.css";

class Loader extends Component {
	render() {
		return (
			<div className="flashcardly_loader">
				<div className="flashcardly_loader_anim">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<p>{this.props.message}</p>
			</div>
		);
	}
}

export default Loader;