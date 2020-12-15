import React, { Component } from "react";

export default class Dashboard extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div>
        <div>
          <h1>Dashboard</h1>
          <h1>Status: {this.props.userToken === null ? "Logged out" : "Logged in"}</h1>
          <button onClick={this.props.handleLogout}>Logout</button>
        </div>
      </div>
    );
  }
}