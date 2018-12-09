import React, { Component } from 'react';
import { MdSearch } from 'react-icons/md';

import './SearcherBar.css';

class SearcherBar extends Component {
	render() {
		return (
			<div className="searcher_bar">
				<div className="searcher_bar_btn_open">
					<button>
						<i><MdSearch/></i>
					</button>
				</div>
			</div>
		)
	}
}

export default SearcherBar;