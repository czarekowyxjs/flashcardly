import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import { RequireAuth } from './hocs/RequireAuth';

import "./Layout.css";

class App extends Component {
  state = {
    fbApiLoaded: false
  }

  componentDidMount() {
    document.addEventListener('FBObjectReady', this.initializeFacebookApi);
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
      			<Route path="/signup" render={() => <h2>Register</h2>}/>
      			<Route path="/signin" component={RequireAuth(Login, "Common")}/>
      			<Route path="/" exact={true} component={RequireAuth(Dashboard, "Protect")}/>
      		</Switch>
      	</BrowserRouter>
      </div>
    );
  }
}

export default App;
