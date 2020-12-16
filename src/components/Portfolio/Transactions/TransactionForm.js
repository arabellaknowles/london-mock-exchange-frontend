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
    let baseUrl = 'http://api.marketstack.com/'
    let accessKey = '91d577810f3fc6e82c81f62723d07a45'
    let ticker = this.state.ticker
    let date = this.state.open_date
    let url = `${baseUrl}v1/tickers/${ticker}/eod/${date}?access_key=${accessKey}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.setState({
        buy_price: data.close
      })
    })
  }

  fetchClosingPriceData(){
    let baseUrl = 'http://api.marketstack.com/'
    let accessKey = '91d577810f3fc6e82c81f62723d07a45'
    let ticker = this.state.ticker
    let date = this.state.close_date
    let url = `${baseUrl}v1/tickers/${ticker}/eod/${date}?access_key=${accessKey}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.setState({
        sell_price: data.close
      })
    })
    console.log("close price update", this.state.sell_price)
  }


  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log('trade date 0', this.state.trade_date)
    console.log('ticker', this.state.ticker)
    console.log('number of shares', this.state.number_of_shares)
  }

  calculateNetEarnings(buy_price, sell_price){
    this.setState({
      net_earnings: (buy_price - sell_price)
    })
  }

  handleSubmit(event){
    console.log('trade date 1', this.state.trade_date)
    console.log('ticker 2', this.state.ticker)
    console.log('number of shares 2', this.state.number_of_shares)    
    this.fetchClosingPriceData()
    this.fetchOpeningPriceData()
    this.calculateNetEarnings(this.state.buy_price, this.state.sell_price)
    console.log('trade date 2', this.state.trade_date)

    
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
            name="quantity"
            placeholder="Quantity"
            value={this.state.number_of_shares}
            onChange={this.handleChange}
            required
          />

          <input
            type="date"
            name="open_date"
            placeholder="Open_date"
            value={this.state.trade_date}
            onChange={this.handleChange}
            required
          />

          <input
            type="date"
            name="close_date"
            placeholder="Close_date"
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