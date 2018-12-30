import React, { Component } from 'react';

// components
import FilterPanel from './filter/FilterPanel'
import ListPanel from './list/ListPanel'
import Footer from './layout/Footer'

class RestaurantsPanel extends Component {

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
    // console.log('responseid from nextprops and currentProps', nextProps.responseId, ' and current ', this.props.responseId)
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

    // if no restaurants found
    showRestaurantsStyle = (restaurants.length == 0) ? "restaurants-list hide-div" : "restaurants-list"

    let showFooter = false
    if (window.innerWidth < 500) {
      showFooter = true
    }
    return (
      <React.Fragment>
        {(restaurants.length == 0 && showLoading == false) ?
          <div className="no-restaurant-div">No restaurant found</div>
          : null
        }
        <div className={showRestaurantsStyle}>
          {(showFooter == false) ?
            <FilterPanel restaurants={restaurants} updateFilter={this.updateFilter} modifyOrig={modifyOrig} responseId={responseId} />
            : null
          }
          <ListPanel restaurants={restaurants} />

        </div>
        {(showFooter == true) ? <Footer showRestaurantsStyle={showRestaurantsStyle} restaurants={restaurants} updateFilter={this.updateFilter} modifyOrig={modifyOrig} responseId={responseId} /> : null}
      </React.Fragment>
    );
  }
};



export default RestaurantsPanel;