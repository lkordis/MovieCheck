import React, { Component } from 'react';
import '../App.css';

let BASE_API = "https://api.themoviedb.org/3/movie/";
let API_KEY = "0649ca7815178f68273bfb149e7716cc";
let IMAGE = "http://image.tmdb.org/t/p/";

class SingleMovie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movie: []
        }

        this.getApiData = this.getApiData.bind(this);
        this.setMovie = this.setMovie.bind(this);
    }

    getApiData() {
        fetch(`${BASE_API}${this.props.match.params.movieId}?language=en-US&api_key=${API_KEY}`)
            .then(response => response.json())
            .then(result => this.setMovie(result));
    }

    setMovie(result) {
        this.setState({ movie: result })
    }

    componentWillMount() {
        this.getApiData();
    }

    render() {
        let originalBackdrop = `${IMAGE}original/${this.state.movie.backdrop_path}`
        return (
            <div style={{ backgroundImage: 'url(' + `${originalBackdrop}`+ ')' }} className="singleMovie-image">
                <p className="singleMovie">{this.props.match.params.movieId}</p>
            </div>
        )
    }
}

export default SingleMovie;