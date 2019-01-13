import { Component } from 'react';

class Redirect extends Component {
	componentDidMount() {
		this.props.history.replace(decodeURIComponent(this.props.match.params.url));
	}

	render() {
		return null;
	}
}

export default Redirect;