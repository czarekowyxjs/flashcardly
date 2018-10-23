import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Flashcards from './components/Flashcards/Flashcards.jsx';
import Privacy from './components/Privacy/Privacy.jsx';
import GameRoomWrapper from './components/GameRoom/GameRoomWrapper.jsx';
import { RequireAuth, RequireAuthReverse } from './hocs/RequireAuth.jsx';
import Logout from './components/Logout/Logout.jsx';
import ConfirmEmail from './components/ConfirmEmail/ConfirmEmail.jsx';

import "./Layout.css";

class App extends Component {
  render() {
    return (
      <div className="app_container">
      	<BrowserRouter>
      		<Switch>
      			<Route path="/signin" lang={this.props.lang} component={RequireAuthReverse(Login)}/>
            <Route path="/signup" component={RequireAuthReverse(Register)}/>
      			<Route path="/" exact={true} component={RequireAuth(Dashboard)}/>
            <Route path="/flashcards" component={RequireAuth(Flashcards)}/>
            <Route path="/gameroom" component={RequireAuth(GameRoomWrapper)}/>
            <Route path="/privacy" component={Privacy}/>
            <Route path="/signout" component={Logout}/>
            <Route path="/confirm/:hash" component={ConfirmEmail}/>
      		</Switch>
      	</BrowserRouter>
      </div>
    );
  }
}

export default App;
