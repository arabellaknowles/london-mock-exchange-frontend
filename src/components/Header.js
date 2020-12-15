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
    return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div class="container">
        <a class="navbar-brand" href="#">London Mock Exchange</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home
                <span class="sr-only">(current)</span>
                </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">Newsfeed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">Leaderboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">Contact</a>
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
