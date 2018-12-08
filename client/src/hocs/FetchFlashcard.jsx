import React from 'react';
import CircleLoader from "../components/Commons/Loader/CircleLoader.jsx";
import axios from "axios";

class FetchFlashcard extends React.Component {
	state = {
		processing: true,
		loaded: false,
		flashcardData: {}
	}

	componentDidMount() {
		this.fetchFlashcardData();
	}

	fetchFlashcardData = async () => {
		const token = localStorage.getItem("token");
		try {
			const response = await axios.get("/api/v1/flashcards/"+this.props.fid, {
				headers: {
					authorization: token
				}
			});

			if(response.status === 200) {
				this.setState({
					processing: false,
					loaded: true,
					flashcardData: response.data.flashcard
				});
			}
		} catch(e) {
			console.log(e.response);
		}
	}

	render() {
		if(!this.state.loaded) return <CircleLoader light={this.props.light}/>;
		const Component = this.props.Component;
		return <Component lang={this.props.lang} flashcard={this.state.flashcardData}/>;
	}
}

export default FetchFlashcard;
