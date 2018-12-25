import React from 'react';

const MAPPING = {
	low: "less Than 250",
	medium: "250 To 500",
	high: "more Than 500",

	inc: "Price low to high",
	dec: "Price high to low",
	rating: "Rating"
}
const CostFilter = ({ name, items, applyFilter, currentFilter }) => {
	const keys = Object.keys(items)

	return (
		<div className="filter-info">
			<div className="filter-title">{name}</div>
			{
				keys.map((key, index) => {

					let classRupee = (name == 'Cost') ? 'item-name' : 'item-name';
					let filterClass = (currentFilter && currentFilter[name] !== key) ? "item-info" : (name == 'sort') ? "item-info active-item-sort" : "item-info active-item"

					return (
						<div key={index} id={`${name}-${key}`} className={filterClass} onClick={applyFilter}>
							<div className={classRupee}>{(MAPPING[key]) ? MAPPING[key] : key}
							</div>
							<div className="item-count">{items[key]}</div>
						</div>
					)
				})
			}
		</div>
	);
};



export default CostFilter;