import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getManyFlashcards, clearOwnFlashcards } from '../../actions/flashcardActions';
import PlusCircleBtn from '../Commons/PlusBtn/PlusCircleBtn.jsx';
import SingleFlashcardPreview from '../SingleFlashcardPreview/SingleFlashcardPreview.jsx';
import TinyLoader from '../Commons/Loader/TinyLoader.jsx';

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
					<div className="flashcards_block_header">
						{
							this.props.user.screen.width <= 800 
							? null 
							: (<div className="flashcards_block_add_btn">
								<Link to="/flashcards/create">
									<PlusCircleBtn onClick={this.goToFlashcardCreator}/>
								</Link>
							</div>)
						}
						<div className="flashcards_block_header_title">
							<h3>{lang.titles.yourFlashcards}</h3>
						</div>
					</div>
					<div className="flashcards_block_body">
						{
							this.props.user.screen.width <= 800 
							?(<div className="flashcards_add_flashcard_body_btn">
								<Link to="/flashcards/create" className="flashcardly_btn flashcardly_btn--light-blue">
									<span>{lang.contents.createNewSetOfFlashcards}</span>
								</Link>
							</div>)
							: null
						}
						<div className="flashcards_block_previews">
							{this.props.user.ownFlashcards.length > 0 ? this.renderFlashcardPreviews() : (this.props.user.ownFlashcardsLoaded ? <p>{lang.contents.emptyFlashcards}</p> : null)}
							{this.props.user.ownFlashcardsLoaded ? null : <TinyLoader/>}
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