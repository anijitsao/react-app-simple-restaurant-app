import React from 'react';

// components
import FilterRestaurants from './filter/FilterRestaurants'
import ListRestaurants from './list/ListRestaurants'

const ShowRestaurants = ({restaurants}) => {
  return (
    <div className="restaurants-list">
    	<FilterRestaurants restaurants={restaurants}/>
    	<ListRestaurants restaurants={restaurants}/>
    </div>
  );
};



export default ShowRestaurants;