import React, { Component } from "react";
import './bootstrap.min.css'

export default class Header extends Component {
  constructor() {
    super();
      this.state = {
        userToken: localStorage.getItem("Token")
      }
  }

  render(){
    let loading_homepage_method = (this.props.loadingNewsList ? this.props.loadHomePage : this.props.loadDashboard)

    return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div class="container">
        <p class="navbar-brand">London Mock Exchange</p>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <button type="button" class="btn btn-dark" onClick={loading_homepage_method}>Home
                <span class="sr-only">(current)</span>
                </button>
            </li> 
            <li class="nav-item">
              <button type="button" class="btn btn-dark" onClick={this.props.loadNewsList}>Newsfeed</button>
            </li>
            { this.props.userToken !== null ? <li class="nav-item">
              <button type="button" class="btn btn-dark" onClick={this.props.handleLogout}>Logout</button>
            </li> : '' }
          </ul>
        </div>
      </div>
    </nav>
    )
  }
}
