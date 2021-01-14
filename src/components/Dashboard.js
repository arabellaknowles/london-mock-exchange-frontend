import React, { Component } from "react";
import PortfolioList from "./Portfolio/PortfolioList";
import TransactionList from "./Portfolio/Transactions/TransactionList";
import Header from "./Header";
import axios from 'axios';
import PortfolioForm from './Portfolio/PortfolioForm'


export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      portfolioID: null,
      portfolioName: '',
      loadingPortfolioForm: false
    }

    this.loadPortfolio = this.loadPortfolio.bind(this)
    this.loadDashboard = this.loadDashboard.bind(this)
    this.deletePortfolio = this.deletePortfolio.bind(this)
    this.loadPortfolioForm = this.loadPortfolioForm.bind(this)
  }

  loadPortfolio(id, name) {
    this.setState({
      portfolioID: id,
      portfolioName: name,
    })
  }

  loadPortfolioForm(){
    this.setState({
      loadingPortfolioForm: true 
    })
  }

  loadDashboard(){
    this.setState({
      portfolioID: null,
      loadingPortfolioForm: false
    })
    this.props.loadHomePage()
  }

  deletePortfolio(event){
    let url = "https://london-mock-exchange.herokuapp.com/api/v1/portfolio/" + this.state.portfolioID
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
    let noPortfolioId = (this.state.portfolioID === null)
    let loadingPortfolioForm = (this.state.loadingPortfolioForm === true)
    if (noPortfolioId && !loadingPortfolioForm) {
      return (
        <div class="dashboard_background2">
          <Header 
          userToken={this.props.userToken} 
          handleLogout={this.props.handleLogout}
          loadDashboard={this.loadDashboard}
          loadNewsList={this.props.loadNewsList}
          loadingNewsList={this.props.loadingNewsList}
          />
          <div class="div1">
            <h1 classname="mt-5">My Portfolios</h1>
            <button class="btn btn-success" onClick={this.loadPortfolioForm}>Create New Portfolio</button>
            <PortfolioList userToken={this.props.userToken} loadPortfolio={this.loadPortfolio}/>
          </div>
        </div>
      )
    } else if (noPortfolioId && loadingPortfolioForm) {
      return (
        <div class="dashboard_background2">
          <Header 
            userToken={this.props.userToken} 
            handleLogout={this.props.handleLogout}
            loadDashboard={this.loadDashboard}
            loadNewsList={this.props.loadNewsList}
            loadingNewsList={this.props.loadingNewsList}
          />
        <div class="container">
            <PortfolioForm loadDashboard={this.loadDashboard} userToken={this.props.userToken}/> 
        </div>
        </div>
      )
    } else { 
      return(
        <div class="dashboard_background2"> 
            <Header 
              userToken={this.props.userToken} 
              handleLogout={this.props.handleLogout}
              loadDashboard={this.loadDashboard}
              loadNewsList={this.props.loadNewsList}
              loadingNewsList={this.props.loadingNewsList}
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
      )
    }
  }
}