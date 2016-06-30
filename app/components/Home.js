import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

export class Home extends Component {

    constructor(props) {
        super(props);
      
        this.pageMessage = 'Home';
    }

    render() {
        return (
            <div>
                <h1>{this.pageMessage}</h1>
                
                <Link to={ {pathname: "/signin"} }>Signin</Link>
            </div>
        );
    }
}