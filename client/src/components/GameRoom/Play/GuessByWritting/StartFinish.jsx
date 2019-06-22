import React, { Component } from 'react';

class StartFinish extends Component {
	render() {
		const methods = this.props.methods;
		const lang = this.props.lang;
		return (
			<div>
				<div className="guessByWritting_starter_header">
					<h3>{`${lang.titles.guessByWriting} - ${lang.shorts.startGame}`}</h3>
					<p dangerouslySetInnerHTML={{ __html: lang.contents.guessByWritting.important }}></p>
					<ol>
						<li>{ lang.contents.guessByWritting.points.p1 }</li>
						<li>{ lang.contents.guessByWritting.points.p2 }</li>
						<li>{ lang.contents.guessByWritting.points.p3 }</li>
					</ol>
				</div>
				<div className="guessByWritting_starter_body">
					<div className="guessByWritting_starter_play">
						<button 
							onClick={() => methods.updateSelectedGameType("")}
							className="flashcardly_url_btn"
						>
							{ lang.shorts.back }
						</button>
						<span>{ lang.shorts.or }</span>
						<button 
							onClick={methods.prepareGameToStart}
							className="flashcardly_btn flashcardly_btn--common"
						>
							{ lang.shorts.startGameBtn }
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default StartFinish;