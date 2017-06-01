import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Row, Col, Image } from 'react-bootstrap';

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
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={12} lg={12}>
                        <div style={{
                            display: 'flex',
                            position: 'relative',
                            maxWidth: '55%',
                            flexDirection: 'column',
                            color: 'white'
                        }}>
                            <div className="review-tile">
                                <Row>
                                    <Col xs={12} md={3} lg={3}>
                                        <Image src={`${this.state.review.image_url}`} alt="" className="img-responsive" responsive />
                                    </Col>
                                    <Col xs={12} md={9} lg={9}>
                                        <h3>Review by <Link to={`/users/${this.state.user.id}`}>{this.state.user.name} {this.state.user.last_name}</Link></h3>
                                        <br />
                                        <br />
                                        <br />
                                        <h4>{this.state.review.text.slice(0, 100)}</h4>
                                        <Link to={`/reviews/${this.state.review.id}`}>See more...</Link>
                                        {deleteBtn}
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default ReviewTile