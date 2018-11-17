import React from 'react';

const ListRestaurants = ({ restaurants }) => {
  return (
    restaurants.map((restaurant) => {
      return (
      	<div key={restaurant._id} className="restaurant-info">
      		<div className="restaurant-name">{restaurant.name}</div>
      		<div className="restaurant-cuisines">{restaurant.cuisines.join(', ')}</div>
      		<div className="restaurant-address">{restaurant.address}</div>
      	</div>
      )
    })
  );
};



export default ListRestaurants;