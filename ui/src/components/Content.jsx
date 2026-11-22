// dependencies
import { useEffect, useState } from "react"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

// components
import SearchBar from "./search/SearchBar"
import RestaurantPanel from "./RestaurantPanel"
import Loading from "./Loading"
import { SearchProvider, SearchConsumer } from "./search/SearchContext"

// constants
import Constants from "./Constants"

const Content = (props) => {
  // Initialize the initial content and its modifier function
  const [content, setContent] = useState({
    restaurants: [],
    showLoading: false,
    modifyOrig: false,
    responseId: "",
  })

  const allConstants = Constants()

  const searchTextChange = (e) => {
    // change the content with the value typed in the search box
    setContent({ ...content, searchText: e.target.value })
    if (e.keyCode == 13 || e.which == 13) {
      searchByValue()
    }
  }

  useEffect(() => {
    getRestaurants()
  }, [])

  const searchByValue = (e) => {
    if (e) {
      const id = e.target.id
      console.log("Function clicked from COntext", id)

      const searchType = id.substring(0, id.indexOf("-"))
      const searchValue = id.substr(id.indexOf("-") + 1)

      // define the data
      const data = {}
      data[searchType] = searchValue

      // define url
      const url = allConstants.getRestaurants.replace("{value}", "")

      // API call to the back end
      getRestaurants(url, data)
    } else if (content.searchText != "") {
      // if ENTER key is pressed
      console.log(
        "ENTER key pressed / SEARCH button clicked...",
        content.searchText
      )

      // API call to the back end
      getRestaurants()
    }
  }

  // get all the restaurants
  const getRestaurants = async (url, data) => {
    // set content to show the Loading icon
    setContent({ ...content, showLoading: true })

    const searchText =
      content.searchText && props.searchText !== content.searchText
        ? content.searchText
        : props.searchText
    const axiosConfig = {
      url: url
        ? url
        : allConstants.getRestaurants.replace("{value}", searchText),
      method: allConstants.method.POST,
      header: allConstants.header,
    }

    if (data) {
      axiosConfig["data"] = data
    }

    try {
      const res = await axios(axiosConfig)

      // add the response along with an unique id for each response
      setContent({
        restaurants: [...res.data],
        showLoading: false,
        modifyOrig: true,
        responseId: uuidv4(),
      })
    } catch (err) {
      console.log("unable to get the data", err)
    }
  }

  const { restaurants, showLoading, modifyOrig, responseId } = content
  // console.log('content in the Content', content)

  return (
    <div className="content-div">
      <div className="content-div-search-bar">
        <SearchBar
          searchByValue={searchByValue}
          searchTextChange={searchTextChange}
        />
      </div>
      {showLoading == true && <Loading />}
      <SearchProvider value={searchByValue}>
        <RestaurantPanel
          showLoading={showLoading}
          restaurants={restaurants}
          modifyOrig={modifyOrig}
          responseId={responseId}
        />
      </SearchProvider>
    </div>
  )
}

export default Content
