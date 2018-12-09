import React, { Component } from 'react';
import { IoIosSync } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';

class SingleWord extends Component {
	handleToggleCheckWord = () => {
		this.props.methods.toggleCheckWordLearned(this.props.word.wid);
	}

	render() {
		return (
			<div className="standard_game_word_wrapper">
				<div className="standard_game_word">
					<span onClick={this.props.methods.reverseCard}>{this.props.firstColumn ? this.props.word.firstColumnValue : this.props.word.secondColumnValue}</span>
				</div>
				<div className="standard_game_word_options">
					<ul>
						<li className="word_options_reverse_card" onClick={this.props.methods.reverseCard}><IoIosSync/></li>
						<li className={`word_options_check--${this.props.word.learned ? "checked" : "notchecked"}`} onClick={this.handleToggleCheckWord}><FaCheck/></li>
					</ul>
				</div>
			</div>
		)
	}
}

export default SingleWord;