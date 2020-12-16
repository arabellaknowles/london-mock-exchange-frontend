import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username:"",
      password:"",
      loginErrors: "",
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
    axios.post("http://localhost:8000/api/v1/rest-auth/login/", {
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
      alert("Login failed, please try again", error);
    })
    event.preventDefault();
  }

  render() {
    return (
      <div class="container">
        <form class="form-horizontal" onSubmit={this.handleSubmit}>
        <h2>Login</h2>
          <div class="form-group row">
            <label for="firstName" class="col-sm-3 control-label">Username</label>
              <div class="col-sm-9">
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

          <div class="form-group row">
            <label for="firstName" class="col-sm-3 control-label">Password</label>
              <div class="col-sm-9">
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
          <button class="btn btn-secondary btn-block" type="submit">Login</button>
        </form>
        <button class="btn btn-link" onClick={this.props.handleSignUp}>Register Here</button>
      </div>
    );
  }
}