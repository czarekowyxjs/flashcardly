import React, { Component } from 'react';
import StartBeginning from './StartBeginning.jsx';
import StartFinish from './StartFinish.jsx';

import "./Start.css";

class Start extends Component {
	render() {
		return (
			<div className="guessByWritting_starter">
				{
					this.props.selectedGameType === ""
					? <StartBeginning {...this.props}/>
					: <StartFinish {...this.props}/>
				}
			</div>
		)
	}
}

export default Start;