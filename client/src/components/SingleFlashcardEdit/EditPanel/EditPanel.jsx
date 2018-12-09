import React, { Component } from 'react';
import ChangeFlashcardTitle from './ChangeFlashcardTitle/ChangeFlashcardTitle.jsx';

class EditPanel extends Component {
	handleEditableOptionsToggle = (e) => {
		const dataName = e.target.dataset.name;
		switch(dataName) {
			case "flashcardTitle":
				return this.props.methods.switchFlashcardTitleStatus(false, false, !this.props.settings.flashcardTitle.editable);
			default:
				return;
		}
	}

	render() {
		let methods = this.props.methods;
		methods.handleEditableOptionsToggle = this.handleEditableOptionsToggle;
		return (
			<div className="flashcard_edit_panel">
				<div className="settings_edit_table_v2">
					<div className="settings_edit_table_v2_title">
						<h3>Table</h3>
					</div>
					<div className="settings_edit_table_v2_items">
						<ChangeFlashcardTitle methods={methods} settings={this.props.settings} flashcard={this.props.flashcard} lang={this.props.lang}/>
					</div>
				</div>
			</div>
		)
	}
}

export default EditPanel;