import React, { Component } from 'react';

// components
import Filter from './Filter'

const COST_CATEGORY = { low: 250, medium: 500, high: 500 }

class FilterPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],

      establishments: {},
      locality: {},
      cost: {},

      sort: {
        "inc": '',
        "dec": '',
        "rating": ''
      },
      sortFilter: {
        "sort": 'rating'
      },

      currentFilter: {
        cost: '',
        establishment: '',
        locality: ''
      },

      modifyOriginalRestaurants: true,
      responseId: this.props.responseId

    }

    this.applyFilter = this.applyFilter.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // console.log('Response IDs in FilterRestaurant', nextProps.responseId, ' and current ', this.props.responseId)
    

    if (nextProps.responseId != this.props.responseId) {
      this.setState({ restaurants: [...nextProps.restaurants], restaurantsOrig: [...nextProps.restaurants] }, () => {
        this.computeFilters()
      })
    }
  }

  computeFilters() {
    let restaurants = [...this.state.restaurants]

    let establishments = {}
    let cost = { "low": 0, "medium": 0, "high": 0 }
    let locality = {}

    restaurants.forEach((restaurant) => {

      // set up the cost filter
      if (restaurant.cost < COST_CATEGORY['low']) {
        cost["low"] += 1
      } else if (restaurant.cost <= COST_CATEGORY['medium']) {
        cost["medium"] += 1
      } else {
        cost["high"] += 1
      }

      // compute different establishments count
      restaurant.establishment.forEach((establish) => {
        let typeOfEstablishment = establish.toLowerCase()

        // if establishment is already present increment it
        if (establishments[typeOfEstablishment]) {
          establishments[typeOfEstablishment] += 1
        } else {
          establishments[typeOfEstablishment] = 1
        }
      })

      // compute the locality
      if (locality[restaurant.locality]) {
        locality[restaurant.locality] += 1
      } else {
        locality[restaurant.locality] = 1
      }
    })

    this.setState({ cost, establishments, locality }, () => {
      console.log('state updated with Filters', this.state)
    })
  }

  applyFilter(event) {
    event.persist()
    let filterId = event.target.parentElement.id
    console.log('event here', filterId)


    let filterType = filterId.substring(0, filterId.indexOf('-'))
    let filterValue = filterId.substr(filterId.indexOf('-') + 1)

    if (filterType == 'sort') {
      // copy the sort filter from the state
      let sortFilter = { ...this.state.sortFilter }
      sortFilter[filterType] = filterValue

      // update the state accordingly
      this.setState({ sortFilter }, () => {
        console.log('Sort filter applied')
        this.sortRestaurants(filterType, filterValue)
      })

    } else {

      // copy the current filter from the state
      let currentFilter = { ...this.state.currentFilter }

      // if the filter is removed set it null
      // otherwise update it accordingly
      currentFilter[filterType] = (currentFilter[filterType] && currentFilter[filterType] == filterValue) ? '' : filterValue

      // update the state accordingly
      this.setState({ currentFilter }, () => {
        console.log('Current filter types are updated, Proceed to filter restaurants')
        this.filterRestaurants(filterType, filterValue, currentFilter)
      })
    }
  }

  sortRestaurants(filterType, filterValue) {
    let restaurantSorted = [...this.state.restaurants]
    switch (filterValue) {
      case 'inc':
        restaurantSorted = restaurantSorted.sort((a, b) => { return a.cost > b.cost })
        break;
      case 'dec':
        restaurantSorted = restaurantSorted.sort((a, b) => { return a.cost < b.cost })
        break;
      case 'rating':
        restaurantSorted = restaurantSorted.sort((a, b) => { return a.rating < b.rating })
        break;
    }

    this.props.updateFilter(restaurantSorted)
    this.setState({ modifyOriginalRestaurants: false })
  }

  // function to filter restaurants accoring to cost, establishment and locality
  filterRestaurants(filterType, filterValue, currentFilter) {

    // copy the list of original restaurants saved in the state
    let restaurantsFiltered = [...this.state.restaurantsOrig]

    if (filterType == 'establishment' && currentFilter[filterType]) {
      restaurantsFiltered = restaurantsFiltered.filter((restaurant) => {
        return restaurant.establishment.join(',').toLowerCase().indexOf(filterValue) > -1
      })
    }

    if (filterType == 'locality' && currentFilter[filterType]) {
      restaurantsFiltered = restaurantsFiltered.filter((restaurant) => {
        return restaurant.locality == filterValue
      })
    }

    if (filterType == 'cost' && currentFilter[filterType]) {
      console.log('cost catergory', filterValue)
      switch (filterValue) {
        case 'low':
          restaurantsFiltered = restaurantsFiltered.filter((restaurant) => {
            return restaurant.cost < COST_CATEGORY[filterValue]
          })
          break;
        case 'medium':
          restaurantsFiltered = restaurantsFiltered.filter((restaurant) => {
            return restaurant.cost <= COST_CATEGORY[filterValue]
          })
          break;
        case 'high':
          restaurantsFiltered = restaurantsFiltered.filter((restaurant) => {
            return restaurant.cost > COST_CATEGORY[filterValue]
          })
          break;
      }
    }

    this.setState({ restaurants: restaurantsFiltered, modifyOriginalRestaurants: false }, () => {
      this.computeFilters()
      // console.log('Filtered restaurants are', this.state)
      this.props.updateFilter(restaurantsFiltered)
    })
  }

  // render 
  render() {

    let { cost, establishments, locality, sort, currentFilter, sortFilter } = this.state
    currentFilter['sort'] = sortFilter['sort']
    return (

      <div className="filter-restaurants">
        <Filter name={'sort'} items={sort} applyFilter={this.applyFilter} currentFilter={currentFilter} />

        <Filter name={'cost'} items={cost} applyFilter={this.applyFilter} currentFilter={currentFilter} />
        <Filter name={'establishment'} items={establishments} applyFilter={this.applyFilter} currentFilter={currentFilter} />
        <Filter name={'locality'} items={locality} applyFilter={this.applyFilter} currentFilter={currentFilter} />

      </div>
    );
  }
};



export default FilterPanel;