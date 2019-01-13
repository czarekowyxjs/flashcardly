import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdSearch } from 'react-icons/md';
import SearcherBarWindow from './SearcherBarWindow.jsx';
import { updateQuery, updateSearcherBar, executeSearchQuery } from '../../../actions/searchActions';

import './SearcherBar.css';

class SearcherBar extends Component {
	state = {
		searcherVisibility: false
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.handleSearchVisibility, false);
	}

	handleSearchVisibility = (e) => {
		if(e.target.dataset.name === "protected") return;

		this.setState(prevState => ({
			searcherVisibility: !prevState.searcherVisibility
		}), () => {
			if(this.state.searcherVisibility) {
				document.addEventListener("click", this.handleSearchVisibility, false);
			} else {
				document.removeEventListener("click", this.handleSearchVisibility, false);
			}
		});
	}

	render() {
		const search = this.props.search;
		const methods = {
			updateQuery: this.props.updateQuery,
			executeSearchQuery: this.props.executeSearchQuery
		};
		return (
			<div className="searcher_bar">
				<div className={`searcher_bar_btn_open ${this.state.searcherVisibility ? "searcher_bar_btn_open--active" : null}`}>
					<button onClick={this.handleSearchVisibility}>
						<i><MdSearch/></i>
					</button>
				</div>
				{
					this.state.searcherVisibility
					? <SearcherBarWindow methods={methods} lang={this.props.user.lang} search={search}/>
					: null
				}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.user,
		search: state.search
	}
};

export default connect(mapStateToProps, { updateQuery, updateSearcherBar, executeSearchQuery })(SearcherBar);