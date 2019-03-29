import React, { Component } from 'react';

class GameWindowResult extends Component {
	render() {
		const timeBandStyle = {
			width: `${((this.props.data.duration/this.props.data.staticDuration)*100)}%`
		};

		return (
			<div className="guessByWritting_result_bg">
				<div 
					className="guessByWritting_result_time"
					style={timeBandStyle}
					>
				</div>
			</div>
		)
	}
}

export default GameWindowResult;