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
    const today = '2020-12-02' // get today's date function
    const headline_url = `http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?from-date=${today}&to-date=${today}`
    axios.get(headline_url)
    .then((response) => {
      this.setState({
        headlines: response.data.response.results
      })
      console.log(response.data.response.results)
    })
    .catch(error => console.log(error))
  }

  render(){
    return(
      <div>
        {this.state.headlines.map((headline) => 
          <NewsHeadline headline={headline.webTitle}/>
        )}
      </div>
    )
  }
}