import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import UserApiData from '../helpers/UserApiData'
import { RAILS_API } from '../constants'
import '../App.css';

class ReviewTile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            review: props.props,
            user: [],
            can_edit: false
        };
    }

    componentWillMount() {
        let usersData = new UserApiData(`${RAILS_API}users\\${this.state.review.user_id}.json?`)
        usersData.getApiData((result) => {
            this.setState({ user: result })
            new UserApiData(`${RAILS_API}user_reviews.json`).getApiData((reviews) => {
                reviews.forEach((element) => {
                    if (element.user_id === this.state.review.user_id) {
                        this.setState({ can_edit: true })
                    }
                })
            })
        })
    }

    render() {
        var deleteBtn = null
        if (this.state.can_edit) {
            deleteBtn =
                <div>
                    <Button>Delete review</Button>
                </div>
        }
        return (
            <figure className="grid-figure">
                <div className="review-tile">
                    <h3>Review by {this.state.user.name} {this.state.user.last_name}</h3><br />
                    <img src={`${this.state.review.image_url}`} alt="" />
                    <h4>{this.state.review.text.slice(0,100)}</h4>
                    {deleteBtn}
                    <Link to={`/reviews/${this.state.review.id}`}>See more...</Link>
                </div>
            </figure>
        )
    }
}

export default ReviewTile