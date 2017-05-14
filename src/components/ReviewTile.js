import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class ReviewTile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            review: props.props
        };
    }

    render() {
        return (
            <figure className="grid-figure">
                <div className="review-tile">
                    <h3>Review by</h3><br />
                    <img src={`${this.state.review.image_url}`} alt=""/>
                    <h4>{this.state.review.text}</h4>
                    <Link to={`/reviews/${this.state.review.id}`}>See more...</Link>
                </div>
            </figure>
        )
    }
}

export default ReviewTile