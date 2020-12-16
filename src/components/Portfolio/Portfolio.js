import React, { Component } from 'react';

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      net_earnings: this.props.net_earnings,
      portfolio_id: this.props.id,
    };

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.props.loadPortfolio(this.state.portfolio_id)
  }

  render() {
    return(
      <div>
        <button onClick={this.handleClick}>{this.state.name}</button>
      </div>
    )
  }
}