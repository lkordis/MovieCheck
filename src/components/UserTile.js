import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../App.css';
import { RAILS_API } from '../constants'

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
            <div>
                {image}
                <p>{this.state.user.name}{this.state.user.lastName}</p>
                <Button onClick={this.followUser}>Follow</Button>
            </div>
        )
    }
}

export default UserTile