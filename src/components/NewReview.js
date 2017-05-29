import React, { Component } from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';
import { TMDB_API_KEY } from '../config'
import { IMAGE_PATH_W154, TMDB_BASE_MOVIE, RAILS_API_BASE_REVIEWS } from '../constants'

import UserApiData from '../helpers/UserApiData'
import { RAILS_API } from '../constants'

var myHeaders = new Headers()
myHeaders.append("Authorization", localStorage.getItem("Authorization"))

class NewReview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: "",
            movie_poster_path: '',
            editing: this.props.editing
        }

        this.onTextChange = this.onTextChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.getApiData = this.getApiData.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.update = this.update.bind(this)
    }

    componentWillMount() {
        if (this.props.editing) {
            this.onEdit()
        } else {
            this.getApiData();
        }
    }

    getApiData() {
        fetch(`${TMDB_BASE_MOVIE}${this.props.match.params.movieId}?language=en-US&api_key=${TMDB_API_KEY}`)
            .then(response => response.json())
            .then(result => {
                this.setState({ movie_poster_path: `${IMAGE_PATH_W154}${result.poster_path}` })
                console.log(this.state.movie_poster_path)
            });
    }

    onTextChange(event) {
        this.setState({ text: event.target.value });
    }

    onSubmit(event) {
        fetch(`${RAILS_API_BASE_REVIEWS}?text=${this.state.text}&movie_id=${this.props.match.params.movieId}&image_url=${this.state.movie_poster_path}`,
            {
                method: 'POST',
                headers: myHeaders
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.props.history.push('/reviews/')
            })

        event.preventDefault();
    }

    onEdit() {
        var id = window.location.pathname.split('/').pop()
        let reviewsData = new UserApiData(`${RAILS_API}reviews\\${id}.json?`)
        reviewsData.getApiData((results) => {
            this.setState({ text: results.text })
        })
    }

    update(event) {
        var id = window.location.pathname.split('/').pop()
        fetch(`${RAILS_API}reviews/${id}.json?text=${this.state.text}`, { method: 'PATCH', headers: myHeaders })
            .then(response => response.json())
            .then((result) => {
                window.location.replace(`/reviews/${result.id}`)
            })
        event.preventDefault();
    }

    render() {
        var form =
            <div>
                <h3 style={{ color: 'white' }}>New review</h3>
                    <textarea rows="80" cols="100" onChange={this.onTextChange} value={this.state.text}>
                    </textarea><br />
                    <Button type="submit" onClick={this.onSubmit}>Submit</Button>
            </div>

        if (this.state.editing) {
            form =
                <div>
                    <h3 style={{ color: 'white' }}>Edit review</h3>
                    <form onSubmit={this.update}>
                        <textarea rows="80" cols="100" onChange={this.onTextChange} value={this.state.text}>
                        </textarea><br />
                        <Button type="submit" onClick={this.update}>Edit</Button>
                    </form>
                </div>
        }
        return (
            <div>
                {form}
            </div>
        );
    }
}

export default NewReview