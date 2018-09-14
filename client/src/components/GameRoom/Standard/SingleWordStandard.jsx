import React, { Component } from 'react';
import { IoIosSync } from 'react-icons/io';
 
class SingleWordStandard extends Component {
	state = {
		check: false
	}

	turnWord = (e) => {
		if(e.type === "keypress") {
			if(e.key !== "Enter") {
				return;
			}
		}

		this.setState({
			check: !this.state.check
		});
	}

	componentDidMount() {
		window.addEventListener("keypress", this.turnWord, false);
	}

	componentWillUnmount() {
		window.removeEventListener("keypress", this.turnWord, false);
	}

	render() {
		return (
			<div className="standard_game_single_word">
				<div className="standard_game_single_word_content">
					<div className="single_word_content_text">
						<span>{this.state.check ? this.props.word.secondColumnValue : this.props.word.firstColumnValue}</span>
					</div>
					<div className="single_word_content_turn" title="Check word" onClick={this.turnWord}>
						<IoIosSync/>
					</div>
				</div>
			</div>
		);
	}
}

export default SingleWordStandard;