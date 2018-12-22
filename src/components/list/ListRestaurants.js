import React from 'react';

const ListRestaurants = ({ restaurants }) => {
  return (
    <div className="all-restaurants">
    {
      restaurants.map((restaurant) => {
        return (
        	<div key={restaurant._id} className="restaurant-info">
            <div className="name-address">
              <div className="logo-div">
                <img src="images/hero.jpg" className="logo" />
              </div>
              <div>
            		<div className="restaurant-name">{restaurant.name}</div>
            		<div className="restaurant-locality">{restaurant.locality}</div>
            		<div className="restaurant-address">{restaurant.address}</div>
                <div className="restaurant-rating">{restaurant.rating}</div>
              </div>
            </div>
            
            <div>            
            <div className="details">
              <div className="details-title">cuisines</div>
              <div className="details-description">{`${restaurant.cuisines.join(', ')}`}</div>
            </div>

            <div className="details">
              <div className="details-title">cost for two</div>
              <div className="details-description">{restaurant.cost}</div>
            </div>
            </div>
            <div className="book-table">Book a table </div>
        	</div>
        )
      })
    }
    </div>
  );
};



export default ListRestaurants;