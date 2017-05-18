import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserApiData from '../helpers/UserApiData'
import { RAILS_API } from '../constants'
import '../App.css';

class ReviewTile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            review: props.props,
            user: []
        };
    }

    componentWillMount() {
        let usersData = new UserApiData(`${RAILS_API}users\\${this.state.review.user_id}.json?`)
        usersData.getApiData((result) => {
            this.setState({ user: result })
        })
    }

    render() {
        return (
            <figure className="grid-figure">
                <div className="review-tile">
                    <h3>Review by {this.state.user.name} {this.state.user.lastName}</h3><br />
                    <img src={`${this.state.review.image_url}`} alt="" />
                    <h4>{this.state.review.text}</h4>
                    <Link to={`/reviews/${this.state.review.id}`}>See more...</Link>
                </div>
            </figure>
        )
    }
}

export default ReviewTile