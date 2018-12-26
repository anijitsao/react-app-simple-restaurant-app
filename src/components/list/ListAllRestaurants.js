import React from 'react';
import { Link } from 'react-router-dom';

const ListAllRestaurants = (props) => {
	console.log('Props in ListAllRestaurant', props)

	let { restaurants } = props

	return (
		restaurants.map((restaurant) => {
			return (
				<div key={restaurant._id} className="restaurant-info">
					<div className="name-address">
						<div className="logo-div">
							<Link to={`/showrestaurant/${restaurant.name}`}><img src="images/hero.jpg" className="logo" /></Link>
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
	);
}


export default ListAllRestaurants