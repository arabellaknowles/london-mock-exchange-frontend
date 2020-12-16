import React, { Component } from 'react';
import TransactionList from './Transactions/TransactionList'

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      net_earnings: this.props.net_earnings,
      portfolio_id: this.props.id,
      inList: true
    };

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.setState({
      inList: false
    })
  }

  render() {
    // portfolios will be clickable and onclick will render to transaction list
    if(this.state.inList === true){
    return(
      <div>
        <button onClick={this.handleClick}>{this.state.name}</button>
      </div>
    )
    } else {
    return (
      <div>
        {this.state.name}
        {this.state.net_earnings}
        <TransactionList userToken={this.props.userToken} portfolio_id={this.state.portfolio_id}/> 
      </div>
      )
    }
  }
}