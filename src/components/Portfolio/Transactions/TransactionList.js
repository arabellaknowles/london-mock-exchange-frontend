import React, { Component } from 'react';
import axios from 'axios';

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
    console.log(this.state.transactions)
    return(
      <div>
        Winner
      </div>
    )
  }
}
