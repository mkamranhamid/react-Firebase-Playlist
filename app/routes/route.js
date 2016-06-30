import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import {Signup} from './components/Signup.js'
import {Home} from './components/Home.js'
import {Signin} from './components/Signin.js'
//E:\react\TwoWayDataBinding\app\components

const routes = (
    <Route path="/" component={ Signin }>
        <IndexRoute component={ List } />
        <Route path="signup" component={ Signup } />
    </Route>
);

export default routes;
//const Address = () => <h1>We are located at 555 Jackson St.</h1>