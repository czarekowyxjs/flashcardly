import React, { Component } from 'react';

class CustomError extends Component {
	render() {
		return (
			<div>
				<p>{this.props.m}</p>
			</div>
		)
	}
}

export default CustomError;