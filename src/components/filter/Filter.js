import React from 'react';

const MAPPING = {
  low: "less Than 250",
  medium: "250 To 500",
  high: "more Than 500"
}
const CostFilter = ({ name, items, applyFilter, currentFilter }) => {
  const keys = Object.keys(items)
  console.log('currentFilter here', currentFilter)

  return (
    <div className="filter-info">
    	<div className="filter-title">{name}</div>
	    	{
	    		keys.map((key, index) => {
	    			
	    			let classRupee = (name=='Cost') ? 'item-name': 'item-name';
					  console.log('currentFilter here on line 19', currentFilter)

				    let filterClass = (currentFilter && currentFilter[name] == key) ? "item-info active-item" : "item-info"

	    			return ( 
	    				<div key={index} id={`${name}-${key}`}className={filterClass} onClick={applyFilter}>
			    			<div className={classRupee}>{(MAPPING[key]) ? MAPPING[key]: key}
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