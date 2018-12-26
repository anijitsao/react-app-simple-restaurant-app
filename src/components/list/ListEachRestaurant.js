import React from 'react';
import { Link } from 'react-router-dom';


const ListEachRestaurant = (props) => {
	console.log('Props received', props)
	let { restaurant } = props.location
	return (
		<div className="restaurant-details">
			<Link to="/"><i className="fa fa-arrow-left"></i></Link>
			{restaurant.name}
		</div>
	);
}


export default ListEachRestaurant;