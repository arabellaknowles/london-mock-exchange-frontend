import React, { Component } from "react";
import axios from 'axios';
import NewsHeadline from './NewsHeadline'

export default class NewsList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        headlines: []
      }
    this.fetchNewsHeadlines = this.fetchNewsHeadlines.bind(this)
  }

  componentDidMount(){
    this.fetchNewsHeadlines()
  }

  fetchNewsHeadlines(){
    const date = this._getTodaysDate()
    const headline_url = `https://content.guardianapis.com/search?from-date=${date}&to-date=${date}&show-elements=image&show-fields=thumbnail&q=finance&api-key=78fb758b-9cd0-48e8-96c1-fe29eb42c6d0`
    axios.get(headline_url)
    .then((response) => {
      this.setState({
        headlines: response.data.response.results
      })
    })
    .catch(error => console.log(error))
  }

  _getTodaysDate(){
    return (new Date().toJSON().slice(0,10))
  }

  render(){
    return(
      <div>
        <h1>Financial Articles</h1>
        {this.state.headlines.map((headline) => 
          <NewsHeadline headline={headline.webTitle} thumbnail={headline.fields.thumbnail} url={headline.webUrl}/>
        )}
      </div>
    )
  }
}