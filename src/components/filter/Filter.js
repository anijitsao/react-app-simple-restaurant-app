import React from 'react';

const CostFilter = ({ name, items, applyFilter }) => {
  const keys = Object.keys(items)

  return (
    <div className="filter-info">
    	<div className="filter-title">{name}</div>
	    	{
	    		keys.map((key, index) => {
	    			let classRupee = (name=='Cost') ? 'item-name': 'item-name';
	    			return ( 
	    				<div key={index} id={`${name}-${key}`}className="item-info" onClick={applyFilter}>
			    			<div className={classRupee}>{key}
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