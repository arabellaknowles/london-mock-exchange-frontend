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
        <h4><a href={this.props.url}>{this.props.headline}</a></h4>
        <img src={this.props.thumbnail}></img>
      </div>
    )
  }
}