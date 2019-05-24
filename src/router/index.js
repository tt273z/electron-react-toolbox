import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '../utils/asyncComponent';

const Console = asyncComponent(() => import("../components/Console"));
const Regexper = asyncComponent(() => import("../components/Regexper"));
const Triangle = asyncComponent(() => import("../components/Triangle"));
const TemplateSyntax = asyncComponent(() => import("../components/TemplateSyntax"));
const Test = asyncComponent(() => import("../components/Test"));

export default class RouteConfig extends Component{
  render(){
    return(
			<Switch>
				<Route path="/" exact component={Console} />
				<Route path="/regexp" component={Regexper} />
				<Route path="/tri" component={Triangle} />
				<Route path="/templ" component={TemplateSyntax} />
				<Route path="/test" component={Test} />
				<Redirect to="/" />
			</Switch>
    )
  }
}
