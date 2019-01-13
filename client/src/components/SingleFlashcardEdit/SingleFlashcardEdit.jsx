import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchFlashcardSet, setFetchFlashcardLoaded, returnFlashcardToInitial, updateFlashcardSettings } from '../../actions/flashcardActions';
import { switchFlashcardEditStatus } from '../../actions/settingsActions';
import Loader from '../Commons/Loader/Loader.jsx';
import EditPanel from './EditPanel/EditPanel.jsx';

import "./SingleFlashcardEdit.css";

class SingleFlashcardEdit extends Component {
	componentDidMount() {
		this.props.returnFlashcardToInitial();
		this.props.fetchFlashcardSet(this.props.match.params.fid);
	}

	componentDidUpdate() {
		if(this.props.flashcard.fetchFlashcardLoaded) {
			document.title = this.props.flashcard.flashcardData.title+" - Settings";
		}		
	}

	handleEditOptionsToggle = (e) => {
		if(e.target.dataset.name !== this.props.settings.flashcardEdit.actualEditable) {
			return this.props.switchFlashcardEditStatus(e.target.dataset.name, false, false, true);
		}
		
		return this.props.switchFlashcardEditStatus(e.target.dataset.name, false, false, !this.props.settings.flashcardEdit.editable);
	}

	handleOptionSubmit = (e,value) => {
		e.preventDefault();
		switch(e.target.dataset.name) {
			case "title":
				return this.props.updateFlashcardSettings(this.props.flashcard.flashcardData.fid, e.target.dataset.name, value.title);
			case "columnsNames":
				return this.props.updateFlashcardSettings(this.props.flashcard.flashcardData.fid, e.target.dataset.name, value);
			default:
				return null;
		}
	}

	render() {
		const lang = this.props.user.lang;
		if(!this.props.flashcard.fetchFlashcardLoaded) {
			return <Loader message={lang.shorts.loadingFlashcard}/>;
		}
		const flashcard = this.props.flashcard;
		const settings = this.props.settings;
		const methods = {
			handleEditOptionsToggle: this.handleEditOptionsToggle,
			handleOptionSubmit: this.handleOptionSubmit
		}

		return (
			<div className="flashcards_window">
				<div className="flashcards_block">
					<div className="flashcard_edit_header">
						<div className="flashcard_edit_header_title">
							<Link to={`/flashcards/${this.props.match.params.fid}`}>
								<span>{lang.shorts.backTo} </span>
								<span>{flashcard.flashcardData.title}</span>
							</Link>
						</div>
					</div>
					<div className="flashcard_edit_header_body">
						<EditPanel methods={methods} lang={lang} flashcard={flashcard} settings={settings}/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.user,
		flashcard: state.flashcard,
		settings: state.settings
	}
}

export default connect(mapStateToProps, { fetchFlashcardSet, setFetchFlashcardLoaded, returnFlashcardToInitial, switchFlashcardEditStatus, updateFlashcardSettings })(SingleFlashcardEdit);