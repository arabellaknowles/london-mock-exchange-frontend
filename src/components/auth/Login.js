import React, { Component } from 'react';
import axios from 'axios';
import FlashMessage from 'react-flash-message'

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username:"",
      password:"",
      loginErrors: "",
      error: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event){
    this.setState ({ error: false })
    axios.post("https://london-mock-exchange.herokuapp.com/api/v1/rest-auth/login/", {
        username: this.state.username,
        password: this.state.password,
    },
    { withCredentials: true }
    )
    .then(response => {
      if (response.statusText === "OK" ) {
      this.props.handleSuccessfulAuth(response.data);
      }
    })
    .catch(error => {
      this.setState ({ error: error.response.data.non_field_errors[0] })
    })
    event.preventDefault();
  }

  render() {
    console.log((this.state.error !== false))
    return (
      <div class="container">
        <form class="form-horizontal" role="form" onSubmit={this.handleSubmit}>
        <h1 class="mt-5">London Mock Exchange</h1>
        <p class="lead">Please sign in to continue</p>
          <div class="form-group">
            <label for="firstName" class="col-sm-3 control-label">Username</label>
              <div class="col-sm-12">
                <input 
                  class="form-control"
                  type="username" 
                  name="username" 
                  id="username"
                  placeholder="Username" 
                  value={this.state.username} 
                  onChange={this.handleChange} 
                  required 
                  autofocus
                />
              </div>
             </div> 

          <div class="form-group">
            <label for="firstName" class="col-sm-3 control-label">Password</label>
              <div class="col-sm-12">
                <input 
                  class="form-control"
                  id="password"
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  value={this.state.password} 
                  onChange={this.handleChange} 
                  required 
                  autofocus
                /> 
              </div>
            </div>
          <button class="btn btn-secondary btn-block" type="submit">Login</button>
          <button class="btn btn-link" onClick={this.props.handleSignUp}>Register Here</button>
          { (this.state.error !== false) &&  
              <div>
                  <FlashMessage duration={5000}>
                    <strong>{this.state.error}</strong>
                  </FlashMessage>
              </div>
          }
        </form>
      </div>
    );
  }
}