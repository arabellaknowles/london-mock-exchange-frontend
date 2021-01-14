import React, { Component } from "react";
import Home from "./Home"
import Dashboard from "./Dashboard"
import Header from "./Header"
import './bootstrap.min.css'
import '../App.css'
import NewsList from './newsfeed/NewsList'

export default class App extends Component {
  constructor() {
    super();
      this.state = {
        userToken: localStorage.getItem("Token"),
        loadingNewsList: false,
        loadingHomePage: true
      }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.loadNewsList = this.loadNewsList.bind(this);
    this.loadHomePage = this.loadHomePage.bind(this);
  }

  handleLogin(data) {
    localStorage.setItem("Token", data.key)
    this.setState({
      userToken: data.key
    })
  }

  loadNewsList(){
    this.setState({
      loadingNewsList: true,
      loadingHomePage: false
    })
  }

  handleLogout(){
    localStorage.removeItem("Token")
    this.setState({
      userToken: null
    })
  }

  loadHomePage(){
    this.setState({
      loadingNewsList: false,
      loadingHomePage: true
    })
  }


  render() {
    let loadingNewsList = (this.state.loadingNewsList === true)
    let noCurrentUser = (this.state.userToken === null)

    if (noCurrentUser && !loadingNewsList) {
      return (
        <div className="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <Header 
                userToken={this.state.userToken} 
                handleLogout={this.handleLogout}
                loadHomePage={this.loadHomePage}
                loadNewsList={this.loadNewsList}
              />
              <Home
                handleLogin={this.handleLogin}
                userToken={this.state.userToken}
              />
            </div>
          </div>
        </div>
      )
    } else if (loadingNewsList){
      return(
        <div className="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <div class="dashboard_background2">
                <Header 
                  userToken={this.state.userToken} 
                  handleLogout={this.handleLogout}
                  loadHomePage={this.loadHomePage}
                  loadNewsList={this.loadNewsList}
                />
                <div class="div1">
                  <NewsList />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (!noCurrentUser && !loadingNewsList)
      return (
        <div className="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <Dashboard
                userToken={this.state.userToken}
                handleLogout={this.handleLogout}
                loadHomePage={this.loadHomePage}
                loadNewsList={this.loadNewsList}
              /> 
            </div> 
          </div>
        </div>
      )
  }
}



