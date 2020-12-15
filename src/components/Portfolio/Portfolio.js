import React, { Component } from 'react';

export default class PortfolioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      net_earnings: this.props.net_earnings,
      portfolio_id: this.props.id
    };
  }

  render() {
    // portfolios will be clickable and onclick will render to transaction list
    return(
      <div>
        {this.state.name}
      </div>
    )
  }
}