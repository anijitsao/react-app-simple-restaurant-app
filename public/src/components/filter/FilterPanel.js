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

      responseId: this.props.responseId
    }

    this.applyFilter = this.applyFilter.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // console.log('Response IDs in FilterRestaurant', nextProps.responseId, ' and current ', this.props.responseId)
    // console.log('Next props are ', nextProps)
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
        this.sortRestaurants(filterValue)
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

  sortRestaurants(filterValue) {
    let restaurantSorted = [...this.state.restaurants]

    switch (filterValue) {
      case 'inc':
        restaurantSorted = restaurantSorted.sort((a, b) => { return a.cost - b.cost })
        break;
      case 'dec':
        restaurantSorted = restaurantSorted.sort((a, b) => { return b.cost - a.cost })
        break;
      case 'rating':
        restaurantSorted = restaurantSorted.sort((a, b) => { return b.rating - a.rating })
        break;
    }

    this.props.updateFilter(restaurantSorted)
    // this.setState({ modifyOriginalRestaurants: false })
  }

  // function to filter restaurants accoring to cost, establishment and locality
  filterRestaurants(filterType, filterValue, currentFilter) {

    // copy the list of original restaurants saved in the state
    let restaurantsFiltered = [...this.state.restaurantsOrig]

    // apply all the filters one by one    
    if (currentFilter['establishment']) {
      restaurantsFiltered = restaurantsFiltered.filter((restaurant) => {
        return restaurant.establishment.join(',').toLowerCase().indexOf(currentFilter['establishment']) > -1
      })
    }

    if (currentFilter['locality']) {
      restaurantsFiltered = restaurantsFiltered.filter((restaurant) => {
        return restaurant.locality == currentFilter['locality']
      })
    }

    if (currentFilter['cost']) {
      // console.log('cost catergory', filterValue)
      switch (currentFilter['cost']) {
        case 'low':
          restaurantsFiltered = restaurantsFiltered.filter((restaurant) => {
            return restaurant.cost < COST_CATEGORY[currentFilter['cost']]
          })
          break;
        case 'medium':
          restaurantsFiltered = restaurantsFiltered.filter((restaurant) => {
            return restaurant.cost <= COST_CATEGORY[currentFilter['cost']]
          })
          break;
        case 'high':
          restaurantsFiltered = restaurantsFiltered.filter((restaurant) => {
            return restaurant.cost > COST_CATEGORY[currentFilter['cost']]
          })
          break;
      }
    }

    this.setState({ restaurants: restaurantsFiltered }, () => {
      this.computeFilters()
      // console.log('Filtered restaurants are', this.state)
      this.props.updateFilter(restaurantsFiltered)
    })
  }

  // render 
  render() {

    let { cost, establishments, locality, sort, currentFilter, sortFilter } = this.state
    currentFilter['sort'] = sortFilter['sort']

    let allFilters = [
      { name: 'sort', items: sort },
      { name: 'cost', items: cost },
      { name: 'establishment', items: establishments },
      { name: 'locality', items: locality }
    ]

    return (

      <div className="filter-restaurants">
        {
          allFilters.map((ele, index) => {
            return (
              <Filter key={index} name={ele.name} items={ele.items} applyFilter={this.applyFilter} currentFilter={currentFilter} />
            )
          })
        }

      </div>
    );
  }
};



export default FilterPanel;