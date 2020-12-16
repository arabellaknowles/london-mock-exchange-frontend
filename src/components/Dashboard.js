import React, { Component } from "react";
import PortfolioForm from "./Portfolio/PortfolioForm";
import PortfolioList from "./Portfolio/PortfolioList";


export default class Dashboard extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div>
        <div>
          <h1 classname="App-header">Dashboard</h1>
          <h1>Status: {this.props.userToken === null ? "Logged out" : "Logged in"}</h1>
          <PortfolioList userToken={this.props.userToken}/>
        </div>
      </div>
    )
  }
}