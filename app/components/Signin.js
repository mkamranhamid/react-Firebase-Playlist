import Radium from 'radium';
import React, { Component } from 'react';
import color from 'color';
import { Router, Route, Link, browserHistory } from 'react-router';
import Firebase from 'firebase';
import { fbDatabase, fbAuth} from '../util/fbService.js';


export class Signin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            err:''
        }
        //console.log('constructor')
        this.pageMessage = 'Signin';
        this.handleClick = this.handleClick.bind(this)
        if (sessionStorage.getItem('token') && sessionStorage.getItem('role')) {
            if (sessionStorage.getItem('role') == 'admin') {
                browserHistory.push('/home');
            } else {
                browserHistory.push('/slideshow');
            }

        }
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    handleChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    handleClick(postId, e) {
        let userSignInInfo = this.state;
        fbAuth.signInWithEmailAndPassword(userSignInInfo.email, userSignInInfo.password).then( (data)=> {
            let token = data.uid;
            console.log(data)
            fbDatabase.ref('users').once('value').then(function (snapshot) {
                let allUsers = snapshot.val();
                console.log(allUsers)
                for (var i in allUsers) {
                    console.log(token == allUsers[i].token)
                    if (token == allUsers[i].token) {
                        if (allUsers[i].role == 'admin') {
                            sessionStorage.setItem('role', allUsers[i].role);
                            sessionStorage.setItem('token', allUsers[i].token);
                            browserHistory.push('/home');
                        } else {
                            sessionStorage.setItem('role', allUsers[i].role);
                            sessionStorage.setItem('slideShow', JSON.stringify(allUsers[i]))
                            browserHistory.push('/slideshow');
                        }

                    }/*else{
                    console.log(allUsers[i])
                }*/
                }
            });
        },(err)=>{
            console.log(err.message)
            this.setState({ err: 'No User Found with these Credentials' })
            console.log(this.state.err)
        })
    }
    render() {

        return (
            <div className="login" >
            <div className='login-triangle' > </div>
            
            < h1 className= "login-header textCenter" > { this.pageMessage } < /h1>
            <div className='errFound'>{this.state.err}</div>
            < div className= "login-container" >
            <label className='labelStyle' > Email < h3 > { this.state.email } < /h3>
            < input type= 'email' value= { this.state.email } onChange= { this.handleChangeEmail.bind(this) } placeholder= "Email..." />
            </label><br/>
            <label > Password < p > length:{ this.state.password.length } </p>
            < input type= 'password' value= { this.state.password } onChange= { this.handleChangePassword.bind(this) } placeholder= "Password..." />
            </label><br/>
            <button className='signUpBtn' onClick= { this.handleClick } > Signin < /button>
            < /div>
            < /div>
        );
    }
}