import React, { Component } from 'react';

// components
import FilterRestaurants from './filter/FilterRestaurants'
import ListRestaurants from './list/ListRestaurants'

class ShowRestaurants extends Component {

  constructor(props) {
    super(props)
    this.state = {
      restaurants: [...this.props.restaurants]
    }

    this.updateFilter = this.updateFilter.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.restaurants.length != this.props.restaurants.length) {
      this.setState({ restaurants: [...nextProps.restaurants] })
    }
  }
  
  updateFilter(restaurants) {
    console.log('FilterRestaurants are', restaurants)
    this.setState({ restaurants })
  }

  render() {

    let { restaurants } = this.state
    return (
      <div className="restaurants-list">
    	<FilterRestaurants restaurants={restaurants} updateFilter={this.updateFilter}/>
    	<ListRestaurants restaurants={restaurants}/>
    </div>
    );
  }
};



export default ShowRestaurants;