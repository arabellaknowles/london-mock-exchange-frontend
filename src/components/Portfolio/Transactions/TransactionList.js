import React, { Component } from 'react';
import axios from 'axios';
import Transaction from './Transaction'
import TransactionForm from './TransactionForm'


export default class TransactionList extends Component {
  constructor(props){
    super(props);

    this.state = {
      transactions: [],
      loadingTransactionForm: false
    }

    this.loadTransactionForm = this.loadTransactionForm.bind(this)
    this.loadTransactionList = this.loadTransactionList.bind(this)
    this.loadTransactions = this.loadTransactions.bind(this)
  }

  componentDidMount(){
    this.loadTransactions()
  }

  loadTransactions() {
    let url = "http://localhost:8000/api/v1/portfolio/" + this.props.portfolio_id + "/transaction/"
    axios.get(url, 
    { headers: {
      'Authorization': this.props.userToken
    }},
    { withCredentials: true }
    )
      .then(res => {
        this.setState({
          transactions: res.data
        });
      })
      .catch(err => console.log(err))
  }

  loadTransactionForm(){
    this.setState({
      loadingTransactionForm: true
    })
  }

  loadTransactionList(){
    this.setState({
      loadingTransactionForm: false
    })
  }

  render(){
    if(this.state.loadingTransactionForm === false){
      return(
        <div class="container">
          <div class="align-(middle)">
          <h1 classname="mt-5">{this.props.portfolio_name}</h1>
          <h5>Trade History</h5>
            <table class="table table-bordered table-striped">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Ticker</th>
                  <th scope="col">Number of Shares</th>
                  <th scope="col">Trade Date</th>
                  <th scope="col">Close out Date</th>
                  <th scope="col">Net Earning</th>
                </tr>
              </thead>
              <tbody>
                {this.state.transactions.map((transaction) => 
                <Transaction 
                ticker={transaction.ticker}
                instrumentName={transaction.instrument_name}
                numberOfShares={transaction.number_of_shares}
                tradeDate={transaction.trade_date}
                closeOutDate={transaction.close_out_date}
                buyPrice={transaction.buy_price}
                sellPrice={transaction.sell_price}
                netEarnings={transaction.net_earnings}
                portfolioId={transaction.portfolio_id}
                />
                )}
              </tbody>
            </table> 
            <button class="btn btn-success" onClick={this.loadTransactionForm}>Make New Trade</button>
            <br></br>
            <br></br>
            <button class="btn btn-warning" onClick={this.props.deletePortfolio}>Delete Portfolio</button>

          </div>
        </div>
      )
    } else {
      return (
        <TransactionForm loadTransactions={this.loadTransactions} loadTransactionList={this.loadTransactionList} userToken={this.props.userToken} portfolio_id={this.props.portfolio_id} /> 
      )
    }
  }
}
