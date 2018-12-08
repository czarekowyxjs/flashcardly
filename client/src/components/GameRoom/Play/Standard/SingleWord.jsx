import React, { Component } from 'react';

class SingleWord extends Component {
	render() {
		return (
			<div className="standard_game_word_wrapper">
				<div className="standard_game_word">
					<span onClick={this.props.methods.reverseCard}>{this.props.firstColumn ? this.props.word.firstColumnValue : this.props.word.secondColumnValue}</span>
				</div>
			</div>
		)
	}
}

export default SingleWord;