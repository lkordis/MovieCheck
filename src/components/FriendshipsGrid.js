import React, { Component } from 'react';
import UserApiData from '../helpers/UserApiData'
import { RAILS_API } from '../constants'
import UserTile from './UserTile'


// import { Grid, Row, Col } from 'react-bootstrap'

class FriendshipsGrid extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            title: 'Following users:'
        }
        this.setUsers = this.setUsers.bind(this)
    }

    setUsers(data) {
        this.setState({ users: data })
        if(window.location.pathname.split('/').pop() === 'followers') this.setState({title: 'My followers: '})
    }

    componentWillMount() {
        var api = new UserApiData(`${RAILS_API}${window.location.pathname.split('/').pop()}.json`)
        api.getApiData(this.setUsers)
    }

    render() {
        return (
            <div>
                <h1 style={{ color: 'white' }}>{this.state.title}</h1>
                <div style={{
                    display: 'flex',
                    maxWidth: '35%',
                    position: 'relative',
                    margin: 'auto',
                    flexDirection: 'column'
                }}>
                    {this.state.users.map((item, index) =>
                        <div key={index} style={{
                            backgroundColor: '#2b2929',
                            marginTop: '10px',
                            boxShadow: '10px 10px 5px black'
                        }}>
                            <UserTile props={item} />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default FriendshipsGrid