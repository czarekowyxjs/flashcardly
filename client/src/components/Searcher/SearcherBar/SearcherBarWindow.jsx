import React, { Component } from 'react';
import SearcherBarResults from './SearcherBarResults/SearcherBarResults.jsx';

class SearcherBarWindow extends Component {
	state = {
		labelVisibility: true
	}

	componentDidMount() {
		this.searcherBarQueryRef.focus();
	}

	componentWillUnmount() {
		this.props.methods.updateQuery("");
	}

	handleQueryChange = (e) => {

		let labelVisibility = true;
		const self = this;
		const value = e.target.value;

		if(value.length > 0) labelVisibility = false;

		return this.setState({
			labelVisibility: labelVisibility
		}, () => {
			self.props.methods.updateQuery(value);
			self.props.methods.executeSearchQuery();
		});
	}

	handleSearcherBarSubmit = (e) => {
		e.preventDefault();
		this.props.methods.executeSearchQuery();
	}

	render() {
		const search = this.props.search;
		const lang = this.props.lang;
		return (
			<div className="searcher_bar_window">
				<div className="nav_drop_down_menu_traingle_wrapper">
					<div className="nav_drop_down_menu_traingle"></div>
				</div>
				<div className="searcher_bar_window_container">
					<div className="searcher_bar_window_type">
						<form className="searcher_form" onSubmit={this.handleSearcherBarSubmit}>
							<div className="searcher_input">
								<input 
									type="text" 
									id="query"
									value={search.query}
									onChange={this.handleQueryChange}
									data-name="protected"
									ref={el => this.searcherBarQueryRef = el}
								/>
								{
									this.state.labelVisibility
									? (<label htmlFor="query" data-name="protected">Type your query...</label>)
									: null
								}
							</div>
							<div className="searcher_submit" data-name="protected">
								<button data-name="protected" type="submit" className="flashcardly_btn flashcardly_btn--common" disabled={
										search.searcherBar.processing ? true : false
									}>{lang.shorts.search}</button>
							</div>
						</form>
					</div>
					<SearcherBarResults search={search}/>
				</div>
			</div>
		)
	}
}

export default SearcherBarWindow;