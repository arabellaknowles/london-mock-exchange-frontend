import React, { Component } from 'react';

export default class PortfolioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      net_earnings: this.props.net_earnings,
      // portfolio_id: this.props.id
    };
  }

  render() {
    return(
      <div>
        {this.state.name}
      </div>
    )
  }
}