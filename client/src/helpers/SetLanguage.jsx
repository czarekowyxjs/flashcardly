import { Component } from 'react'
import { connect } from 'react-redux';

class SetLanguage extends Component {
	componentDidMount() {
		this.props.dispatch({
			type: 'LAND_UP_LANG_DATA',
			payload: this.props.lang
		});
		this.props.methods.setLangDone();
	}

	render() {
		return null;
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(SetLanguage);