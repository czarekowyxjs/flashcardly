import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getManyFlashcards, clearOwnFlashcards } from '../../actions/flashcardActions';
import PlusCircleBtn from '../Commons/PlusBtn/PlusCircleBtn.jsx';
import SingleFlashcardPreview from '../SingleFlashcardPreview/SingleFlashcardPreview.jsx';

class OwnFlashcards extends Component {
	componentDidMount() {
		this.props.getManyFlashcards();
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
			return <SingleFlashcardPreview key={key.fid} flashcard={key}/>
		});
	}

	render() {
		return (
			<div className="flashcards_window">
				<div className="flashcards_block">
					<div className="flashcards_block_header">
						<div className="flashcards_block_add_btn">
							<Link to="/flashcards/create">
								<PlusCircleBtn onClick={this.goToFlashcardCreator}/>
							</Link>
						</div>
						<div className="flashcards_block_header_title">
							<h3>Your flashcards</h3>
						</div>
					</div>
					<div className="flashcards_block_body">
						<div className="flashcards_block_previews">
							{this.props.user.ownFlashcards.length > 0 ? this.renderFlashcardPreviews() : <p>You don't have any flashcards yet</p>}
						</div>
						<div className="flashcards_block_load_previews">
							<button onClick={this.handleLoadMorePreviews}>Load more</button>
						</div>
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