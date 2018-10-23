import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppWrapper from './AppWrapper.jsx';
import store from './store';

import './main.css';

ReactDOM.render(
	<Provider store={store}>
		<AppWrapper/>
	</Provider>,
 document.getElementById('root'));
