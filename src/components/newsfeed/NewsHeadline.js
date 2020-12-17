import React, { Component } from "react";

export default class NewsHeadline extends Component {
  constructor(props) {
    super(props);
      this.state = {
        
      }
  }

  render(){
    return (
      <div>{this.props.headline}</div>
    )
  }
}