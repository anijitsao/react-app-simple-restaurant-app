import { useState } from "react"

// component
import FilterPanel from "../filter/FilterPanel"

const Footer = (props) => {
  // Initialize the initial state and its modifier function
  const [footerData, setFooterData] = useState({ showFilters: false })

  const toggeleFilterPanel = () => {
    setFooterData({ ...footerData, showFilters: !footerData.showFilters })
  }

  const { restaurants, updateFilter, responseId, showRestaurantsStyle } = props
  const { showFilters } = footerData

  const showFiltersStyle =
    showFilters == true ? "filter-panel" : "filter-panel hide-div"
  const showFooterStyle =
    showRestaurantsStyle == false ? "footer hide-div" : "footer"

  console.log("ShowFilters is here", showFilters)
  return (
    <div className={showFooterStyle} onClick={toggeleFilterPanel}>
      <div>
        <i className="fa fa-filter" aria-hidden="true"></i>
        <span>filter</span>
      </div>

      <div className={showFiltersStyle}>
        <FilterPanel
          restaurants={restaurants}
          updateFilter={updateFilter}
          responseId={responseId}
        />
      </div>
    </div>
  )
}

export default Footer
