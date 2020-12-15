import React, { Component } from 'react';
import axios from 'axios';

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioName: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    axios.post("http://localhost:8000/api/v1/portfolio/", {
      name: this.state.portfolioName,
      net_earnings: 0
    },
    { headers: {
      'Authorization': this.props.userToken
    }},
    { withCredentials: true }
    )
    .then(response => {
      console.log(response)
    }).catch(error => {
      console.log("error", error)
    })
    event.preventDefault();
  }

  render(){
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
           <h1>Create Portfolio</h1>
            <input
            type = 'text'
            name = 'portfolioName'
            placeholder = 'Portfolio Name'
            value ={this.state.portfolioName}
            onChange={this.handleChange}
            required
            />
            <button type='submit'>Create</button>
          </form>
        </div>
      </div>
    )
  }
}