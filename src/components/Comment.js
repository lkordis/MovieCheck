import React, { Component } from 'react';
import UserApiData from '../helpers/UserApiData'
import { RAILS_API } from '../constants'
import '../App.css';

class Comment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comment: this.props.comment,
            user: {}
        }
    }

    componentWillMount() {
        let usersData = new UserApiData(`${RAILS_API}users\\${this.state.comment.user_id}.json?`)
        usersData.getApiData((result) => {
            this.setState({ user: result })
        })
    }

    render() {
        var date = new Date(Date.parse(this.state.comment.updated_at)).toDateString()
        return (
                <div className="review-tile">
                    <h3>{this.state.user.name} {this.state.user.last_name}  </h3>
                    <h3>{date}</h3><br />
                    <h4>{this.state.comment.text}</h4>
                </div>
        )
    }
}

export default Comment