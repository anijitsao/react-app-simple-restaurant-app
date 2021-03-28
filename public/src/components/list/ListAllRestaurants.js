import React from 'react';
import { Link } from 'react-router-dom';


import { SearchConsumer } from '../search/SearchContext'

const ListAllRestaurants = (props) => {
	// console.log('Props in ListAllRestaurant', props)

	let { restaurants, searchByValue } = props

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
							<SearchConsumer>
								{
									(context) => {
										return (
											<React.Fragment>
												<div className="restaurant-name underline-div" id={`name-${restaurant.name}`} onClick={context}>{restaurant.name}</div>
												<div className="restaurant-locality underline-div" id={`locality-${restaurant.locality}`} onClick={context}>{restaurant.locality}</div>
											</React.Fragment>
										)
									}
								}
							</SearchConsumer>
							<div className="restaurant-address">{restaurant.address}</div>
							<div className="restaurant-rating">{restaurant.rating}</div>
						</div>
					</div>

					<div>
						{

							["cuisines", "establishment", "cost"].map((ele, index) => {
								return (
									<div className="details" key={index}>
										<div className="details-title">{(ele == "cost") ? "cost for two" : ele}</div>
										<SearchConsumer>
											{
												(context) => {
													return (
														<div className="details-description">
															{
																(Array.isArray(restaurant[ele]) == true)
																	? restaurant[ele].map((value, index, valueArray) => { return <span className="underline-div" key={index} id={`${ele}-${value}`} onClick={context}>{(index != valueArray.length - 1) ? `${value}, ` : value}</span> })
																	:
																	<Rupee value={restaurant[ele]} searchingContext={context} />
															}
														</div>
													)
												}

											}

										</SearchConsumer>
									</div>
								)
							})

						}
					</div>
					<Link to={
						{
							pathname: `/showrestaurant/${restaurant._id}`,
							restaurant
						}

					}>< div className="view-details-div">view details</div>
					</Link>

				</div >
			)
		})
	);
}

const Rupee = ({ value, searchingContext }) => {
	return (
		<span className="underline-div" id={`cost-${value}`} onClick={searchingContext}>&#8377;{value}</span>
	)
}

export default ListAllRestaurants