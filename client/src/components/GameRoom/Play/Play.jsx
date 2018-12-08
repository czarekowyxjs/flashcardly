import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoMdShareAlt } from 'react-icons/io';
import { MdInvertColors } from 'react-icons/md';
import { GoScreenFull, GoScreenNormal } from 'react-icons/go';
import { fetchFlashcardPrimary } from "../../../actions/gameActions";
import ParseQueryURL from "../../../helpers/ParseQueryURL";
import FetchFlashcard from '../../../hocs/FetchFlashcard.jsx';
import CircleLoader from "../../Commons/Loader/CircleLoader.jsx";
import Standard from './Standard/Standard.jsx';

import "./Play.css";

class Play extends Component {
	state = {
		colorMode: "",
		fullScreen: false
	}

	parsedParams = {}

	componentDidMount() {
		this.initInfo();
		this.parsedParams = ParseQueryURL(this.props.location.search);
		this.props.fetchFlashcardPrimary(this.parsedParams.fid);
	}

	initInfo = () => {
		const colorMode = localStorage.getItem("colorMode") || "light";
		this.setState({
			colorMode: colorMode
		});
	}

	invertColors = () => {
		let colorMode = "light";
		if(this.state.colorMode === "light") colorMode = "dark";
		
		this.setState({
			colorMode: colorMode
		}, () => localStorage.setItem("colorMode", colorMode));
	}

	toggleFullScreen = () => {
		this.setState(prevState => ({
			fullScreen: !prevState.fullScreen
		}));
	}

	renderGamePlayGround = () => {
		switch(this.parsedParams.type) {
			case "standard":
				return <FetchFlashcard light={this.state.colorMode === "light" ? false : true} lang={this.props.user.lang} fid={this.parsedParams.fid} Component={Standard}/>;
			default:
				return;
		}
	}

	render() {
		if(!this.props.game.primaryFlashcardData.loaded || this.state.colorMode.length === 0) return <CircleLoader/>;
		return (
			<div className="game_room_play_wrapper">
				<div className={`play_window play_window--${this.state.colorMode} play_window--${this.state.fullScreen ? "fullscreen" : "smallScreen"}`}>
					<div className="play_window_header">
						<div className="play_window_header_info">
							<div className="play_info_title">
								<span>
									{this.props.game.primaryFlashcardLoadedData.title}
								</span>
								<Link to={`/flashcards/${this.props.game.primaryFlashcardLoadedData.fid}`}>
									<IoMdShareAlt/>
								</Link>
							</div>
						</div>
						<div className="play_window_header_options">
							<ul>
								<li onClick={this.invertColors}><MdInvertColors/></li>
								<li onClick={this.toggleFullScreen}>{this.state.fullScreen ? <GoScreenNormal/> : <GoScreenFull/>}</li>
							</ul>
						</div>
					</div>
					<div className="play_window_body">
						{this.renderGamePlayGround()}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		game: state.game,
		user: state.user,
		flashcard: state.flashcard
	}
}

export default connect(mapStateToProps, { fetchFlashcardPrimary })(Play);