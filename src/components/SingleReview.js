import React, { Component } from 'react';
import '../App.css';
import UserApiData from '../helpers/UserApiData'
import { RAILS_API } from '../constants'

class SingleReview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            review: [],
            user: []
        }
    }

    componentWillMount() {
        let reviewsData = new UserApiData(`${RAILS_API}reviews\\${this.props.match.params.reviewId}.json?`)
        reviewsData.getApiData((results) => {
            this.setState({ review: results })
            let usersData = new UserApiData(`${RAILS_API}users\\${this.state.review.user_id}.json?`)
            usersData.getApiData((result) => {
                this.setState({ user: result })
            })
        })
        //let usersData = new UserApiData(`${RAILS_API}users/${}.json?`)
    }

    render() {
        let originalBackdrop = `${this.state.review.image_url}`;
        return (
            <div
                style={{
                    backgroundImage: 'url('.concat(`${originalBackdrop}`, ')')
                }}>>
                <h3>Review by {this.state.user.name} {this.state.user.lastName}</h3>
                <h4>{this.state.review.text}</h4>
            </div>
        )
    }
}

export default SingleReview