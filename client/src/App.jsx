import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import Flashcards from './components/Flashcards/Flashcards.jsx';
import Settings from './components/Settings/Settings.jsx';
import Privacy from './components/Privacy/Privacy.jsx';
import GameRoom from './components/GameRoom/GameRoom.jsx';
import { RequireAuth, RequireAuthReverse } from './hocs/RequireAuth.jsx';
import Logout from './components/Logout/Logout.jsx';
import ConfirmEmail from './components/ConfirmEmail/ConfirmEmail.jsx';
import Redirect from './components/Redirect/Redirect.jsx';

import "./Layout.css";

class App extends Component {
  render() {
    return (
      <div className="app_container">
      	<BrowserRouter>
      		<Switch>
      			<Route path="/signin" component={RequireAuthReverse(Login)}/>
            <Route path="/signup" component={RequireAuthReverse(Register)}/>
      			<Route path="/" exact={true} component={RequireAuth(Flashcards)}/>
            <Route path="/flashcards" component={RequireAuth(Flashcards)}/>
            <Route path="/settings" component={RequireAuth(Settings)}/>
            <Route path="/gameroom" component={RequireAuth(GameRoom)}/>
            <Route path="/privacy" component={Privacy}/>
            <Route path="/signout" component={Logout}/>
            <Route path="/confirm/:hash" component={ConfirmEmail}/>
            <Route path="/redirect/:url" component={Redirect}/>
      		</Switch>
      	</BrowserRouter>
      </div>
    );
  }
}

export default App;
