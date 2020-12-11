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
      console.log("login error", error);
    })
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="username" 
            name="username" 
            placeholder="Username" 
            value={this.state.username} 
            onChange={this.handleChange} 
            required 
          />

          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={this.state.password} 
            onChange={this.handleChange} 
            required 
          /> 

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}