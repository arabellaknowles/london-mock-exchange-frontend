import React, { Component } from 'react';
import axios from 'axios';

export default class TransactionForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      ticker: null,
      instrument_name: 'shares',
      number_of_shares: null,
      trade_date: null,
      close_out_date: null,
      buy_price: null,
      sell_price: null,
      net_earnings: null, 
      p_and_l: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  fetchOpeningPriceData(){
    console.log(this.state.trade_date)
    let baseUrl = 'http://api.marketstack.com/'
    let accessKey = '91d577810f3fc6e82c81f62723d07a45'
    let ticker = this.state.ticker
    let date = this.state.trade_date
    let url = `${baseUrl}v1/tickers/${ticker}/eod/${date}?access_key=${accessKey}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.setState({
        buy_price: data.close
      })
    })
    console.log('buy price', this.state.buy_price)
  }

  fetchClosingPriceData(){
    console.log(this.state.close_out_date)
    let baseUrl = 'http://api.marketstack.com/'
    let accessKey = '91d577810f3fc6e82c81f62723d07a45'
    let ticker = this.state.ticker
    let date = this.state.close_out_date
    let url = `${baseUrl}v1/tickers/${ticker}/eod/${date}?access_key=${accessKey}`
    axios.get(url)
    .then(data => {
      this.setState({
        sell_price: data.close
      })
    })
    console.log("sell price update", this.state.sell_price)
  }


  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  calculateNetEarnings(buy_price, sell_price){
    this.setState({
      net_earnings: (buy_price - sell_price)
    })
  }

  handleSubmit(event){ 
    this.fetchClosingPriceData()
    this.fetchOpeningPriceData()
    this.calculateNetEarnings(this.state.buy_price, this.state.sell_price)
    console.log('net earnings', this.state.net_earnings)
    // doing post request before retrieving data from methods

    
    axios.post("http://localhost:8000/api/v1/portfolio/" + this.props.portfolio_id + "/transaction/", {
      ticker: this.state.ticker,
      instrument_name: this.state.instrument_name,
      number_of_shares: this.state.number_of_shares,
      trade_date: this.state.trade_date,
      close_out_date: this.state.close_out_date,
      buy_price: this.state.buy_price,
      sell_price: this.state.sell_price,
      net_earnings: this.state.net_earnings, 
    },
    { headers: {
      'Authorization': this.props.userToken
    }},
    { withCredentials: true }
    )
    .then((res)  => 
      this.props.loadTransactionList()
    )
    .catch(error => {
      console.log("error", error)
    })
    event.preventDefault();
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="ticker"
            placeholder="Ticker"
            value={this.state.ticker}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="number_of_shares"
            placeholder="Quantity"
            value={this.state.number_of_shares}
            onChange={this.handleChange}
            required
          />

          <input
            type="date"
            name="trade_date"
            placeholder="Open date"
            value={this.state.trade_date}
            onChange={this.handleChange}
            required
          />

          <input
            type="date"
            name="close_out_date"
            placeholder="Close date"
            value={this.state.close_out_date}
            onChange={this.handleChange}
            required
          />

        <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}