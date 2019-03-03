import React, { Component } from 'react';

class StartFinish extends Component {
	render() {
		const methods = this.props.methods;
		return (
			<div>
				<div className="guessByWritting_starter_header">
					<h3>Guess by Writting - Start</h3>
					<p>
						<b>Important!</b> Okey, you choosen your game type. It's a few important points for you.
					</p>
					<ol>
						<li>When you click "Let's play" you will have 3 second for preparing to game.</li>
						<li>While playing you will have 15 second to translate each word. Time is summed up.</li>
						<li>If you leave while playing, game will save your actual result.</li>
					</ol>
				</div>
				<div className="guessByWritting_starter_body">
					<div className="guessByWritting_starter_play">
						<button 
							onClick={() => methods.updateSelectedGameType("")}
							className="flashcardly_url_btn"
						>
							Back
						</button>
						<span>or</span>
						<button 
							onClick={methods.prepareGameToStart}
							className="flashcardly_btn flashcardly_btn--common"
						>
							Let's play
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default StartFinish;