import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home"
import Dashboard from "./Dashboard"

export default class App extends Component {
constructor() {
  super();

  this.state = {
    loggedInStatus: 'NOT_LOGGED_IN',
    user: {}
  }
}

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact 
              path={"/"} 
              render = {props => (
              <Home {...props} loggedInStatus={this.state.loggedInStatus} />
              )} 
              />
            <Route
              exact 
              path={"/dashboard"} 
              render = {props => (
              <Dashboard {...props} loggedInStatus={this.state.loggedInStatus} />
              )} 
              />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}



