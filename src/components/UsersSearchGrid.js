import React, { Component } from 'react';
import UserApiData from '../helpers/UserApiData'
import { RAILS_API } from '../constants'
import UserTile from './UserTile'

// import { Grid, Row, Col } from 'react-bootstrap'

class UsersSearchGrid extends Component {
    constructor(props) {
        super(props)

        this.state = {
            query: '',
            users: []
        }

        this.onSearchChange = this.onSearchChange.bind(this)
        this.search = this.search.bind(this)
    }

    onSearchChange(e) {
        sessionStorage.setItem('users_query', e.target.value)
        this.setState({
            query: e.target.value,
        })
        this.search(e.target.value)
    }

    search(query) {
        this.setState({
            users: []
        })

        if (query === '') return;

        var user_api_data = new UserApiData(`${RAILS_API}search/users.json?query=${query}`)
        user_api_data.getApiData(results => {
            this.setState({
                users: results
            })
        })
    }

    componentWillMount() {
        if (sessionStorage.getItem('users_query')) this.search(sessionStorage.getItem('users_query'))
    }

    render() {
        return (
            <div>
                <div style={{
                    display: 'flex',
                    maxWidth: '35%',
                    position: 'relative',
                    margin: 'auto'
                }}>
                    <input type="text" className="form-control" aria-label="..." placeholder="Search" onChange={this.onSearchChange} /> <br />
                </div>
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

export default UsersSearchGrid