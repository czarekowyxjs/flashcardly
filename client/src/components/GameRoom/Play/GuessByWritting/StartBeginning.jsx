import React, { Component } from 'react';

class StartBeginning extends Component {
	render() {
		const columnsNames = this.props.columnsNames;
		const methods = this.props.methods;
		console.log(this.props);

		return (
			<div>
				<div className="guessByWritting_starter_header">
					<h3>Guess by Writting</h3>
					<p>
						Hello, if you want to start to play GuessByWrtiing, you have to select type of playing.
					</p>
				</div>
				<div className="guessByWritting_starter_body">
					<div className="guessByWritting_starter_type">
						<button 
							onClick={() => methods.updateSelectedGameType("firstToSecond")} 
							className="flashcardly_url_btn"
						>
							{`${columnsNames.first} to ${columnsNames.second}`}
						</button>
						<span>or</span>
						<button 
							onClick={() => methods.updateSelectedGameType("secondToFirst")} 
							className="flashcardly_url_btn"
						>
							{`${columnsNames.second} to ${columnsNames.first}`}
						</button>
					</div>				
				</div>
			</div>
		)
	}
}

export default StartBeginning;