import React, { Component } from 'react';
import '../App.css';

let BASE_API = "https://api.themoviedb.org/3/movie/";
let API_KEY = "0649ca7815178f68273bfb149e7716cc";
let IMAGE = "http://image.tmdb.org/t/p/";

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
    }

    getCredits() {
        let CREDITS = `${BASE_API}${this.state.movie.id}/credits?api_key=${API_KEY}`

        fetch(`${CREDITS}`)
            .then(response => response.json())
            .then(result => this.setCredits(result.cast))
    }

    getApiData() {
        fetch(`${BASE_API}${this.props.match.params.movieId}?language=en-US&api_key=${API_KEY}`)
            .then(response => response.json())
            .then(result => {
                this.setMovie(result)
                this.getCredits();
            });
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
        //let mini = `${IMAGE}w45/${this.state.movie.backdrop_path}`;
        let originalBackdrop = `${IMAGE}original/${this.state.movie.backdrop_path}`;

        return (
            <div id="movie-img" className="singleMovie-image"
                style={{
                    backgroundImage: 'url(' + `${originalBackdrop}` + ')'
                }}>
                <p className="singleMovie">{this.state.movie.original_title}</p>

                <div className="movie-body" >
                    <p className="movie-body-overview"> {this.state.movie.overview} </p>
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