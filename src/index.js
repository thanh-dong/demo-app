import React from 'react';
import {render} from 'react-dom';
import Root from './components/Root';
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import Archives from "./pages/Archives";
import Featured from "./pages/Featured";
import Settings from "./pages/Settings";

render(<Router history={hashHistory}>
    <Root/>
    <IndexRoute component={Featured}></IndexRoute>
    <Route path="archives(/:article)" name="archives" component={Archives}></Route>
    <Route path="settings" name="settings" component={Settings}></Route>
</Router>, document.getElementById('root'));

// render(<Root />, document.getElementById('root'));
