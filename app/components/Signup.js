import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import Firebase from 'firebase';
import Radium from 'radium';
import color from 'color';
import { fbDatabase, fbAuth, fbStorage} from '../util/fbService.js';

export class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            pic1: '',
            pic2: '',
            pic3: '',
            pic4: ''
        }
        this.pageMessage = 'Signup Users';
        this.handleClick = this.handleClick.bind(this)
        this.handleGoBackHomeClick = this.handleGoBackHomeClick.bind(this);
        this.uploadPic1 = {};
        this.uploadPic2 = {};
        this.uploadPic3 = {};
        this.uploadPic4 = {};
    }
    handleClick(postId, e) {
        let uploadPicsArr = [];
        let that = this;
        uploadPicsArr.push(that.uploadPic1, that.uploadPic2, that.uploadPic3, that.uploadPic4)
        let userInfo = that.state;
        fbAuth.createUserWithEmailAndPassword(userInfo.email, userInfo.password).then(function (success) {
            delete userInfo.password;
            userInfo.token = success.uid;
            userInfo.role = 'user';
            console.log(userInfo)
            let uploadPromiseImgs = uploadPicsArr.map(function (pic, index) {
                return new Promise(function (resolve, reject) {
                    //storageRef.ref('images/'+userInfo.token)
                    var storageRef = fbStorage.ref('images/' + userInfo.token + '/' + pic.name);
                    // Upload file to Firebase Storage
                    var uploadTask = storageRef.put(pic.file);
                    uploadTask.on('state_changed', null, null, function () {
                        var downloadUrl = uploadTask.snapshot.downloadURL;
                        userInfo[pic.name] = downloadUrl;
                        resolve(downloadUrl)
                    })
                })
            });
            Promise.all(uploadPromiseImgs).then(function (data) {
                fbDatabase.ref('users').push(userInfo).then(function (success) {
                    browserHistory.push('/home');
                });
            })
                .catch(function (err) {
                    console.log(err)
                })
            // token = success.refreshToken;
        }).catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // ...
            console.log(errorMessage)
        });
        // console.log(this.state)
    }
    handleGoBackHomeClick() {
        browserHistory.push('/home')
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

    handleChangePic1(e) {
        //console.log(e.target.files[0])
        this.uploadPic1.name = 'pic1';
        this.uploadPic1.file = e.target.files[0];
        this.setState({ pic1: e.target.value })
    }

    handleChangePic2(e) {
        //console.log(e.target.files[0])
        this.uploadPic2.name = 'pic2';
        this.uploadPic2.file = e.target.files[0];
        this.setState({ pic2: e.target.value })
    }

    handleChangePic3(e) {
        this.uploadPic3.name = 'pic3';
        this.uploadPic3.file = e.target.files[0];
        this.setState({ pic3: e.target.value })
    }

    handleChangePic4(e) {
        this.uploadPic4.name = 'pic4';
        this.uploadPic4.file = e.target.files[0];
        this.setState({ pic4: e.target.value })
    }

    render() {
        return (
            <div className='login'>
                <div className="login-container">
                <h2>{this.pageMessage}</h2>
                
                    <label className='labelStyle'>Name:
                        <input type='text' value={this.state.name} onChange={this.handleChange.bind(this) } placeholder="Name..."/>
                    </label>
                    <br/>
                    <label className='labelStyle'>Email:
                        <input type='email' value={this.state.email} onChange={this.handleChangeEmail.bind(this) } placeholder="Email..."/>
                    </label>
                    <br/>
                    <label className='labelStyle'>Password:
                        <input type='password' value={this.state.password} onChange={this.handleChangePassword.bind(this) } placeholder="Password..."/><br/><br/>
                    </label><br/>
                    <label className='labelStyle'>Upload Pic #1
                        <input type='file' value={this.state.pic1} onChange={this.handleChangePic1.bind(this) } placeholder="copy the image url and paster here..."/><br/><br/>
                    </label>
                    <label className='labelStyle'>Upload Pic #2
                        <input type='file' value={this.state.pic2} onChange={this.handleChangePic2.bind(this) } placeholder="copy the image url and paster here..."/><br/><br/>
                    </label>
                    <label className='labelStyle'>Upload Pic #3
                        <input type='file' value={this.state.pic3} onChange={this.handleChangePic3.bind(this) } placeholder="copy the image url and paster here..."/><br/><br/>
                    </label>
                    <label className='labelStyle'>Upload Pic #4
                        <input type='file' value={this.state.pic4} onChange={this.handleChangePic4.bind(this) } placeholder="copy the image url and paster here..."/>
                    </label><br/><br/>
                    <button className='signUpBtn' onClick={ this.handleClick}>Signup</button>
                    <button className='slideShowBtn' onClick= { this.handleGoBackHomeClick }>Go Back to Home</button>
                </div>
            </div>
        );
    }
}