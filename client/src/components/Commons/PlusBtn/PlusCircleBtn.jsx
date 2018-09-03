import React, { Component } from 'react';
import { IoIosAdd } from "react-icons/io";

import "./PlusBtn.css";

class PlusCircleBtn extends Component {
	render() {
		return (
			<i className="flashcardly_plus_circle_btn">
				<span>
					<IoIosAdd/>
				</span>
			</i>
		);
	}
}

export default PlusCircleBtn;