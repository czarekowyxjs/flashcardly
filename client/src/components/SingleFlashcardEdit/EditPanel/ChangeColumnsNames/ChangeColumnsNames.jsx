import React, { Component } from 'react';
import ChangeColumnsNamesExtended from './ChangeColumnsNamesExtended.jsx';

class ChangeColumnsNames extends Component {
	render() {
		const settings = this.props.settings;
		const flashcard = this.props.flashcard;
		const lang = this.props.lang;
		const methods = this.props.methods;
		return (
			<div className={`settings_edit_table_v2_item ${settings.flashcardEdit.actualEditable === "columnsNames" && settings.flashcardEdit.editable ? "settings_edit_table_v2_item--active" : null}`}>
				<div className="settings_edit_table_v2_item--short">
					<div className="settings_edit_table_v2_item--short_desc">
						<h4>{lang.titles.changeColumnsNames}</h4>
						<p>{lang.contents.changeColumnsNamesDesc}</p>
					</div>
					<div className="settings_edit_table_v2_item--short_btn">
						<button className="flashcardly_url_btn" data-name="columnsNames" onClick={methods.handleEditOptionsToggle}>
							{
								settings.flashcardEdit.actualEditable === "columnsNames" && settings.flashcardEdit.editable
								? lang.shorts.cancel
								: lang.shorts.edit 
							}
						</button>
					</div>
				</div>
				{
					settings.flashcardEdit.actualEditable === "columnsNames" && settings.flashcardEdit.editable
					? <ChangeColumnsNamesExtended lang={lang} flashcard={flashcard} settings={settings} methods={methods}/>
					: null
				}
			</div>
		)
	}
}

export default ChangeColumnsNames;