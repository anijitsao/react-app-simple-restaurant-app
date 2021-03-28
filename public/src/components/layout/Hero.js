import React, { Component } from 'react';

// components
import SearchBar from '../search/SearchBar'

class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    }

    this.searchTextChange = this.searchTextChange.bind(this)
    this.searchByValue = this.searchByValue.bind(this)
  }

  searchTextChange(event) {
    event.persist()
    // change the state with the value typed in the search box
    this.setState({ searchText: event.target.value })

    if (event.keyCode == 13 || event.which == 13) {
      this.searchByValue()
    }

  }

  searchByValue() {
    // if ENTER key is pressed
    if (this.state.searchText != "") {
      console.log('ENTER key pressed / SEARCH button clicked...', this.state.searchText)
      this.props.searchByValue(this.state.searchText)
    }
  }

  render() {

    let { searchText } = this.state
    let { searchByValue } = this.props

    return (
      <div className="hero-div">
        <div className="find-title">Find the best restaurants, cafés, and bars</div>
        <SearchBar
          searchText={searchText}
          searchTextChange={this.searchTextChange}
          searchByValue={this.searchByValue} />
      </div>
    );
  }
};



export default Hero;