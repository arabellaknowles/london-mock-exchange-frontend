import React, { Component } from 'react';
import axios from 'axios';
import FlashMessage from 'react-flash-message'

export default class TransactionForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      ticker: '',
      instrumentName: 'shares',
      numberOfShares: '',
      tradeDate: '',
      closeOutDate: '',
      buyPrice: '',
      sellPrice: '',
      netEarnings: '', 
      error: false
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
    let date = this.state.tradeDate
    let url = `${baseUrl}v1/tickers/${ticker}/eod/${date}?access_key=${accessKey}`
    axios.get(url)
    .then(data => {
      this.setState({
        buyPrice: data.data.close
      })
    })
    .then(this.calculateNetEarnings)
  }

  fetchTradeClosingPrice(){
    let baseUrl = 'http://api.marketstack.com/'
    let accessKey = '91d577810f3fc6e82c81f62723d07a45'
    let ticker = this.state.ticker
    let date = this.state.closeOutDate
    let url = `${baseUrl}v1/tickers/${ticker}/eod/${date}?access_key=${accessKey}`
    axios.get(url)
    .then(data => {
      this.setState({
        sellPrice: data.data.close
      })
    })
    .then(this.fetchTradeOpeningPrice)
  }

  calculateNetEarnings(){
    this.setState({
      netEarnings: ((this.state.sellPrice * this.state.numberOfShares) - (this.state.buyPrice * this.state.numberOfShares))
    })
    this.postTransaction()
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  postTransaction() {
    axios.post("https://london-mock-exchange.herokuapp.com/api/v1/portfolio/" + this.props.portfolio_id + "/transaction/", {
        ticker: this.state.ticker,
        instrument_name: this.state.instrumentName,
        number_of_shares: this.state.numberOfShares,
        trade_date: this.state.tradeDate,
        close_out_date: this.state.closeOutDate,
        buy_price: this.state.buyPrice,
        sell_price: this.state.sellPrice,
        net_earnings: this.state.netEarnings, 
      },
      { headers: {
        'Authorization': this.props.userToken
      }},
      { withCredentials: true }
      )  
    .then(() => this.props.loadTransactionList())
    .then(() => this.props.loadTransactions())
    .catch(error => {
      this.setState ({
        error: true
      })
    })
  }

  handleSubmit(event){ 
    this.setState({ error: false });
    this.fetchTradeClosingPrice()
    event.preventDefault();
  }

  render(){
    return (
      <div class="container">
        <form class="form-horizontal" onSubmit={this.handleSubmit}>
        <h2>Transaction</h2>
          <div class="form-group row">
            <label for="firstName" class="col-sm-3 control-label">Ticker</label>
            <div class="col-sm-9">
              <input
                class="form-control"
                type="text"
                name="ticker"
                placeholder="Ticker"
                value={this.state.ticker}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="firstName" class="col-sm-3 control-label">Number of Shares</label>
            <div class="col-sm-9">
              <input
                class="form-control"
                type="text"
                name="numberOfShares"
                placeholder="Number of Shares"
                value={this.state.numberOfShares}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="firstName" class="col-sm-3 control-label">Trade Date</label>
            <div class="col-sm-9">
              <input
                class="form-control"
                type="date"
                name="tradeDate"
                placeholder="Trade date"
                value={this.state.tradeDate}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>

          <div class="form-group row">
           <label for="firstName" class="col-sm-3 control-label">Close out Date</label>
            <div class="col-sm-9">
              <input
                class="form-control"
                type="date"
                name="closeOutDate"
                placeholder="Close date"
                value={this.state.closeOutDate}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
        <button class="btn btn-success btn-block" type="submit">Make Trade</button>
        { this.state.error &&  
        <div>
            <FlashMessage duration={5000}>
              <strong>Transactions must be made after 2019 and on working days</strong>
            </FlashMessage>
        </div>
        }
        </form>
      </div>
    )
  }
}