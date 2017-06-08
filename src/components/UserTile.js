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
            user: props.props,
            following: false
        }

        this.followUser = this.followUser.bind(this)
        this.unfollowUser = this.unfollowUser.bind(this)
    }

    followUser() {
        fetch(`${RAILS_API}followers.json?user_id=${this.state.user.id}`, {
            method: 'POST',
            headers: myHeaders
        }).then()
    }

    unfollowUser() {
        fetch(`${RAILS_API}followers.json?user_id=${this.state.user.id}`, {
            method: 'DELETE',
            headers: myHeaders
        }).then()
    }

    componentWillMount() {
        fetch(`${RAILS_API}following.json?`, {
            headers: myHeaders
        })
            .then(results => results.json())
            .then(result => {
                result.forEach((element) => {
                    if (element.id === this.props.props.id) this.setState({ following: true })
                });
            })
    }

    render() {
        let image = ""
        let btn = <Button onClick={this.followUser}>Follow</Button>
        if (this.state.user.user_image) {
            image = <Image src={this.state.user.user_image} alt={this.state.user.user_image}
                style={{
                    width: 75 + 'px',
                    height: 75 + 'px'
                }} circle responsive />
        }

        if (this.state.following) btn = <Button onClick={this.unfollowUser}>Unfollow</Button>

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-4 col-lg-4">
                        {image}
                    </div>
                    <div className="col-xs-8 col-lg-8">
                        <Link to={`/users/${this.state.user.id}`}><p>{this.state.user.name} {this.state.user.last_name}</p></Link>
                        {btn}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserTile