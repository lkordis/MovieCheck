import React, { Component } from 'react';
import '../App.css';
import { RAILS_API } from '../constants'
import Slider from 'react-slick';

import UserApiData from '../helpers/UserApiData'
import UserTile from './UserTile'

class UserGrid extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }

        this.setUsers = this.setUsers.bind(this)
    }

    setUsers(data) {
        console.log(data)
        this.setState({ users: this.state.users.concat(data) })
    }

    componentWillMount() {
        const userData = new UserApiData(`${RAILS_API}recommend_followers.json`)
        userData.getApiData(this.setUsers)
    }

    render() {
        var slider = <p>No reccomended users</p>

        if (this.state.users.length > 0) {
            var settings = {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: this.state.users.length,
                slidesToScroll: 4
            };
            slider =
                <div style={{color: 'white'}}>
                    <h2>Recommended users</h2><br />
                    <Slider {...settings}>
                        {this.state.users.map((item, index) =>
                            <div key={index}>
                                <UserTile props={item} />
                            </div>
                        )}
                    </Slider>
                </div>
        }

        return (
            <div>
                {slider}
            </div>
        )
    }
}

export default UserGrid