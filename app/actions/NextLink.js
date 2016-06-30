import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import {Signin} from './Signin.js'

export class NextLink extends Component {

    propTypes: {
        link: React.PropTypes.node.isRequired
    },

    contextTypes: {
        transitionTo: React.PropTypes.func.isRequired
    },

    _onClickRight: function() {
        this.context.transitionTo(this.props.link.props.to);
    },

    render: function() {
        return (
            <div>
                {this.props.link}
                <Right onClick={this._onClickRight} />
            </div>  
        );
    }
}