import React, { Component } from 'react';

class DropDownMenu extends Component {
	render() {
		return (
			<div className="nav_drop_down_menu_wrapper">
				<div className={`nav_drop_down_menu_icon nav_drop_down_menu_icon--${this.props.visibility ? "show" : "hide"}`} onClick={this.props.methods.changeDropDownUserBarMenuVisibility}>
					<i></i>
				</div>
				{this.props.methods.renderDropDownUserBarMenu()}
			</div>
		);
	}
}


export default DropDownMenu;