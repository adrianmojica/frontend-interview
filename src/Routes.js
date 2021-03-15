import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CountryDetail from './CountryDetail';
import ListFrame from './ListFrame';
function Routes() {

/*
Routes 
It defines the home route and the route used for each country code

*/ 

  return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/"><ListFrame /></Route>
            <Route exact path="/country/:code"><CountryDetail /></Route>
          </Switch>
        </BrowserRouter>
    );
}

export default Routes;