import React, { Component } from 'react';
import axios from 'axios';

export default class TransactionForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      ticker: '',
      instrument_name: 'shares',
      number_of_shares: '',
      trade_date: '',
      close_out_date: '',
      buy_price: '',
      sell_price: '',
      net_earnings: '', 
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.fetchTradeOpeningPrice = this.fetchTradeOpeningPrice.bind(this)
    this.fetchTradeClosingPrice = this.fetchTradeClosingPrice.bind(this)
    this.calculateNetEarnings = this.calculateNetEarnings.bind(this)
    this.postTransaction = this.postTransaction.bind(this)
  }

  fetchTradeOpeningPrice(){
    let baseUrl = 'http://api.marketstack.com/'
    let accessKey = '91d577810f3fc6e82c81f62723d07a45'
    let ticker = this.state.ticker
    let date = this.state.trade_date
    let url = `${baseUrl}v1/tickers/${ticker}/eod/${date}?access_key=${accessKey}`
    console.log('opening price url', url)
    axios.get(url)
    .then(data => {
      this.setState({
        buy_price: data.data.close
      })
    })
    .then(this.calculateNetEarnings)
  }

  fetchTradeClosingPrice(){
    let baseUrl = 'http://api.marketstack.com/'
    let accessKey = '91d577810f3fc6e82c81f62723d07a45'
    let ticker = this.state.ticker
    let date = this.state.close_out_date
    let url = `${baseUrl}v1/tickers/${ticker}/eod/${date}?access_key=${accessKey}`
    console.log('closing price url', url)
    axios.get(url)
    .then(data => {
      this.setState({
        sell_price: data.data.close
      })
    })
    .then(this.fetchTradeOpeningPrice)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  calculateNetEarnings(){
    this.setState({
      net_earnings: ((this.state.buy_price * this.state.number_of_shares) - (this.state.sell_price * this.state.number_of_shares))
    })
    this.postTransaction()
  }

  postTransaction() {
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
    .then(() => this.props.loadTransactionList())
    .then(() => this.props.loadTransactions())
    .catch(error => {
      console.log("error", error)
    })
  }

  handleSubmit(event){ 
    this.fetchTradeClosingPrice()
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