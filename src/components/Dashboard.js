import React, { Component } from "react";
import PortfolioList from "./Portfolio/PortfolioList";
import TransactionList from "./Portfolio/Transactions/TransactionList";


export default class Dashboard extends Component {
  constructor(props){
    super(props);

    this.state = {
      portfolioID: null
    }

    this.loadPortfolio = this.loadPortfolio.bind(this)

  }

  loadPortfolio(id) {
    this.setState({
      portfolioID: id
    })
  }

  render(){
    if (this.state.portfolioID === null) {
      return (
        <div>
          <div>
            <h1 classname="App-header">Dashboard</h1>
            <h1>Status: {this.props.userToken === null ? "Logged out" : "Logged in"}</h1>
            <PortfolioList userToken={this.props.userToken} loadPortfolio={this.loadPortfolio}/>
          </div>
        </div>
      )
    } else { return(
      <div>
        <div>
          <TransactionList portfolio_id={this.state.portfolioID} userToken={this.props.userToken}/>
        </div>
      </div>
    )}
  }
}