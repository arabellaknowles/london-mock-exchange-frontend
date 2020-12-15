import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

import Home from "./Home"
import Dashboard from "./Dashboard"

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      userToken: localStorage.getItem("Token")
    }
    
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(data) {
    localStorage.setItem("Token", data.key)
    this.setState({
      userToken: data.key
    })
  }

  render() {
    if (this.state.userToken === null) {
      return (
        <div className="app">
          <Home
            handleLogin={this.handleLogin}
            userToken={this.state.userToken}
          />
        </div>
      )
    } 
    return (
      <div>
        <Dashboard
          userToken={this.state.userToken}
        />     
      </div>
    )
  }
}



