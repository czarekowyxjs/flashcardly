import React, { Component } from 'react';

import "./Introduce.css";

class Introduce extends Component {
	state = {
		steps: [{
			title: "It's your first set of flashcards!",
			content: "Hello! I see that you created your fist set of flashcards. Here you can expand your vocabulary and learn anywhen you want. How?",
			btn: "Next"
		}, {
			title: "Adding new words",
			content: "Every your set of flashcards has two fields in which you can enter your words and add  this ones. You can confirm adding words by little button beside second field or by click enter.",
			btn: "Next"
		}, {
			title: "Time for learn!",
			content: "When you collect enough words, you should try our little games to learn it! This will help you in remember a lot of words! ",
			btn: "Try!"
		}],
		actualStep: 0
	}

	changeStep = () => {
		if(this.state.actualStep >= 2) {
			this.props.methods.confirmIntroduce();
			return;
		};
		this.setState({
			actualStep: this.state.actualStep+1
		});
	}

	render() {
		return (
			<div className="flashcards_window_introduce">
				<div className="flashcards_window_introduce_dialog">
					<div className="flashcards_window_introduce_dialog_header">
						<div className="flashcards_window_introduce_dialog_title">
							<span>{this.state.steps[this.state.actualStep].title}</span>
						</div>
					</div>
					<div className="flashcards_window_introduce_dialog_body">
						<div className="flashcards_window_introduce_dialog_content">
							<p>{this.state.steps[this.state.actualStep].content}</p>
						</div>
						<div className="flashcards_window_introduce_dialog_btn">
							<button className="flashcardly_btn flashcardly_btn--common" onClick={this.changeStep}>
								{this.state.steps[this.state.actualStep].btn}
							</button>
						</div>	
					</div>
				</div>
			</div>
		);
	}
}

export default Introduce;