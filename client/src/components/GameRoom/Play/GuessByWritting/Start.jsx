import React, { Component } from 'react';
import axios from 'axios';
import CircleLoader from '../../../Commons/Loader/CircleLoader.jsx';
import StartBeginning from './StartBeginning.jsx';
import StartFinish from './StartFinish.jsx';

import "./Start.css";

class Start extends Component {
	state = {
		loaded: false,
		firstColumnName: "",
		secondColumnName: ""
	}

	componentDidMount() {
		this.getColumnsNames();
	}

	getColumnsNames = async () => {
		const fid = this.props.fid;
		try {
			const token = localStorage.getItem("token");
			const response = await axios.get(`/api/v1/flashcards?fid=${fid}&fields=firstColumnName,secondColumnName&noWords=true`, {
				headers: { 
					authorization: token
				}
			});

			if(response.status === 200) {
				this.setState(prevState => ({
					loaded: !prevState.loaded,
					firstColumnName: response.data.flashcards[0].firstColumnName,
					secondColumnName: response.data.flashcards[0].secondColumnName
				}));
			}

		} catch(e) {
			console.log(e.response);
		}
	}

	render() {
		if(!this.state.loaded) return <CircleLoader light={this.props.light}/>;

		const columnsNames = {
			first: this.state.firstColumnName,
			second: this.state.secondColumnName
		};

		return (
			<div className="guessByWritting_starter">
				{
					this.props.selectedGameType === ""
					? <StartBeginning columnsNames={columnsNames} methods={this.props.methods}/>
					: <StartFinish methods={this.props.methods}/>
				}
			</div>
		)
	}
}

export default Start;