import React, { Component } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
  }


  render() {
    return (
      <div>
        <h1 class="mt-5">Welcome to the London Mock Exchange</h1>
        <p class="lead">Please sign in to continue</p>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
      </div>
    );
  }
}