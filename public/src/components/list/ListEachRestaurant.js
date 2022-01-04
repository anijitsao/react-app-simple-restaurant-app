// must use useLocation hook to work with react-router v6
import { Link, useLocation } from "react-router-dom"

const ListEachRestaurant = (props) => {
	const location = useLocation()
	const { restaurant } = location.state

	return (
		<div className="restaurant-details">
			<div className="restaurant-photo">
				<div className="restaurant-name-description">
					<Link to="/">
						<i className="fa fa-arrow-left back-arrow"></i>
					</Link>
					{restaurant.name}
				</div>
				<div className="restaurant-rating">{restaurant.rating}</div>
			</div>
			<div className="restaurant-description">
				{["cost", "address", "cuisines", "establishment"].map(
					(ele, index) => {
						// console.log('Index here', index)
						return (
							<div className="category-div" key={index}>
								<div className="category-title">{ele}</div>
								<div className="category-description">
									{Array.isArray(restaurant[ele])
										? restaurant[ele].join(", ")
										: restaurant[ele]}
								</div>
							</div>
						)
					}
				)}
			</div>
		</div>
	)
}

export default ListEachRestaurant
