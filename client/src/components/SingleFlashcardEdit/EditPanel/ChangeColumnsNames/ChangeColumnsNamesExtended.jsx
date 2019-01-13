import React, { Component } from 'react';
import CircleLoader from '../../../Commons/Loader/CircleLoader.jsx';

class ChangeColumnsNamesExtended extends Component {
	state = {
		firstColumnName: "",
		secondColumnName: ""
	}

	componentDidMount() {
		this.setState({
			firstColumnName: this.props.flashcard.flashcardData.firstColumnName,
			secondColumnName: this.props.flashcard.flashcardData.secondColumnName
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
								<form data-name="columnsNames" onSubmit={(e) => methods.handleOptionSubmit(e, this.state)}>
									<div className="settings_edit_table_v2_item--extended_form_item">
										<label htmlFor="firstColumnName">{lang.titles.nameFirstColumn}</label>
										<input 
											type="text" 
											className="flashcardly_modest_input settings_input"
											name="firstColumnName"
											value={this.state.firstColumnName}
											onChange={this.handleInputEdit}
										/>
									</div>
									<div className="settings_edit_table_v2_item--extended_form_item">
										<label htmlFor="secondColumnName">{lang.titles.nameSecondColumn}</label>
										<input 
											type="text" 
											className="flashcardly_modest_input settings_input"
											name="secondColumnName"
											value={this.state.secondColumnName}
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

export default ChangeColumnsNamesExtended;