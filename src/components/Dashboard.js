import React, { Component } from "react";
import PortfolioList from "./Portfolio/PortfolioList";
import TransactionList from "./Portfolio/Transactions/TransactionList";
import Header from "./Header"


export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      portfolioID: null
    }

    this.loadPortfolio = this.loadPortfolio.bind(this)
    this.loadDashboard = this.loadDashboard.bind(this)
  }

  loadPortfolio(id) {
    this.setState({
      portfolioID: id
    })
  }

  loadDashboard(){
    this.setState({
      portfolioID: null
    })
  }

  render(){
    if (this.state.portfolioID === null) {
      return (
        <div class="dashboard_background">
          <Header 
          userToken={this.props.userToken} 
          handleLogout={this.props.handleLogout}
          loadDashboard={this.loadDashboard}
          />
          <div class="div1">
            <h1 classname="mt-5">Portfolios</h1>
            <PortfolioList userToken={this.props.userToken} loadPortfolio={this.loadPortfolio}/>
          </div>
        </div>
      )
    } else { return(
      <div class="dashboard_background"> 
          <Header 
            userToken={this.props.userToken} 
            handleLogout={this.props.handleLogout}
            loadDashboard={this.loadDashboard}
          />
          <div class="div1">
            <TransactionList portfolio_id={this.state.portfolioID} userToken={this.props.userToken}/>
          </div>
      </div>
    )}
  }
}