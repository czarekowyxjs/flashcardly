import React, { Component } from 'react';
import Counter from '../../../Commons/Counter';

class GameCounterWrapper extends Component {
	render() {
		return (
			<div className="guessByWritting_counter">
				<span>You'll start for</span>
				<i>
					<Counter counterFrom={3} finishCallBack={this.props.methods.handleCounterCb}/>
				</i>
			</div>
		)
	}
}

export default GameCounterWrapper;