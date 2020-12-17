import React, { Component } from 'react'

export default class Transaction extends Component {
  constructor(props){
    super(props);

    this.state = {
      ticker: this.props.ticker,
      instrument_name: this.props.instrument_name,
      number_of_shares: this.props.number_of_shares,
      trade_date: this.props.trade_date,
      close_out_date: this.props.close_out_date,
      buy_price: this.props.buy_price,
      sell_price: this.props.sell_price,
      net_earnings: this.props.net_earnings,
      portfolio_id: this.props.portfolio_id
    }
  }

  render() {
    return(
        <tr>
        <th scope="row">{this.state.ticker}</th>
          <td>{this.state.number_of_shares}</td>
          <td>{this.state.trade_date}</td>
          <td>{this.state.close_out_date}</td>
          <td>£ {this.state.net_earnings.toFixed(2)}</td>
        </tr>
    )
  }
}
