import React, { Component } from "react";

export default class NewsHeadline extends Component {
  constructor(props) {
    super(props);
      this.state = {
        
      }
  }

  render(){
    return (
      <div>hello {this.props.headline}</div>
    )
  }
}