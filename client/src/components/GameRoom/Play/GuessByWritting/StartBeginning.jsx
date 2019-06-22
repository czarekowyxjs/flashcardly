import React, { Component } from 'react';

class StartBeginning extends Component {
	render() {
		const columnsNames = {
			first: this.props.flashcard.firstColumnName,
			second: this.props.flashcard.secondColumnName
		};
		
		const methods = this.props.methods;
		const lang = this.props.lang;

		return (
			<div>
				<div className="guessByWritting_starter_header">
					<h3>{ lang.titles.guessByWriting }</h3>
					<p>
						{ lang.contents.guessByWritting.beginningDesc }
					</p>
				</div>
				<div className="guessByWritting_starter_body">
					<div className="guessByWritting_starter_type">
						<button 
							onClick={() => methods.updateSelectedGameType("firstToSecond")} 
							className="flashcardly_url_btn"
						>
							{`${columnsNames.first} ${lang.shorts.translateTo} ${columnsNames.second}`}
						</button>
						<span>{ lang.shorts.or }</span>
						<button 
							onClick={() => methods.updateSelectedGameType("secondToFirst")} 
							className="flashcardly_url_btn"
						>
							{`${columnsNames.second} ${lang.shorts.translateTo} ${columnsNames.first}`}
						</button>
					</div>				
				</div>
			</div>
		)
	}
}

export default StartBeginning;