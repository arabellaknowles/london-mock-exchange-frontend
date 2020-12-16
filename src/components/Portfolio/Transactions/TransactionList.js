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
      loadTransactionForm: false
    })
    this.loadTransactions()
  }

  render(){
    console.log('are we here')
    console.log(this.state.loadTransactionForm)
    if(this.state.loadTransactionForm === false){
      return(
        <div>
          <button onClick={this.loadTransactionForm}>Create New Transaction</button>
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
        </div>
      )
    } else {
      return (
        <TransactionForm loadTransactions={this.loadTransactions} loadTransactionList={this.loadTransactionList} userToken={this.props.userToken} portfolio_id={this.props.portfolio_id} loadTransactionList={this.loadTransactionList} /> 
      )
    }
  }
}
