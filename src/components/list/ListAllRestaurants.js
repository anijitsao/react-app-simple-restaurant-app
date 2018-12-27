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
							<Link to={
								{
									pathname: `/showrestaurant/${restaurant._id}`,
									restaurant
								}
							}><img src="images/hero.jpg" className="logo" /></Link>
						</div>
						<div>
							<div className="restaurant-name">{restaurant.name}</div>
							<div className="restaurant-locality">{restaurant.locality}</div>
							<div className="restaurant-address">{restaurant.address}</div>
							<div className="restaurant-rating">{restaurant.rating}</div>
						</div>
					</div>

					<div>
						{
							["cuisines", "cost"].map((ele, index) => {
								return (
									<div className="details" key={index}>
										<div className="details-title">{(ele == "cost") ? "cost for two" : ele}</div>
										<div className="details-description">
											{
												(Array.isArray(restaurant[ele]) == true)
													? restaurant[ele].join(', ')
													:
													<Rupee value={restaurant[ele]} />
											}
										</div>
									</div>
								)
							})
						}
					</div>
				</div >
			)
		})
	);
}

const Rupee = ({ value }) => {
	return (
		<span>&#8377;{value}</span>
	)
}

export default ListAllRestaurants