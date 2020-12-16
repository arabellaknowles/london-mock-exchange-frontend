import React, { Component } from 'react';
import axios from 'axios';
import Transaction from './Transaction'

export default class TransactionList extends Component {
  constructor(props){
    super(props);

    this.state = {
      transactions: [],
      loadingTransactionForm: false
    }
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

  render(){
    return(
      <div>
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
  }
}
