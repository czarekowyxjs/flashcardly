import React, { Component } from 'react';
import Counter from '../../../Commons/Counter';

class GameCounterWrapper extends Component {
	render() {
		const lang = this.props.lang;
		return (
			<div className="guessByWritting_counter">
				<span>{ lang.shorts.uWillStartFor }</span>
				<i>
					<Counter counterFrom={3} finishCallBack={this.props.methods.handleCounterCb}/>
				</i>
			</div>
		)
	}
}

export default GameCounterWrapper;