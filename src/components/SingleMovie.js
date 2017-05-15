import React, { Component } from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TMDB_API_KEY } from '../config'
import { TMDB_BASE_MOVIE, IMAGE_PATH, RAILS_API } from '../constants'

var myHeaders = new Headers()
myHeaders.append("Authorization", localStorage.getItem("Authorization"));

class SingleMovie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movie: [],
            credits: []
        }

        this.getApiData = this.getApiData.bind(this);
        this.getCredits = this.getCredits.bind(this);
        this.setMovie = this.setMovie.bind(this);
        this.setCredits = this.setCredits.bind(this);
        this.addToSeen = this.addToSeen.bind(this);
        this.addToWatch = this.addToWatch.bind(this);
    }

    getCredits() {
        let CREDITS = `${TMDB_BASE_MOVIE}${this.state.movie.id}/credits?api_key=${TMDB_API_KEY}`

        fetch(`${CREDITS}`)
            .then(response => response.json())
            .then(result => this.setCredits(result.cast))
    }

    getApiData() {
        fetch(`${TMDB_BASE_MOVIE}${this.props.match.params.movieId}?language=en-US&api_key=${TMDB_API_KEY}`)
            .then(response => response.json())
            .then(result => {
                this.setMovie(result)
                this.getCredits();
            });
    }

    addToSeen() {
        const { movie } = this.state;
        let route = `${RAILS_API}seen_movies.json?title=${movie.original_title}&id=${movie.id}&poster_path=${movie.poster_path}`
        fetch(`${route}`, { method: 'POST', headers: myHeaders })
            .then()
    }

    addToWatch() {
        fetch(`${RAILS_API}wished_movies.json?title=${this.state.movie.original_title}&id=${this.state.movie.id}&poster_path=${this.state.movie.poster_path}`,
            {
                method: 'POST',
                headers: myHeaders
            })
            .then()
    }

    setMovie(result) {
        this.setState({ movie: result })
    }

    setCredits(result) {
        this.setState({ credits: result })
    }

    componentWillMount() {
        this.getApiData();
    }

    render() {
        //let mini = `${IMAGE_PATH}w45/${this.state.movie.backdrop_path}`;
        let originalBackdrop = `${IMAGE_PATH}original${this.state.movie.backdrop_path}`;
        console.log(originalBackdrop)
        let addToSeenBtn = null;
        let addToWatchBtn = null;
        let addReviewBtn = null;

        if (localStorage.getItem("Authorization")) {
            addToSeenBtn = <Button onClick={this.addToSeen}>Add to seen list</Button>
            addToWatchBtn = <Button onClick={this.addToWatch}>Add to watch list</Button>
            addReviewBtn = <Link to={`/new_review/${this.state.movie.id}`}><Button onClick={this.addReview}>Add a review</Button></Link>
        }

        return (
            <div id="movie-img" className="singleMovie-image"
                style={{
                    backgroundImage: 'url('.concat(`${originalBackdrop}`, ')')
                }}>
                <p className="singleMovie">{this.state.movie.original_title}</p>

                <div className="movie-body" >
                    <p className="movie-body-overview"> {this.state.movie.overview} </p>
                    <div >
                        {addToSeenBtn}
                        {addToWatchBtn}
                        {addReviewBtn}

                    </div>
                    <h3>Credits</h3><br />
                    <div>
                        {this.state.credits.map((item, index) =>
                            <div key={index}>
                                <p>{item.name}: {item.character}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleMovie;