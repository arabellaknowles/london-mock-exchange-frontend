import React, { Component } from "react";
import Home from "./Home"
import Dashboard from "./Dashboard"
import Header from "./Header"

export default class App extends Component {
  constructor() {
    super();
      this.state = {
        userToken: localStorage.getItem("Token")
      }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(data) {
    localStorage.setItem("Token", data.key)
    this.setState({
      userToken: data.key
    })
  }

  handleLogout(){
    localStorage.removeItem("Token")
    this.setState({
      userToken: null
    })
  }

  render() {
    if (this.state.userToken === null) {
      return (
        <div className="App">
          <Header 
            userToken={this.state.userToken} 
            handleLogout={this.handleLogout}
          />
          <Home
            handleLogin={this.handleLogin}
            userToken={this.state.userToken}
          />
        </div>
      )
    } 
    return (
      <div className="App">
        <Header 
          userToken={this.state.userToken} 
          handleLogout={this.handleLogout}
        />
        <Dashboard
          userToken={this.state.userToken}
        />     
      </div>
    )
  }
}



