import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdSearch } from 'react-icons/md';
import SearcherBarWindow from './SearcherBarWindow.jsx';
import { updateQuery, setSearcherVisibility, executeSearchQuery } from '../../../actions/searchActions';

import './SearcherBar.css';

class SearcherBar extends Component {
	handleSearchVisibility = () => {
		this.props.setSearcherVisibility(!this.props.search.searcherVisibility);
	}

	handleSearchSubmit = () => {
		this.props.executeSearchQuery();
	}

	render() {
		const search = this.props.search;
		const methods = {
			updateQuery: this.props.updateQuery,
			handleSearchVisibility: this.handleSearchVisibility,
			handleSearchSubmit: this.handleSearchSubmit
		};

		return (
			<div className="searcher_bar">
				<div className="searcher_bar_btn_open">
					<button onClick={this.handleSearchVisibility}>
						<i><MdSearch/></i>
					</button>
				</div>
				{
					search.searcherVisibility
					? <SearcherBarWindow methods={methods} search={this.props.search}/>
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

export default connect(mapStateToProps, { updateQuery, setSearcherVisibility, executeSearchQuery })(SearcherBar);