import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import {Signup} from './components/Signup.js';
import {Home} from './components/Home.js';
import {Signin} from './components/Signin.js';
import {EditUser} from './components/EditUser.js';
import {Slideshow} from './components/Slideshow.js';
import {MainLayout} from './components/MainLayout.js';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
    this.title = 'Playlist React App';
    this.handleBackClick.bind(this)
    this.handleSignoutClick.bind(this)
    console.log('App.js')

  }

  handleSignoutClick() {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      sessionStorage.clear()
      browserHistory.push('/')
    }, function (error) {
      // An error happened.
    });
  }

  handleBackClick() {
    window.history.back();
    console.log('back icon')
  }

  render() {
    return (
      <div className='container'>
        <Router history={browserHistory}>
        <Route path='/' component={Signin} />
          <Route component={MainLayout}>
            <IndexRoute component={Home} />
            <Route path='/home' component={Home} />
            <Route path='/signup' component={Signup} />
            <Route path='/edit' component={EditUser} />
            <Route path='/slideshow' component={Slideshow} />
            <Route path='/address' component={Address} />
          </Route>
        </Router>
      </div>
    );
  }
}
const Address = () => <h1>We are located at 555 Jackson St.</h1>