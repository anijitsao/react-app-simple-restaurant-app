import React from 'react';
import { Link } from 'react-router-dom';


const ListEachRestaurant = (props) => {
	console.log('Props received', props)
	return (
		<div className="restaurant-details">
			<Link to="/"><i className="fa fa-arrow-left"></i></Link>
			
		</div>
	);
}


export default ListEachRestaurant;