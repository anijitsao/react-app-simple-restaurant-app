import React from 'react';
import { Route } from 'react-router-dom';

// components
import ListAllRestaurants from './ListAllRestaurants'
import ListEachRestaurant from './ListEachRestaurant'

const ListPanel = (props) => {
  const { restaurants } = props

  return (
    <div className="all-restaurants">
      <Route exact path="/" render={(props) => (
        <ListAllRestaurants {...props} restaurants={restaurants} />
      )}>
      </Route>
      <Route path="/showrestaurant/:id" render={(props) => (
        <ListEachRestaurant {...props} />
      )}>
      </Route>
    </div>
  );
};

export default ListPanel;
