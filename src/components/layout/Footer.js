import React, { Component } from 'react';

// component 
import FilterPanel from '../filter/FilterPanel'

class Footer extends Component {
  constructor(props) {
    super(props)

    this.toggeleFilterPanel = this.toggeleFilterPanel.bind(this)
  }

  toggeleFilterPanel() {
    console.log('code reached')
  }

  render() {

    let { restaurants, updateFilter, responseId } = this.props
    return (
      <div className="footer">
        <i className="fa fa-filter" onClick={this.toggeleFilterPanel}></i>
      </div>
    )
  }
}

{/* <FilterPanel restaurants={restaurants} updateFilter={updateFilter} responseId={responseId} /> */ }


export default Footer;