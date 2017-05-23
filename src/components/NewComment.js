import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../App.css';

import { RAILS_API } from '../constants'

var myHeaders = new Headers()
myHeaders.append("Authorization", localStorage.getItem("Authorization"));

class NewComment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            review: this.props.review,
            text: ''
        }

        this.submitComment = this.submitComment.bind(this)
        this.onTextChange = this.onTextChange.bind(this)
    }

    submitComment() {
        const { text, review } = this.state;
        let route = `${RAILS_API}comments.json?text=${text}&review_id=${review.id}`
        fetch(`${route}`, { method: 'POST', headers: myHeaders })
            .then(result => {
                this.props.addComment()
                location.reload();
            })
    }

    onTextChange(event) {
        this.setState({ text: event.target.value })
    }

    render() {
        return (
            <div>
                <textarea onChange={this.onTextChange} style={{color: 'black'}}/><br />
                <Button onClick={this.submitComment}>Submit</Button>
            </div>
        )
    }
}

export default NewComment