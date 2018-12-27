import React from 'react';
import { Link } from 'react-router-dom';


const ListEachRestaurant = (props) => {
	console.log('Props received', props)
	let { restaurant } = props.location
	return (
		<div className="restaurant-details">
			<div className="restaurant-photo">

				<div className="restaurant-name-description">
					<Link to="/"><i className="fa fa-arrow-left"></i></Link>
					{restaurant.name}
				</div>
				<div className="restaurant-rating">{restaurant.rating}</div>
			</div>
			<div className="restaurant-description">
				<div className="category-div">
					<div className="category-title">cuisine</div>
					<div className="category-description">{restaurant.cuisines.join(', ')}</div>
				</div>
				<div className="category-div">
					<div className="category-title">address</div>
					<div className="category-description">{restaurant.address}</div>
				</div>
			</div>
		</div>
	);
}


export default ListEachRestaurant;