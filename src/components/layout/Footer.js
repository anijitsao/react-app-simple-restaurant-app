import React, { Component } from 'react';

// component 
import FilterPanel from '../filter/FilterPanel'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFilters: false
    }
    this.toggeleFilterPanel = this.toggeleFilterPanel.bind(this)
  }

  toggeleFilterPanel() {
    console.log('code reached')
    this.setState((prevState, prevProps) =>
      (
        { showFilters: !prevState.showFilters }
      ))
  }

  render() {

    let { restaurants, updateFilter, responseId, showRestaurantsStyle } = this.props
    let { showFilters } = this.state

    let showFiltersStyle = (showFilters == true) ? 'filter-panel' : 'filter-panel hide-div'
    let showFooterStyle = (showRestaurantsStyle == false) ? 'footer hide-div' : 'footer'

    console.log('ShowFilters is here', showFilters)
    return (
      <div className={showFooterStyle} onClick={this.toggeleFilterPanel}>
        <div>
          <i className="fa fa-filter" aria-hidden="true"></i>
          <span>filter</span>
        </div>

        <div className={showFiltersStyle}>
          <FilterPanel restaurants={restaurants} updateFilter={updateFilter} responseId={responseId} />
        </div>
      </div>
    )
  }
}



export default Footer;