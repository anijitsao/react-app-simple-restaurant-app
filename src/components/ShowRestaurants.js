import React from 'react';

// components
import FilterRestaurants from './FilterRestaurants'
import ListRestaurants from './ListRestaurants'

const ShowRestaurants = ({restaurants}) => {
  return (
    <div className="restaurants-list">
    	<FilterRestaurants restaurants={restaurants}/>
    	<ListRestaurants restaurants={restaurants}/>
    </div>
  );
};



export default ShowRestaurants;