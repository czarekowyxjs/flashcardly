import React, { Component } from 'react';
import ChangeFlashcardTitle from './ChangeFlashcardTitle/ChangeFlashcardTitle.jsx';
import ChangeColumnsNames from './ChangeColumnsNames/ChangeColumnsNames.jsx';
import ChangeAccessStatus from './ChangeAccessStatus/ChangeAccessStatus.jsx';

class EditPanel extends Component {
	render() {
		const settings = this.props.settings;
		const flashcard = this.props.flashcard;
		const lang = this.props.lang;
		return (
			<div className="flashcard_edit_panel">
				<div className="settings_edit_table_v2">
					<div className="settings_edit_table_v2_header">
							<div className="settings_edit_table_v2_title">
								<h3>{lang.titles.primaryFlashcardSettings}</h3>
							</div>
						</div>
					<div className="settings_edit_table_v2_items">
						<ChangeFlashcardTitle methods={this.props.methods} settings={settings} lang={lang} flashcard={flashcard}/>
						<ChangeColumnsNames methods={this.props.methods} settings={settings} lang={lang} flashcard={flashcard}/>
						<ChangeAccessStatus methods={this.props.methods} settings={settings} lang={lang} flashcard={flashcard}/>
					</div>
				</div>
			</div>
		)
	}
}

export default EditPanel;