import React from 'react';
import ReactDOM from 'react-dom';
// Include the react-router module
// Include the Route component for displaying individual routes
// Include the Router component to contain all our Routes
// Include the hashHistory prop to handle routing client side without a server
// Include the IndexRoute (catch-all route)
import {Router, Route, hashHistory, IndexRoute} from "react-router";

// Reference the high-level components
import {Main} from "./components/Main";
import {Home} from "./components/children/Home";
import {Results} from "./components/children/Results";
import {Saved} from "./components/children/Saved";
import {Search} from "./components/children/Search"; 
//import { routes } from '../server/config/routes';

const app =  document.getElementById("app");
ReactDOM.render (
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <Route path="search" component={Search}></Route> 
            <Route path="results" component={Results}></Route>
            <Route path="saved" component={Saved}></Route>
        </Route>
    </Router>, 
    app
);

   