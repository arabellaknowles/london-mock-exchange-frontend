import React, { Component } from 'react'

export default class Transaction extends Component {
  constructor(props){
    super(props);

    this.state = {
      ticker: this.props.ticker,
      instrumentName: this.props.instrumentName,
      numberOfShares: this.props.numberOfShares,
      tradeDate: this.props.tradeDate,
      closeOutDate: this.props.closeOutDate,
      buyPrice: this.props.buyPrice,
      sellPrice: this.props.sellPrice,
      netEarnings: this.props.netEarnings,
      portfolioId: this.props.portfolioId
    }
  }

  render() {
    return(
        <tr>
        <th scope="row">{this.state.ticker}</th>
          <td>{this.state.numberOfShares}</td>
          <td>{this.state.tradeDate}</td>
          <td>{this.state.closeOutDate}</td>
          <td>£ {this.state.netEarnings.toFixed(2)}</td>
        </tr>
    )
  }
}
