import React, { Component } from 'react';
import axios from 'axios';
import Portfolio from './Portfolio'

export default class PortfolioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolios: []
    };

    this.loadPortfolios = this.loadPortfolios.bind(this)
  }

  componentDidMount() {
    this.loadPortfolios()
  }

  loadPortfolios() {
    axios.get("http://localhost:8000/api/v1/portfolio", 
    { headers: {
      'Authorization': this.props.userToken
    }},
    { withCredentials: true }
    )
      .then(res => {
        console.log(res.data)
        this.setState({
          portfolios: res.data
        });
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state.portfolios)
    const portfolios = this.state.portfolios
    return (
      <div>
        <div className="post-list" >
          {portfolios.map((portfolio) => 
            <Portfolio name={portfolio.name} net_earnings={portfolio.net_earnings} userToken={this.props.userToken}/>
          )}
        </div>
      </div>
    )
  }
}
