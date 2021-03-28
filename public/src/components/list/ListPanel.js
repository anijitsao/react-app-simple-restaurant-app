import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

// components
import ListAllRestaurants from './ListAllRestaurants'
import ListEachRestaurant from './ListEachRestaurant'

const ListPanel = (props) => {
  let { restaurants } = props 

  return (
    <div className="all-restaurants">
      <Switch>
        <Route exact path="/" render={(props) => (
          <ListAllRestaurants {...props} restaurants={restaurants} />
        )}>
        </Route>
        <Route path="/showrestaurant/:id" render={(props) => (
          <ListEachRestaurant {...props} />
        )}></Route>

      </Switch>
    </div>
  );
};



export default ListPanel;