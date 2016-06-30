import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import {Signup} from './components/Signup.js'
import {Home} from './components/Home.js'
import {Signin} from './components/Signin.js'
//E:\react\TwoWayDataBinding\app\components

export class App extends Component {
 
    constructor(props){
      super(props);
    //   console.log("PROPS IS BELOW")
    //   console.log(props)
      this.state = {
          name: '',
          email: '',
          password: ''
      }
      this.title = 'Playlist React App';
      
  }


  render(){
    return (
      <div>
      <h1>{this.title}</h1>
        <Router history={browserHistory}>
        <Route path='/' component={Signup} />
        <Route path='/home' component={Home} />
        <Route path='/signin' component={Signin} />
        <Route path='/address' component={Address} />
      </Router>
      </div>
    );
  }
}
const Address = () => <h1>We are located at 555 Jackson St.</h1>