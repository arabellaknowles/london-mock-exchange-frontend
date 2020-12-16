import React, { Component } from 'react';
import axios from 'axios';
import Portfolio from './Portfolio'
import PortfolioForm from './PortfolioForm'

export default class PortfolioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolios: [],
      loadingPortfolioForm: false
    };
    
    this.loadPortfolioForm = this.loadPortfolioForm.bind(this)
    this.notShowPortfolioForm = this.notShowPortfolioForm.bind(this)
    this.loadPortfolios = this.loadPortfolios.bind(this)
  }

  componentDidMount() {
    this.loadPortfolios()
  }

  notShowPortfolioForm(){
    this.setState({
      loadingPortfolioForm: false
    })
  }

  loadPortfolioForm(){
    this.setState({
      loadingPortfolioForm: true 
    })
  }

  loadPortfolios() {
    axios.get("http://localhost:8000/api/v1/portfolio", 
    { headers: {
      'Authorization': this.props.userToken
    }},
    { withCredentials: true }
    )
      .then(res => {
        this.setState({
          portfolios: res.data
        });
      })
      .catch(err => console.log(err))
  }

  render() {
    let portfolios = this.state.portfolios
    if(this.state.loadingPortfolioForm){
      return (
        <div class="container">
            <PortfolioForm loadPortfolios={this.loadPortfolios} userToken={this.props.userToken} notShowPortfolioForm={this.notShowPortfolioForm} /> 
        </div>
      )
    } else {
      return(
        <div class="container">
          <button onClick={this.loadPortfolioForm}>Create New Portfolio</button>
          <table class="table table-bordered" >
            <tbody>
              {portfolios.map((portfolio) => 
                <Portfolio name={portfolio.name} net_earnings={portfolio.net_earnings} userToken={this.props.userToken} id={portfolio.id} loadPortfolio={this.props.loadPortfolio}/>
              )}
            </tbody>
          </table>
        </div>
      )
    }
  }
}
