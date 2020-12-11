import React, { Component } from "react";
import Registration from "./auth/Registration";
import axios from "axios";

export default class Home extends Component {
  constructor(props){
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
  }

  handleSuccesfulAuth(data) {
    this.props.history.push('/dashboard');
  }


  render() {
    return (
      <div>
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/>
      </div>
    );
  }
}