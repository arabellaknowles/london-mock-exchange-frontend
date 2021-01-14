import React, { Component } from 'react';
import axios from 'axios';
import Portfolio from './Portfolio'


export default class PortfolioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolios: [],
    };
    
    this.loadPortfolios = this.loadPortfolios.bind(this)
  }

  componentDidMount() {
    this.loadPortfolios()
  }

  loadPortfolios() {
    axios.get("https://london-mock-exchange.herokuapp.com/api/v1/portfolio", 
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
    return (
      <div class="container">
        <table class="table table-bordered" >
          <tbody>
            {this.state.portfolios.map((portfolio) => 
              <Portfolio name={portfolio.name} net_earnings={portfolio.net_earnings} userToken={this.props.userToken} id={portfolio.id} loadPortfolio={this.props.loadPortfolio}/>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}
