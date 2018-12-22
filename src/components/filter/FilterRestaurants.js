import React, { Component } from 'react';

// components
import Filter from './Filter'
import EstablishmentFilter from './EstablishmentFilter'


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
      }
    }

    this.applyFilter = this.applyFilter.bind(this)
  }

    componentWillReceiveProps(nextProps) {
      // console.log('nextProps and current are', nextProps, this.props)

      if (nextProps.restaurants.length != this.props.restaurants.length) {
        this.setState({ restaurants: [...nextProps.restaurants] }, () => {

          this.computeFilters()
        })

      }
    }

    computeFilters() {
      let { restaurants } = this.state

      let establishments = {}
      let cost = { "less Than 250": 0, "250 To 500": 0, "more Than 500": 0 }
      let locality = {}

      restaurants.forEach((restaurant) => {

        // set up the cost filter
        if (restaurant.cost < 250) {
          cost["less than 250"] += 1
        } else if (restaurant.cost <= 500) {
          cost["250 To 500"] += 1
        } else {
          cost["more Than 500"] += 1
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
      console.log('event here', event.target.parentElement.id)
    } 


    // render 
    render() {

      let { cost, establishments, locality, sort } = this.state
      return (


        <div className="filter-restaurants">
	      	<Filter name={'Sort'} items={sort}/>

	      	<Filter name={'Cost'} items={cost} applyFilter={this.applyFilter}/>
	      	<Filter name={'Establishment'} items={establishments} applyFilter={this.applyFilter}/>
	      	<Filter name={'Locality'} items={locality} applyFilter={this.applyFilter}/>

	      </div>
      );
    }
  };



  export default FilterRestaurants;