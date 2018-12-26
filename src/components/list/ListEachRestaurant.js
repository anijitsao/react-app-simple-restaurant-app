import React from 'react';
import { Link } from 'react-router-dom';


const ListEachRestaurant = (props) => {
	console.log('Props received', props)
	return (
		<h1>This restaurant has id 
			<Link to="/">click to back</Link>
		</h1>
	);
}


export default ListEachRestaurant;