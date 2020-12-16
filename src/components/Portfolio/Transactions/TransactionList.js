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
            <button class="btn btn-dark" onClick={this.loadTransactionForm}>Create New Transaction</button>
            <table class="table table-bordered table-striped">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Ticker</th>
                  <th scope="col">Number of Shares</th>
                  <th scope="col">Trade date</th>
                  <th scope="col">Close out date</th>
                  <th scope="col">Net earning</th>
                </tr>
              </thead>
              <tbody>
                {this.state.transactions.map((transaction) => 
                <Transaction 
                ticker={transaction.ticker}
                instrument_name={transaction.instrument_name}
                number_of_shares={transaction.number_of_shares}
                trade_date={transaction.trade_date}
                close_out_date={transaction.close_out_date}
                buy_price={transaction.buy_price}
                sell_price={transaction.sell_price}
                net_earnings={transaction.net_earnings}
                portfolio_id={transaction.portfolio_id}
                />
                )}
              </tbody>
            </table> 
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
