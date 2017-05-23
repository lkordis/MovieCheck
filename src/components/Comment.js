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
        return (
            <figure className="grid-figure">
                <div className="review-tile">
                    <h3>{this.state.user.name}{this.state.user.lastName}  </h3>
                    <h3>{this.state.comment.updated_at}</h3><br />
                    <h4>{this.state.comment.text}</h4>
                </div>
            </figure>
        )
    }
}

export default Comment