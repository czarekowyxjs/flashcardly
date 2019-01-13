import React, { Component } from 'react';

class ChangeAccessStatus extends Component {
	render() {
		const flashcard = this.props.flashcard;
		const lang = this.props.lang;
		const methods = this.props.methods;

		return (
			<div className={`settings_edit_table_v2_item`}>
				<div className="settings_edit_table_v2_item--short">
					<div className="settings_edit_table_v2_item--short_desc">
						<h4>Private status</h4>
						<p>Set status of your flashcard as private.</p>
					</div>
					<div className="settings_edit_table_v2_item--short_btn settings_edit_table_v2_item--short_btn--visible">
						<label className="flashcardly_toggle_btn">
							<input type="checkbox" data-name="isPrivate" checked={flashcard.flashcardData.isPrivate} onChange={(e) => methods.handleOptionSubmit(e, !flashcard.flashcardData.isPrivate)}/>
							<span><span></span></span>
						</label>
					</div>
				</div>
			</div>
		)
	}
}

export default ChangeAccessStatus;