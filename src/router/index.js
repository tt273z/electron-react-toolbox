import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '../utils/asyncComponent';

const Console = asyncComponent(() => import("../components/Console"));
const Regexper = asyncComponent(() => import("../components/Regexper"));
const Triangle = asyncComponent(() => import("../components/Triangle"));

export default class RouteConfig extends Component{
  render(){
    return(
			<Switch>
				<Route path="/" exact component={Console} />
				<Route path="/regexp" component={Regexper} />
				<Route path="/tri" component={Triangle} />
				<Redirect to="/" />
			</Switch>
    )
  }
}
