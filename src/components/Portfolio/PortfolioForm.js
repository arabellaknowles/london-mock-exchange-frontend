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
    axios.post("https://london-mock-exchange.herokuapp.com/api/v1/portfolio/", {
      name: this.state.portfolioName,
      net_earnings: 0
    },
    { headers: {
      'Authorization': this.props.userToken
    }},
    { withCredentials: true }
    )
    .then((res)  => 
      this.props.loadDashboard()
    )
    .catch(error => {
      console.log("error", error)
    })
    event.preventDefault();
  }

  render(){
    return (
      <div class="container">
        <form class="form-horizontal" onSubmit={this.handleSubmit}>
        <h2>Create Portfolio</h2>
          <div class="form-group row">
            <label for="firstName" class="col-sm-3 control-label">Portfolio Name</label>
              <div class="col-sm-9">
                <input
                class="form-control"
                type="text"
                name="portfolioName"
                placeholder="Portfolio Name"
                value={this.state.portfolioName}
                onChange={this.handleChange}
                required
                />
              </div>
            </div>
            <button class="btn btn-success btn-block" type='submit'>Create</button>
        </form>
      </div>
    )
  }
}