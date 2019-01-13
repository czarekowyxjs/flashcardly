import React, { Component } from 'react';
import ChangeFlashcardTitleExtended from './ChangeFlashcardTitleExtended.jsx';

class ChangeFlashcardTitle extends Component {
	render() {
		const settings = this.props.settings;
		const flashcard = this.props.flashcard;
		const lang = this.props.lang;
		const methods = this.props.methods;
		return (
			<div className={`settings_edit_table_v2_item ${settings.flashcardEdit.actualEditable === "title" && settings.flashcardEdit.editable ? "settings_edit_table_v2_item--active" : null}`}>
				<div className="settings_edit_table_v2_item--short">
					<div className="settings_edit_table_v2_item--short_desc">
						<h4>{lang.titles.changeFlashcardTitle}</h4>
						<p>{lang.contents.changeFlashcardTitleDesc}</p>
					</div>
					<div className="settings_edit_table_v2_item--short_btn">
						<button className="flashcardly_url_btn" data-name="title" onClick={methods.handleEditOptionsToggle}>
							{
								settings.flashcardEdit.actualEditable === "title" && settings.flashcardEdit.editable
								? lang.shorts.cancel
								: lang.shorts.edit 
							}
						</button>
					</div>
				</div>
				{
					settings.flashcardEdit.actualEditable === "title" && settings.flashcardEdit.editable
					? <ChangeFlashcardTitleExtended lang={lang} flashcard={flashcard} settings={settings} methods={methods}/>
					: null
				}
			</div>
		)
	}
}

export default ChangeFlashcardTitle;