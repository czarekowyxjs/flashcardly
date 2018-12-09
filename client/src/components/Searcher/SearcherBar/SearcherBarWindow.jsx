import React, { Component } from 'react';
import { IoIosClose } from 'react-icons/io';

class SearcherBarWindow extends Component {
	state = {
		labelVisibility: true
	}

	componentDidMount() {
		let labelVisibility = false;
		if(this.props.search.query.length === 0) labelVisibility = true;
		this.setState({
			labelVisibility: labelVisibility
		});
	}

	handleQueryChange = (e) => {
		let labelVisibility = false;
		if(e.target.value.length === 0) labelVisibility = true;
		this.setState({
			labelVisibility: labelVisibility
		});
		this.props.methods.updateQuery(e.target.value);
	}

	handleSearcherSubmit = (e) => {
		e.preventDefault();
		this.props.methods.handleSearchSubmit();
	}

	render() {
		const search = this.props.search;
		const methods = this.props.methods;
		return (
			<div className="searcher_bar_window">
				<div className="searcher_bar_header">
					<div className="searcher_bar_header_close_btn" onClick={methods.handleSearchVisibility}>
						<IoIosClose/>
					</div>
				</div>
				<div className="searcher_bar_form">
					<form onSubmit={this.handleSearcherSubmit}>
						<input
							type="text"
							value={search.query}
							onChange={this.handleQueryChange}
							id="query"
						/>
						{
							this.state.labelVisibility
							? (<label htmlFor="query">Type your query...</label>)
							: null
						}
					</form>
				</div>
			</div>
		)
	}
}

export default SearcherBarWindow;