import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import Firebase from 'firebase';
import { fbDatabase, fbAuth} from '../util/fbService.js';

export class Signin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
     
        this.pageMessage = 'Signin';
        this.handleClick = this.handleClick.bind(this)
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    handleChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    handleClick(postId, e) {
        let userSignInInfo = this.state;
        fbAuth.signInWithEmailAndPassword(userSignInInfo.email, userSignInInfo.password).then(function(data) {
        console.log(data);
        this.props.history.pushState(null, '/')
        })
    }
    render() {
        return (
            <div>
            <h1>{ this.pageMessage } < /h1>
            
            <label>Email < p > { this.state.email } < /p>
            < input type= 'text' value= { this.state.email } onChange= { this.handleChangeEmail.bind(this) } placeholder= "Email..." />
            < /label><br/>
            < label > Password < p > { this.state.password } < /p>
            < input type= 'email' value= { this.state.password } onChange= { this.handleChangePassword.bind(this) } placeholder= "Password..." />
            </label>
            < button onClick= { this.handleClick } > Signup < /button>
            <Link to={ {pathname: "/home"} }>home</Link>
            < /div>
        );
    }
}