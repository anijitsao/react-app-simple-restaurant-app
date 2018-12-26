import React, { Component } from 'react';

// components
import FilterRestaurants from './filter/FilterRestaurants'
import ListRestaurants from './list/ListRestaurants'

class ShowRestaurants extends Component {

  constructor(props) {
    super(props)
    this.state = {
      restaurants: [...this.props.restaurants],
      modifyOrig: false,
      responseId: this.props.responseId
    }

    this.updateFilter = this.updateFilter.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log('responseid from nextprops and currentProps', nextProps.responseId, ' and current ', this.props.responseId)
    // if (nextProps.modifyOrig !== this.props.modifyOrig) {
    //   this.setState({ restaurants: [...nextProps.restaurants], modifyOrig: true })
    // } else if (nextProps.modifyOrig == true && this.state.modifyOrig == false) {
    //   this.setState({ restaurants: [...nextProps.restaurants], modifyOrig: true })
    // }

    if (nextProps.responseId != this.props.responseId) {
      this.setState({ restaurants: [...nextProps.restaurants], modifyOrig: true, responseId: nextProps.responseId })
    }

  }

  updateFilter(restaurants) {
    console.log('FilterRestaurants are', restaurants)
    this.setState({ restaurants, modifyOrig: false })
  }

  render() {

    let { restaurants, modifyOrig, responseId } = this.state
    let { showLoading } = this.props
    let showRestaurantsStyle = (showLoading == true) ? "restaurants-list hide-div" : "restaurants-list"

    return (
      <div className={showRestaurantsStyle}>
        <FilterRestaurants restaurants={restaurants} updateFilter={this.updateFilter} modifyOrig={modifyOrig} responseId={responseId} />
        <ListRestaurants restaurants={restaurants} />
      </div>
    );
  }
};



export default ShowRestaurants;