// dependencies
import React, { Component } from 'react';
import axios from 'axios';

// components
import SearchBar from './search/SearchBar'
import ShowRestaurants from './ShowRestaurants'

// constants
import Constants from './Constants'

class Content extends Component {
  // static propTypes = {
  //     className: PropTypes.string,
  // };

  constructor(props) {
    super(props);

    this.searchTextChange = this.searchTextChange.bind(this)
    this.searchByValue = this.searchByValue.bind(this)

    this.state = {
      restaurants: [],
      showLoading: false
    }

    this.allConstants = new Constants()
    console.log('Received props', this.props)
  }


  searchTextChange(event) {
    event.persist()
    // change the state with the value typed in the search box
    this.setState({ searchText: event.target.value })

    if (event.keyCode == 13 || event.which == 13) {
      this.searchByValue()
    }

  }

  componentDidMount() {
    this.getRestaurants()
  }

  searchByValue() {
    // if ENTER key is pressed
    if (this.state.searchText != "") {
      console.log('ENTER key pressed / SEARCH button clicked...', this.state.searchText)

      // API call to the back end
      this.getRestaurants()
    }
  }

  // get all the restaurants
  getRestaurants() {
    const { allConstants } = this

    // set state to show the Loading icon
    this.setState({ showLoading: true })

    axios({
      method: allConstants.method.POST,
      url: allConstants.getRestaurants.replace('{value}', this.props.searchText),
      header: allConstants.header
    })
      .then((res) => {
        console.log('Response from back end', res.data)
        
        this.setState({ restaurants: [...res.data] })
      })
      .catch((err) => {
        console.log('unable to get the data', err)
      })
  }

  render() {

    let { restaurants } = this.state
    return (
      <div className="content-div">

        <SearchBar
          searchByValue={this.searchByValue}
          searchTextChange={this.searchTextChange} />

        <ShowRestaurants restaurants={restaurants} />
      </div>
    );
  }
}

export default Content;