import React from 'react';
import { Link } from 'react-router-dom';


const ListEachRestaurant = (props) => {
	console.log('Props received', props)

	let { restaurant } = props.location
	let cuisines = restaurant["cuisines"].join(', ')
	console.log("Cuisines", cuisines)

	return (
		<div className="restaurant-details">
			<div className="restaurant-photo">

				<div className="restaurant-name-description">
					<Link to="/"><i className="fa fa-arrow-left back-arrow"></i></Link>
					{restaurant.name}
				</div>
				<div className="restaurant-rating">{restaurant.rating}</div>
			</div>
			<div className="restaurant-description">
				{
					["cost", "address", "cuisines", "establishment"].map((ele, index) => {
						// console.log('Index here', index)
						return (
							<div className="category-div" key={index}>
								<div className="category-title">{ele}</div>
								<div className="category-description">{(Array.isArray(restaurant[ele])) ? restaurant[ele].join(', ') : restaurant[ele]}</div>
							</div>
						)
					})
				}			
			</div>
		</div>
	);
}


export default ListEachRestaurant;