import React, { Component } from 'react';
import ReviewTile from './ReviewTile'
import UserGrid from './UserGrid'

import '../App.css';

class ReviewGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        };

        this.setReviews = this.setReviews.bind(this)
    }

    componentWillMount() {
        this.props.getInitialApiData(this.setReviews);
    }

    setReviews(data) {
        if (this.props.id) {
            var newData = data.filter(value => {
                return value.user_id == this.props.id
            })
            this.setState({ reviews: this.state.reviews.concat(newData) })
        } else {
            this.setState({ reviews: this.state.reviews.concat(data) })
        }
    }

    render() {
        const {
            reviews
        } = this.state;

        var user_grid = null

        if (!this.props.id) {
            user_grid = <UserGrid />
        }

        return (
            <div className="review-grid">
                {user_grid}<br />
                {reviews.map((item, index) =>
                    <div key={index}>
                        <ReviewTile props={item} />
                    </div>
                )}
            </div>
        );
    }
}

ReviewGrid.propTypes = {
    getApiData: React.PropTypes.func.isRequired,
    getInitialApiData: React.PropTypes.func.isRequired
};

export default ReviewGrid