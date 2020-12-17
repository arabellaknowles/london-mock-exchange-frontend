import React, { Component } from 'react';
import axios from 'axios';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username:"",
      email: "",
      password:"",
      password_confirmation: "",
      registrationErrors: "",
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
    axios.post("http://localhost:8000/api/v1/rest-auth/registration/", {
        username: this.state.username,
        email: this.state.email,
        password1: this.state.password,
        password2: this.state.password_confirmation,
    },
    { withCredentials: true }
    )
    .then(response => {
      if (response.statusText === "Created" ) {
      this.props.handleSuccessfulAuth(response.data);
      }
    })
    .then(() => this.props.notSigningUp())
    .catch(error => {
      console.log("registration error", error);
    })
    event.preventDefault();
  }

  render() {
    return (
      <div class="container">
        <form class="form-horizontal" role="form" onSubmit={this.handleSubmit}>
        <h1 class="mt-5">London Mock Exchange</h1>
        <p class="lead">Create an account</p>
          <div class="form-group">
            <label for="firstName" class="col-sm-3 control-label">Username</label>
              <div class="col-sm-12">
                <input 
                  type="username" 
                  name="username" 
                  placeholder="Username" 
                  value={this.state.username} 
                  onChange={this.handleChange} 
                  required 
                />
              </div>
            </div>

          <div class="form-group">
            <label for="firstName" class="col-sm-3 control-label">Email</label>
              <div class="col-sm-12">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  value={this.state.email} 
                  onChange={this.handleChange} 
                  required 
                /> 
              </div>
          </div>

          <div class="form-group">
            <label for="firstName" class="col-sm-3 control-label">Password</label>
              <div class="col-sm-12">
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  value={this.state.password} 
                  onChange={this.handleChange} 
                  required 
                /> 
              </div>
          </div>

          <div class="form-group">
            <label for="firstName" class="col-sm-3 control-label">Password Confirmation</label>
              <div class="col-sm-12">
                <input 
                  type="password" 
                  name="password_confirmation" 
                  placeholder="Password confirmation" 
                  value={this.state.password_confirmation} 
                  onChange={this.handleChange} 
                  required 
                /> 
              </div>
          </div>
          <button class="btn btn-success btn-block" type="submit">Register</button>
          <button class="btn btn-link" onClick={this.props.notSigningUp}>Already registered? Login here</button>
        </form>
      </div>
    );
  }
}