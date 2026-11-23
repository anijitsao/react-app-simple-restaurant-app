import React from "react"
import { Routes, Route } from "react-router-dom"

// components
import ListAllRestaurants from "./ListAllRestaurants"
import ListEachRestaurant from "./ListEachRestaurant"

const ListPanel = (props) => {
  const { restaurants } = props

  return (
    <div className="all-restaurants">
      <Routes>
        <Route
          path="/"
          element={<ListAllRestaurants restaurants={restaurants} />}
        ></Route>
        <Route
          path="/showrestaurant/:id"
          element={<ListEachRestaurant {...props} />}
        ></Route>
      </Routes>
    </div>
  )
}

export default ListPanel
