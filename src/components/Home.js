import React, { Component } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signingUp: false
    }

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.notSigningUp = this.notSigningUp.bind(this)
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
  }

  handleSignUp(){
    this.setState({
      signingUp: true
    })
  }

  notSigningUp(){
    this.setState({
      signingUp: false
    })
  }

  render() {
    if(this.state.signingUp){
      return (
        <div>
          <Registration notSigningUp={this.notSigningUp} handleSuccessfulAuth={this.handleSuccessfulAuth} />
        </div>
      );
    } else {
      return (
        <div>
          <Login handleSignUp={this.handleSignUp} handleSuccessfulAuth={this.handleSuccessfulAuth}/>
        </div>
      );
    }
  }
}