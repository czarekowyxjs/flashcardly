import React, { Component } from 'react';
import TinyLoader from '../Commons/Loader/TinyLoader.jsx';

class AddWordLoader extends Component {
	render() {
		return (
			<div className="flashcard_word_table_row">
				<div className="flashcard_word_table_field flashcard_word_table_field--loader">
					<span>
						<TinyLoader/>
					</span>
				</div>
				<div className="flashcard_word_table_field--options">
					<span></span>
				</div>
			</div>
		);
	}
}

export default AddWordLoader;