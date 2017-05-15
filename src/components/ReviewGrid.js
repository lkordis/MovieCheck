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
        this.setState({reviews: this.state.reviews.concat(data)})
    }

    render() {
        const {
            reviews
        } = this.state;

        return (
            <div className="review-grid">
                <UserGrid /><br/>
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