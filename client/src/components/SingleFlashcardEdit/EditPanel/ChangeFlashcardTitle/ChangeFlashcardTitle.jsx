import React, { Component } from 'react';
import CircleLoader from '../../../Commons/Loader/CircleLoader.jsx';

class ChangeFlashcardTitle extends Component {
	render() {
		const settings = this.props.settings;
		const flashcard = this.props.flashcard;
		const lang = this.props.lang;
		return (
			<div className={`settings_edit_table_v2_item ${settings.flashcardTitle.editable ? "settings_edit_table_v2_item--active" : null}`}>
				<div className="settings_edit_table_v2_item--short">
					<div className="settings_edit_table_v2_item--short_desc">
						<h4>Flashcard title</h4>
						<p>Title of your set of flashcards should refer to content of this one.</p>
					</div>
					<div className="settings_edit_table_v2_item--short_btn">
						<button className="flashcardly_url_btn" data-name="flashcardTitle" onClick={this.props.methods.handleEditableOptionsToggle}>
							{
								settings.flashcardTitle.editable
								? lang.shorts.cancel
								: lang.shorts.edit
							}
						</button>
					</div>
				</div>
				{
					settings.flashcardTitle.editable
					? (<div className="settings_edit_table_v2_item--extended">
					{
						settings.flashcardTitle.processing && !settings.flashcardTitle.loaded
						? <CircleLoader/>
						: "xd"
					}
					</div>)
					: null
				}
			</div>
		)
	}
}

export default ChangeFlashcardTitle;