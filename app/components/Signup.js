import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import Firebase from 'firebase';
import Radium from 'radium';
import color from 'color';
import { fbDatabase, fbAuth} from '../util/fbService.js';

export class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
        // Initialize Firebase
        // this.config = {
        //     apiKey: "AIzaSyCDemLJQsoV-csJ7jtdzTq_nV2ESwvhG2M",
        //     authDomain: "kamran-playlist.firebaseapp.com",
        //     databaseURL: "https://kamran-playlist.firebaseio.com",
        //     storageBucket: "kamran-playlist.appspot.com",
        // };
        // firebase.initializeApp(this.config);
        this.pageMessage = 'Signup';
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(postId, e) {
        let userInfo = this.state;
        fbAuth.createUserWithEmailAndPassword(userInfo.email, userInfo.password).then(function (success) {
            delete userInfo.password;
            userInfo.token = success.refreshToken
            fbDatabase.ref('reactUsers').push(userInfo).then(function (success) {
                console.log('user added')
            });
            // token = success.refreshToken;
        }, function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // ...
            console.log(errorMessage)
        });
        // console.log(this.state)
    }

    handleChange(e) {
        this.setState({ name: e.target.value })
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    handleChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    render() {
        return (
            <div>
                <h1>{this.pageMessage}</h1>
                <div>
                    <p>{this.state.name}</p>
                    <input type='text' value={this.state.name} onChange={this.handleChange.bind(this) } placeholder="Name..."/></div>
                <p>{this.state.email}</p>
                <input type='email' value={this.state.email} onChange={this.handleChangeEmail.bind(this) } placeholder="Email..."/>
                <p>{this.state.password}</p>
                <input type='password' value={this.state.password} onChange={this.handleChangePassword.bind(this) } placeholder="Password..."/>
                <button onClick={ this.handleClick}>Signup</button>
                <br/>
                <Link to={ {pathname: "/signin"} }>Signin</Link>
            </div>
        );
    }
}