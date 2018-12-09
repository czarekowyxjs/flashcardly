import React, { Component } from 'react';
import { MdClose } from 'react-icons/md';

import "./LanguageSelect.css";

class LanguageSelect extends Component {
	state = {
		langSelectVisibility: false,
		languages: [{
			id: 0,
			name: 'Polski'
		}, {
			id: 1,
			name: 'English'
		}]
	}

	handleLangVisibility = (e) => {
		this.setState({
			langSelectVisibility: !this.state.langSelectVisibility
		});
	}

	handleSelectLang = (e) => {
		const langID = e.target.dataset.id;
		localStorage.setItem("lang", langID);
		window.location.reload();
	}

	renderLanguages = () => {
		const langs = this.state.languages;
		const actualLang = parseInt(localStorage.getItem("lang"), 10);

		return langs.map((key, index) => {
			return (
				<div key={key.id} className={`lang_select_lang ${actualLang === key.id ? "lang_select_lang--actual" : null}`}>
					<span data-id={key.id} onClick={this.handleSelectLang}>{key.name}</span>
				</div>
			);
		});
	}

	renderLangSelectWindow = () => {
		if(!this.state.langSelectVisibility) return null;
		return (
			<div className="flashcardly_dialog_bg">
				<div className="flashcardly_dialog">
					<div className="flashcardly_dialog_header">
						<div className="flashcardly_dialog_title">
							<h3>{this.props.lang.titles.language}</h3>
						</div>
						<div className="flashcardly_dialog_close" onClick={this.handleLangVisibility}>
							<MdClose/>
						</div>
					</div>
					<div className="flashcardly_dialog_body">
						<div className="lang_select_dialog_body">
							<div className="lang_select_dialog_langs">
								{this.renderLanguages()}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="lang_select_wrapper">
				<div className="lang_select_wrapper_title">
					<span onClick={this.handleLangVisibility}>{this.props.lang.titles.language}</span>
				</div>
				{this.renderLangSelectWindow()}
			</div>
		)
	}
}

export default LanguageSelect;