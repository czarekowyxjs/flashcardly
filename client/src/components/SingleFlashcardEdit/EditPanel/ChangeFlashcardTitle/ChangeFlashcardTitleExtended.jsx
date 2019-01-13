import React, { Component } from 'react';
import CircleLoader from '../../../Commons/Loader/CircleLoader.jsx';

class ChangeFlashcardTitleExtended extends Component {
	state = {
		title: ""
	}

	componentDidMount() {
		this.setState({
			title: this.props.flashcard.flashcardData.title
		});
	}

	handleInputEdit = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		const settings = this.props.settings;
		const lang = this.props.lang;
		const methods = this.props.methods;
		return (
			<div className="settings_edit_table_v2_item--extended">
				{
					settings.flashcardEdit.processing && !settings.flashcardEdit.loaded
					? <CircleLoader/>
					: 
						(
							<div className="settings_edit_table_v2_item--extended_form">
								<form data-name="title" onSubmit={(e) => methods.handleOptionSubmit(e, this.state)}>
									<div className="settings_edit_table_v2_item--extended_form_item">
										<label htmlFor="title">{lang.titles.newFlashcardTitle}</label>
										<input 
											type="text" 
											className="flashcardly_modest_input settings_input"
											name="title"
											value={this.state.title}
											onChange={this.handleInputEdit}
										/>
									</div>
									<div className="settings_edit_table_v2_item--extended_form_item flashcardly_btn_container">
										<button type="submit" className="flashcardly_btn flashcardly_btn--common">
											{ lang.buttons.confirm }
										</button>
									</div>												
								</form>
							</div>
						)
				}
			</div>
		)
	}
}

export default ChangeFlashcardTitleExtended;