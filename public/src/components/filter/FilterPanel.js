import { useEffect, useState } from "react"

// components
import Filter from "./Filter"

// constants
import Constants from "../Constants"

const FilterPanel = (props) => {
  // Initialize the initial filterPanelData and its modifier function
  const [filterPanelData, setFilterPanelData] = useState({
    establishments: {},
    locality: {},
    cost: {},

    sort: {
      inc: "",
      dec: "",
      rating: "",
    },
  })

  const [restaurantsData, setResturantsData] = useState({
    restaurants: [],
    restaurantsOrig: [],
  })

  const [currentFilter, setCurrentFilter] = useState({
    cost: "",
    establishment: "",
    locality: "",
    sort: "rating",
  })

  const allConstants = Constants()

  useEffect(() => {
    updateFilterData()
  }, [props.responseId])

  const updateFilterData = () => {
    if (props.restaurants.length > 0) {
      setResturantsData({
        ...restaurantsData,
        restaurants: [...props.restaurants],
        restaurantsOrig: [...props.restaurants],
      })
      computeFilters(props.restaurants)
    }
  }

  const computeFilters = (restaurants = [...restaurantsData.restaurants]) => {
    const establishments = {}
    const cost = { low: 0, medium: 0, high: 0 }
    const locality = {}

    restaurants.forEach((restaurant) => {
      // set up the cost filter
      if (restaurant.cost < allConstants.COST_CATEGORY["low"]) {
        cost["low"] += 1
      } else if (restaurant.cost <= allConstants.COST_CATEGORY["medium"]) {
        cost["medium"] += 1
      } else {
        cost["high"] += 1
      }

      // compute different establishments count
      restaurant.establishment.forEach((establish) => {
        const typeOfEstablishment = establish.toLowerCase()

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

    setFilterPanelData({ ...filterPanelData, cost, establishments, locality })
  }

  const applyFilter = (e) => {
    const filterId = e.target.parentElement.id
    console.log("e here", filterId)

    const filterType = filterId.substring(0, filterId.indexOf("-"))
    const filterValue = filterId.substr(filterId.indexOf("-") + 1)
    const currentFilterCopy = { ...currentFilter }
    if (filterType == "sort") {
      currentFilterCopy[filterType] = filterValue
    } else {
      // if the filter is removed set it null, otherwise update it accordingly
      currentFilterCopy[filterType] =
        currentFilterCopy[filterType] == filterValue ? "" : filterValue
    }

    // update the currentFilter accordingly
    setCurrentFilter(currentFilterCopy)
    filterRestaurants(currentFilterCopy)
  }

  const sortRestaurants = (filterValue, restaurantSorted) => {
    switch (filterValue) {
      case "inc":
        restaurantSorted.sort((a, b) => {
          return a.cost - b.cost
        })
        break
      case "dec":
        restaurantSorted.sort((a, b) => {
          return b.cost - a.cost
        })
        break
      case "rating":
        restaurantSorted.sort((a, b) => {
          return b.rating - a.rating
        })
        break
    }

    props.updateFilter(restaurantSorted)
  }

  // function to filter restaurants accoring to cost, establishment and locality
  const filterRestaurants = (currentFilter) => {
    // copy the list of original restaurants saved in the filterPanelData
    let restaurantsFiltered = [...restaurantsData.restaurantsOrig]

    // apply all the filters one by one
    if (currentFilter["establishment"]) {
      restaurantsFiltered = restaurantsFiltered.filter((restaurant) => {
        return restaurant.establishment
          .join(",")
          .toLowerCase()
          .includes(currentFilter["establishment"])
      })
    }

    if (currentFilter["locality"]) {
      restaurantsFiltered = restaurantsFiltered.filter((restaurant) => {
        return restaurant.locality == currentFilter["locality"]
      })
    }

    if (currentFilter["cost"]) {
      // console.log('cost catergory', filterValue)
      switch (currentFilter["cost"]) {
        case "low":
          restaurantsFiltered = restaurantsFiltered.filter((restaurant) => {
            return (
              restaurant.cost <
              allConstants.COST_CATEGORY[currentFilter["cost"]]
            )
          })
          break
        case "medium":
          restaurantsFiltered = restaurantsFiltered.filter((restaurant) => {
            return (
              restaurant.cost <=
              allConstants.COST_CATEGORY[currentFilter["cost"]]
            )
          })
          break
        case "high":
          restaurantsFiltered = restaurantsFiltered.filter((restaurant) => {
            return (
              restaurant.cost >
              allConstants.COST_CATEGORY[currentFilter["cost"]]
            )
          })
          break
      }
    }

    // apply sort filters if any and re-compute the filters
    computeFilters(restaurantsFiltered)
    sortRestaurants(currentFilter.sort, restaurantsFiltered)
    setResturantsData({ ...restaurantsData, restaurants: restaurantsFiltered })
    props.updateFilter(restaurantsFiltered)
  }

  const { cost, establishments, locality, sort } = filterPanelData

  const allFilters = [
    { name: "sort", items: sort },
    { name: "cost", items: cost },
    { name: "establishment", items: establishments },
    { name: "locality", items: locality },
  ]

  // render
  return (
    <div className="filter-restaurants">
      {allFilters.map((ele, index) => {
        return (
          <Filter
            key={index}
            name={ele.name}
            items={ele.items}
            applyFilter={applyFilter}
            currentFilter={currentFilter}
          />
        )
      })}
    </div>
  )
}

export default FilterPanel
