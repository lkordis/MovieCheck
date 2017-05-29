import React, { Component } from 'react';
import { Button, Grid, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

import Comment from './Comment'
import NewComment from './NewComment'

import UserApiData from '../helpers/UserApiData'
import { RAILS_API, RAILS_API_BASE_LOGIN } from '../constants'

class SingleReview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            review: [],
            user: [],
            comments: [],
            commenting: false,
            can_edit: false
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
                var user_id = result.id
                let commentsData = new UserApiData(`${RAILS_API}comments.json?review_id=${this.state.review.id}`)
                commentsData.getApiData(result => {
                    this.setState({ comments: result })

                    let current_user = new UserApiData(`${RAILS_API_BASE_LOGIN}?`)
                    current_user.getApiData(result => {
                        if (result.id === user_id) this.setState({ can_edit: true })
                    })
                })
            })
        })
    }

    render() {
        let originalBackdrop = `${this.state.review.image_url}`;
        let addCommentButton = null
        let editButton = null
        let commentArea = null
        let comments = null

        if (localStorage.getItem("Authorization")) {
            addCommentButton = <Button onClick={this.addComment}>Comment</Button>
            if (this.state.commenting) {
                commentArea = <NewComment review={this.state.review} addComment={this.addComment} />
            }
            if (this.state.can_edit) {
                editButton = <Link to={`/edit_review/${this.state.review.id}`}><Button>Edit</Button></Link>
            }
        }
        if (this.state.comments.length > 0) {
            comments =
                <div style={{
                    display: 'flex',
                    maxWidth: '65%',
                    backgroundColor: '#2b2929',
                    position: 'relative',
                    margin: 'auto',
                    flexDirection: 'column'
                }}>
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
            <div style={{
                display: 'flex',
                maxWidth: '65%',
                backgroundColor: '#2b2929',
                position: 'relative',
                margin: 'auto'
            }}>
                <div style={{ color: 'white', position: 'relative', margin: 'auto' }}>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12} md={8} lg={3}>
                                <Image src={`${originalBackdrop}`} alt={originalBackdrop} className="img-responsive" />
                                <div >
                                    {addCommentButton}
                                    {editButton}
                                    {commentArea}
                                </div>
                            </Col>
                            <Col xs={6} md={4} lg={9}>
                                <h2 style={{ fontFamily: 'Monospace' }}>Review by {this.state.user.name} {this.state.user.last_name}</h2>
                                <br />
                                <p style={{ position: 'relative' }}>{this.state.review.text}</p>
                            </Col>
                        </Row>
                    </Grid>
                    <div>
                        {comments}
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleReview