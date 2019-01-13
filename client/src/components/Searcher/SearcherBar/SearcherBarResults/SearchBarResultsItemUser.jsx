import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchBarResultsItemUser extends Component {
	render() {
		const user = this.props.item;
		return (
			<div className="search_bar_results_item_user">
				<Link to={`/redirect/%2Fusers%2F${user.uid}`}>
					<div className="search_bar_results_item_user_content">
						<div className="search_bar_resultes_user_username">
							<p>{user.username}</p>
						</div>
					</div>
				</Link>
			</div>
		)
	}
}

export default SearchBarResultsItemUser;