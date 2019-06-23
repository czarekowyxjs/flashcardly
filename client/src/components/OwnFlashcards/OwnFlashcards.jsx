import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getManyFlashcards, clearOwnFlashcards } from '../../actions/flashcardActions';
import SingleFlashcardPreview from '../SingleFlashcardPreview/SingleFlashcardPreview.jsx';
import FullAbsoluteLoader from '../Commons/Loader/FullAbsoluteLoader.jsx';
import FlashcardAddBtn from '../Commons/FlashcardAddBtn/FlashcardAddBtn.jsx';

class OwnFlashcards extends Component {
	componentDidMount() {
		this.props.getManyFlashcards();
		document.title = "Flashcardly";
	}

	componentWillUnmount() {
		this.props.clearOwnFlashcards();
	}

	handleLoadMorePreviews = () => {
		this.props.getManyFlashcards();
	}

	renderFlashcardPreviews = () => {
		const ownFlashcards = this.props.user.ownFlashcards;
		return ownFlashcards.map((key, index) => {
			return <SingleFlashcardPreview lang={this.props.user.lang} key={key.fid} flashcard={key}/>
		});
	}

	render() {
		const lang = this.props.user.lang;
		return (
			<div className="flashcards_window">
				<div className="flashcards_block">
					{this.props.user.ownFlashcardsLoaded ? null : <FullAbsoluteLoader/>}
					<div className="flashcards_block_header">
						<div className="flashcards_block_header_title">
							<h3>{lang.titles.yourFlashcards}</h3>
						</div>
					</div>
					<div className="flashcards_block_body">
						<div className="flashcards_block_previews">
							<FlashcardAddBtn/>
							{this.props.user.ownFlashcards.length > 0 ? this.renderFlashcardPreviews() : null}
						</div>
						{
							this.props.user.ownFlashcardsIsMore
							? (<div className="flashcards_block_load_previews">
								<button onClick={this.handleLoadMorePreviews}>{lang.buttons.showMore}</button>
								</div>)
							: null
						}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, { getManyFlashcards, clearOwnFlashcards })(OwnFlashcards);