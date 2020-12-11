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
      if (response.data.status === 'created') {
      this.props.handleSuccessfulAuth(response.data);
      }
    })
    .catch(error => {
      console.log("registration error", error);
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
            type="email" 
            name="email" 
            placeholder="Email" 
            value={this.state.email} 
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

          <input 
            type="password" 
            name="password_confirmation" 
            placeholder="Password confirmation" 
            value={this.state.password_confirmation} 
            onChange={this.handleChange} 
            required 
          /> 
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}