import React, { Component } from 'react';

// components
import Filter from './Filter'
import EstablishmentFilter from './EstablishmentFilter'

const COST_CATEGORY = { low: 250, medium: 500, high: 500 }

class FilterRestaurants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],


      establishments: {},
      locality: {},
      cost: {},

      sort: {
        "Price Low to High": '',
        "Price High to Low": '',
        "Rating": ''
      },

      currentFilter: {
        cost: '',
        establishment: '',
        locality: ''
      },

      modifyOriginalRestaurants: true
    }

    this.applyFilter = this.applyFilter.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps and current are', nextProps, this.props)
    if (this.state.modifyOriginalRestaurants == true) {
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

    // copy the current filter from the state
    let currentFilter = { ...this.state.currentFilter }

    let filterType = filterId.substring(0, filterId.indexOf('-'))
    let filterValue = filterId.substr(filterId.indexOf('-') + 1)

    // if the filter is removed set it null
    // otherwise update it accordingly
    currentFilter[filterType] = (currentFilter[filterType] && currentFilter[filterType] == filterValue) ? '' : filterValue

    // update the state accordingly
    this.setState({ currentFilter, modifyOriginalRestaurants: false }, () => {
      console.log('Current filter types are updated, Proceed to filter restaurants')
      this.filterRestaurants(filterType, filterValue)
    })

    this.markActiveFilters()
  }

  markActiveFilters() {
    let activeFilters = []
  }

  filterRestaurants(filterType, filterValue) {

    // copy the list of original restaurants saved in the state
    let restaurantsFiltered = [...this.state.restaurantsOrig]
    let currentFilter = { ...this.state.currentFilter }

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

    this.setState({ restaurants: restaurantsFiltered }, () => {
      console.log('Restaurants are filtered, update filter count...')
      this.computeFilters()
      console.log('Fltered restaurants are', this.state)
      this.props.updateFilter(restaurantsFiltered)
    })
  }

  // render 
  render() {

    let { cost, establishments, locality, sort, currentFilter } = this.state
    return (


      <div className="filter-restaurants">
        <Filter name={'sort'} items={sort} />

        <Filter name={'cost'} items={cost} applyFilter={this.applyFilter} currentFilter={currentFilter} />
        <Filter name={'establishment'} items={establishments} applyFilter={this.applyFilter} currentFilter={currentFilter} />
        <Filter name={'locality'} items={locality} applyFilter={this.applyFilter} currentFilter={currentFilter} />

      </div>
    );
  }
};



export default FilterRestaurants;