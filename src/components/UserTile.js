import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import '../App.css';
import { RAILS_API } from '../constants'
import { Link } from 'react-router-dom';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
var bootstrap = require('bootstrap');

var myHeaders = new Headers()
myHeaders.append("Authorization", localStorage.getItem("Authorization"));

class UserTile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: props.props
        }

        this.followUser = this.followUser.bind(this)
    }

    followUser() {
        fetch(`${RAILS_API}followers.json?user_id=${this.state.user.id}`, {
            method: 'POST',
            headers: myHeaders
        }).then()
    }

    render() {
        let image = ""
        if (this.state.user.user_image) {
            image = <Image src={this.state.user.user_image} alt={this.state.user.user_image}
                style={{
                    width: 75 + 'px',
                    height: 75 + 'px'
                }} circle responsive />
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-4 col-lg-4">
                        {image}
                    </div>
                    <div className="col-xs-8 col-lg-8">
                        <Link to={`/users/${this.state.user.id}`}><p>{this.state.user.name} {this.state.user.last_name}</p></Link>
                        <Button onClick={this.followUser}>Follow</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserTile