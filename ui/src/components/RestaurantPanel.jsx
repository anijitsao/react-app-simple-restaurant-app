import { useEffect, useState } from "react"

// components
import FilterPanel from "./filter/FilterPanel"
import ListPanel from "./list/ListPanel"
import Footer from "./layout/Footer"

const RestaurantsPanel = (props) => {
  // Initialize the initial restaurantPanelData and its modifier function
  const [restaurantPanelData, setRestaurantPanelData] = useState({
    restaurants: [...props.restaurants],
    modifyOrig: false,
    responseId: props.responseId,
  })

  useEffect(() => {
    setRestaurantPanelData({
      ...restaurantPanelData,
      restaurants: [...props.restaurants],
      modifyOrig: true,
      responseId: props.responseId,
    })
  }, [props.responseId])

  const updateFilter = (restaurants) => {
    setRestaurantPanelData({
      ...restaurantPanelData,
      restaurants,
      modifyOrig: false,
    })
  }

  const { restaurants, modifyOrig, responseId } = restaurantPanelData
  const { showLoading } = props
  let showRestaurantsStyle =
    showLoading == true ? "restaurants-list hide-div" : "restaurants-list"

  // if no restaurants found
  showRestaurantsStyle =
    restaurants.length == 0 ? "restaurants-list hide-div" : "restaurants-list"

  const showFooter = window.innerWidth < 500 ? true : false

  return (
    <>
      {restaurants.length == 0 && showLoading == false && (
        <div className="no-restaurant-div">No restaurant found</div>
      )}

      <div className={showRestaurantsStyle}>
        {showFooter == false && (
          <FilterPanel
            restaurants={restaurants}
            updateFilter={updateFilter}
            modifyOrig={modifyOrig}
            responseId={responseId}
          />
        )}
        <ListPanel restaurants={restaurants} />
      </div>
      {showFooter == true ? (
        <Footer
          showRestaurantsStyle={showRestaurantsStyle}
          restaurants={restaurants}
          updateFilter={updateFilter}
          modifyOrig={modifyOrig}
          responseId={responseId}
        />
      ) : null}
    </>
  )
}

export default RestaurantsPanel
