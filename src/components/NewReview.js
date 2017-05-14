import React, { Component } from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';
import { TMDB_API_KEY } from '../config'
import { IMAGE_PATH_W154, TMDB_BASE_MOVIE, RAILS_API_BASE_REVIEWS } from '../constants'

var myHeaders = new Headers()
myHeaders.append("Authorization", localStorage.getItem("Authorization"))

class NewReview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: "",
            movie_poster_path: '',
        }

        this.onTextChange = this.onTextChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.getApiData = this.getApiData.bind(this)
    }

    componentWillMount() {
        this.getApiData();
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

    render() {
        return (
            <div>
                <h3>New review</h3>
                <form onSubmit={this.onSubmit}>
                    <textarea rows="80" cols="100" onChange={this.onTextChange}>
                    </textarea><br />
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        );
    }
}

export default NewReview