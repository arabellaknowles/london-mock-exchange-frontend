import React, { Component } from "react";

export default class NewsHeadline extends Component {
  constructor(props) {
    super(props);
      this.state = {
        
      }
  }

  render(){
    return (
      <div class="container">
        <h5>{this.props.headline}</h5>
        <img src={this.props.thumbnail}></img>
      </div>
    )
  }
}