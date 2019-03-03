import React, { Component } from 'react';

class SelectType extends Component {
	handleSubmit = (e) => {
		e.preventDefault();

		const form = new FormData(e.target);

		console.log(form.selected);
	}

	render() {
		return (
			<div>
				<p>A czy B</p>
				<form onSubmit={this.handleSubmit}>
					<button type="submit" name="selected" value="A">A</button>
				</form>
				<form onSubmit={this.handleSubmit}>
					<button type="submit" name="selected" value="B">B</button>
				</form>
			</div>
		)
	}
}

export default SelectType;