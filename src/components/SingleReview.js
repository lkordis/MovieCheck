import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../App.css';

import Comment from './Comment'
import NewComment from './NewComment'

import UserApiData from '../helpers/UserApiData'
import { RAILS_API } from '../constants'


class SingleReview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            review: [],
            user: [],
            comments: [],
            commenting: false
        }

        this.addComment = this.addComment.bind(this)
    }

    addComment() {
        this.setState({ commenting: !this.state.commenting })
    }

    componentWillMount() {
        let reviewsData = new UserApiData(`${RAILS_API}reviews\\${this.props.match.params.reviewId}.json?`)
        reviewsData.getApiData((results) => {
            this.setState({ review: results })
            let usersData = new UserApiData(`${RAILS_API}users\\${this.state.review.user_id}.json?`)
            usersData.getApiData((result) => {
                this.setState({ user: result })

                let commentsData = new UserApiData(`${RAILS_API}comments.json?review_id=${this.state.review.id}`)
                commentsData.getApiData(result => {
                    this.setState({ comments: result })
                })
            })
        })
    }

    render() {
        let originalBackdrop = `${this.state.review.image_url}`;
        let addCommentButton = null
        let commentArea = null
        let comments = null

        if (localStorage.getItem("Authorization")) {
            addCommentButton = <Button onClick={this.addComment}>Comment</Button>
            if (this.state.commenting) {
                commentArea = <NewComment review={this.state.review} addComment={this.addComment}/>
            }
        }
        if (this.state.comments.length > 0) {
            comments =
                <div>
                    <h3>Comments</h3> <br />
                    <div>
                        {this.state.comments.map((item, index) =>
                            <div key={index}>
                                <Comment comment={item} />
                            </div>
                        )}
                    </div>
                </div>
        }

        return (
            <div id="movie-img" className="singleMovie-image"
                style={{
                    backgroundImage: 'url('.concat(`${originalBackdrop}`, ')')
                }}>
                <p className="singleMovie">Review by {this.state.user.name} {this.state.user.lastName}</p>

                <div className="movie-body" >
                    <p className="movie-body-overview"> {this.state.review.text} </p>
                    <div >
                        {addCommentButton}
                        {commentArea}
                    </div>
                    {comments}
                </div>
            </div>
        )
    }
}

export default SingleReview