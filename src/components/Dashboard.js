import React, { Component } from "react";
import PortfolioList from "./Portfolio/PortfolioList";
import TransactionList from "./Portfolio/Transactions/TransactionList";
import Header from "./Header";
import axios from 'axios';


export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      portfolioID: null,
      portfolioName: ''
    }

    this.loadPortfolio = this.loadPortfolio.bind(this)
    this.loadDashboard = this.loadDashboard.bind(this)
    this.deletePortfolio = this.deletePortfolio.bind(this)
  }

  loadPortfolio(id, name) {
    this.setState({
      portfolioID: id,
      portfolioName: name,
    })
  }

  loadDashboard(){
    this.setState({
      portfolioID: null
    })
  }

  deletePortfolio(event){
    let url = "http://localhost:8000/api/v1/portfolio/" + this.state.portfolioID
    axios.delete(url, {
      headers: {
        'Authorization': this.props.userToken
      }},
      { withCredentials: true }
    )
    .then(() => (this.loadDashboard()))
    .catch(err => console.log(err))
  }

  render(){
    if (this.state.portfolioID === null) {
      return (
        <div class="dashboard_background2">
          <Header 
          userToken={this.props.userToken} 
          handleLogout={this.props.handleLogout}
          loadDashboard={this.loadDashboard}
          />
          <div class="div1">
            <h1 classname="mt-5">My Portfolios</h1>
            <PortfolioList userToken={this.props.userToken} loadPortfolio={this.loadPortfolio}/>
          </div>
        </div>
      )
    } else { return(
      <div class="dashboard_background2"> 
          <Header 
            userToken={this.props.userToken} 
            handleLogout={this.props.handleLogout}
            loadDashboard={this.loadDashboard}
          />
          <div class="div1">
            <TransactionList 
              portfolio_name={this.state.portfolioName} 
              portfolio_id={this.state.portfolioID} 
              userToken={this.props.userToken}
              deletePortfolio={this.deletePortfolio}
            />
          </div>
      </div>
    )}
  }
}