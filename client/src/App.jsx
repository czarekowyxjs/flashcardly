import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Flashcards from './components/Flashcards/Flashcards.jsx';
import { RequireAuth } from './hocs/RequireAuth.jsx';

import "./Layout.css";

class App extends Component {
  state = {
    fbApiLoaded: false
  }

  componentDidMount() {
    const self = this;
    if(window.FB) {
      self.initializeFacebookApi();
    }
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '292137841568531',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      self.initializeFacebookApi();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  initializeFacebookApi = () => {
    this.setState({
      fbApiLoaded: true
    });
  }

  render() {
    if(!this.state.fbApiLoaded) {
      return <p>Loading facebook api</p>;
    }
    return (
      <div className="app_container">
      	<BrowserRouter>
      		<Switch>
      			<Route path="/signin" component={RequireAuth(Login, "Common")}/>
      			<Route path="/" exact={true} component={RequireAuth(Dashboard, "Protect")}/>
            <Route path="/flashcards" component={RequireAuth(Flashcards, "Protect")}/>
      		</Switch>
      	</BrowserRouter>
      </div>
    );
  }
}

export default App;
