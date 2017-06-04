import React, { Component } from 'react';

import ReviewGrid from '../components/ReviewGrid';
import UserApiData from '../helpers/UserApiData.js'

class ReviewGridWrapper extends Component {
    render() {
        let BASE = "https://peaceful-reef-40428.herokuapp.com/"

        var api = new UserApiData(`${BASE}reviews.json?`);
        if (this.props.match.params.userId) {
            console.log("tu sam")
            api = new UserApiData(`${BASE}get_reviews.json?user_id=${this.props.match.params.userId}`)
        }
        return (
            <ReviewGrid props={api} getApiData={api.getApiData} getInitialApiData={api.getInitialApiData} id={this.props.match.params.userId} />
        )
    }
}

export default ReviewGridWrapper;