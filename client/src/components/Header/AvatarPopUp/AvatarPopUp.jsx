import React, { Component } from 'react';
import { MdClose } from 'react-icons/md';
import CircleLoader from '../../Commons/Loader/CircleLoader.jsx';

import "./AvatarPopUp.css";

class AvatarPopUp extends Component {
	state = {
		avatars: ['female_av_1.png', 'female_av_2.png', 'male_av_1.png', 'male_av_2.png', 'female_av_3.png', 'male_av_3.png', 'female_av_4.png', 'female_av_5.png', 'male_av_4.png', 'female_av_6.png', 'female_av_7.png'],
		selectedAvatar: '',
		visibleAvatarPreview: false,
		loaded: false
	}

	componentDidMount() {
		this.loadImages();
	}

	showAvatarPreview = () => {
		this.setState({
			visibleAvatarPreview: !this.state.visibleAvatarPreview
		});
	}

	selectAvatar = (e) => {
		this.setState({
			selectedAvatar: e.target.dataset.name
		}, this.showAvatarPreview);
	}

	handleConfirmSelectedAvatar = () => {
		this.setState({
			visibleAvatarPreview: false
		}, this.props.methods.handleAvatarSelect(this.state.selectedAvatar));
	}

	loadImages = () => {
		const self = this;

		this.state.avatars.forEach((key, index) => {
			const src = `/img/avatars/${key}`;
			const img = new Image();
			img.onload = (e) => {
				let avatars = self.state.avatars;
				avatars[index] = img;
				self.setState({
					avatars
				}, () => {
					if(index === self.state.avatars.length-1) {
						self.setState({
							loaded: true
						});
					}
				})
			}
			img.src = src;
			img.title = key;
		});
	}

	renderAvatars = () => {
		const avatars = this.state.avatars;
		return avatars.map((key, index) => {
			return (
				<div className="flashcardly_dialog_single_av" key={index}>
					<img src={key.src} data-name={key.title} alt="avatar" onClick={this.selectAvatar}/>
				</div>
			);
		});
	}

	render() {
		return (
			<div className="flashcardly_dialog_bg">
				<div className="flashcardly_dialog">
				{
					this.state.visibleAvatarPreview
					? (<div className="flashcardly_dialog_avatar_preview"> 
							<div className="flashcardly_dialog_avatar_preview_wrapper">
								<img src={`/img/avatars/${this.state.selectedAvatar}`} alt="selected avatar"/>
								<div className="flashcardly_dialog_avatar_preview_option">
									<button className="flashcardly_dialog_avatar_preview_option--cancel" onClick={this.showAvatarPreview}>{this.props.lang.shorts.cancel}</button>
									<span>{this.props.lang.shorts.or}</span>
									<button className="flashcardly_btn flashcardly_btn--common" onClick={this.handleConfirmSelectedAvatar}>{this.props.lang.buttons.confirm}</button>
								</div>
							</div>
						</div>)
					: null
				}
					<div className="flashcardly_dialog_header">
						<div className="flashcardly_dialog_title">
							<h3>{this.props.lang.titles.changeYourAvatar}</h3>
						</div>
						<div className="flashcardly_dialog_close" onClick={this.props.methods.handleAvatarClick}>
							<MdClose/>
						</div>
					</div>
					<div className="flashcardly_dialog_body">
						{
							this.state.loaded 
							? (<div className="flashcardly_dialog_avatars">
									{this.renderAvatars()}
								</div>)
							: <CircleLoader/>
						}
					</div>
				</div>
			</div>
		);
	}
}

export default AvatarPopUp;