import React, { Component } from 'react';

class CircleLoader extends Component {
	render() {
		const light = this.props.light || false;
		return (
			<div className="flashcardly_circle_loader">
				<div className={`flashcardly_circle_loader_spin flashcardly_circle_loader_spin--${light ? "light" : "dark"}`}></div>
			</div>
		)
	}
}

export default CircleLoader;