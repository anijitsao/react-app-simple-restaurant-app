import React from 'react';
import Parser from 'html-react-parser';

const MAPPING = {
	cost: "cost for two",
	establishment: "establishment type",
	low: "less Than &#8377;250",
	medium: "&#8377;250 To &#8377;500",
	high: "&#8377;500+",

	inc: "Price low to high",
	dec: "Price high to low",
	rating: "Rating"
}
const Filter = ({ name, items, applyFilter, currentFilter }) => {
	const keys = Object.keys(items)

	return (
		<div className="filter-info">
			<div className="filter-title">{(MAPPING[name]) ? MAPPING[name] : name}</div>
			{
				keys.map((key, index) => {

					let filterClass = (currentFilter && currentFilter[name] !== key) ? "item-info" : (name == 'sort') ? "item-info active-item-sort" : "item-info active-item"

					return (
						<div key={index} id={`${name}-${key}`} className={filterClass} onClick={applyFilter}>
							<div className="item-name">{(MAPPING[key]) ? Parser(MAPPING[key]) : key}
							</div>
							<div className="item-count">{items[key]}</div>
						</div>
					)
				})
			}
		</div>
	);
};



export default Filter;