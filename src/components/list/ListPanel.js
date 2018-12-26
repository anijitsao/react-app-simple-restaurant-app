import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

// components
import ListAllRestaurants from './ListAllRestaurants'
import ListEachRestaurant from './ListEachRestaurant'

const ListPanel = ({ restaurants }) => {
  return (
    <div className="all-restaurants">
      <Switch>
        <Route exact path="/" render={(props) => (
          <ListAllRestaurants {...props} restaurants={restaurants} />
        )}>
        </Route>
        <Route path="/showrestaurant/:id" render={(props) => (
          <ListEachRestaurant {...props} restaurants={restaurants}/>
        )}></Route>

      </Switch>
    </div>
  );
};



export default ListPanel;