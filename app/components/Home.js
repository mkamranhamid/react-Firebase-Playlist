import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { fbDatabase, fbAuth} from '../util/fbService.js';

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uname: [],
            data: [{ id: 0, name: 'kaka' }, { id: 1, name: 'papa' }, { id: 2, name: 'chacha' }, { id: 3, name: 'lala' }, { id: 4, name: 'tata' }]
        }
        this.cols = [{ key: 'name', label: 'Name' }, { key: 'email', label: 'email' }];
        this.pageMessage = 'Home';
        console.log("kaka constructor")
        this.handleClick = this.handleClick.bind(this);
        this.goToAddUser = this.goToAddUser.bind(this);
        
    }

    componentDidMount() {
        // var self = this;
        let myArr = [{something:'deep'}, {no:1}, {something:'how'}, {no:6}, {something:'track'}, {no:9}, {something:'soundcloud'}];
        let unamesArr = [];
        fbDatabase.ref('users').once('value').then(function (snapshot) {
            let username = snapshot.val();
            // console.log(username);
            for (var i in username) {
                if (username[i].role == 'user') {
                    username[i].id = i;
                    unamesArr.push(username[i])
                }
            }
            this.setState({ uname: unamesArr });
            //console.log(username)
        }.bind(this));
    }
    handleClick(e, item) {
        sessionStorage.setItem('editUser', JSON.stringify(e))
        browserHistory.push('/edit');
        console.log(e)
    }
    goToAddUser() {
        browserHistory.push('/signup');
    }
    render() {
        //var self = this;
        var listItems = this.state.uname.map( (item) =>{
            return (
                <tr>
                    <td className='tabledata' key={ item.name }><a className='tableText' onClick= { this.handleClick.bind(this, item) } href= '#' > { item.name } </a></td>
                    <td className='tabledata' key={ item.email }><a className='tableText' href= '#' > { item.email } </a></td>
                </tr>
            );
        });
        return (
            <div>
                <h1 > { this.pageMessage } </h1>
                <table className='tableHome'>
                <thead>
                    <tr>
                        <td className='tabledata'>Name</td>
                        <td className='tabledata'>Email</td>
                    </tr>
                    </thead>
                    <tbody>
                    {listItems}
                    </tbody>
                </table><br/><br/>
                <button onClick={this.goToAddUser} className='button-add'>Add Users</button>
            </div>
        );
    }
}   
