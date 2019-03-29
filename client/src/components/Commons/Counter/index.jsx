import React, { Component } from 'react';

class Counter extends Component {
	state = {
		counter: this.props.counterFrom
	}

	componentDidMount() {
		this.interval = setInterval(this.updateCounter, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	updateCounter = () => {
		this.setState(prevState => {
			let newCounter = prevState.counter;
			
			if(newCounter === 0) {
				clearInterval(this.interval);
				this.props.finishCallBack();
			} else { 
				newCounter--;
			}

			return { counter: newCounter };
		});
	}

	render() {
		return (
			<span>
				{ this.state.counter }
			</span>
		)
	}
}

export default Counter;