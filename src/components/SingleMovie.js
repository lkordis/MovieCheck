import React, { Component } from 'react';
import '../App.css';
import { Button, Tabs, Tab, MenuItem, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TMDB_API_KEY } from '../config'
import { TMDB_BASE_MOVIE, IMAGE_PATH, RAILS_API, RAILS_API_BASE_LOGIN } from '../constants'

var myHeaders = new Headers()
myHeaders.append("Authorization", localStorage.getItem("Authorization"));

class SingleMovie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movie: [],
            credits: [],
            crew: [],
            rating: {},
            seen: false,
            wished: false,
            logged_in: false,
        }

        this.getApiData = this.getApiData.bind(this);
        this.getCredits = this.getCredits.bind(this);
        this.setMovie = this.setMovie.bind(this);
        this.setCredits = this.setCredits.bind(this);
        this.addToSeen = this.addToSeen.bind(this);
        this.addToWatch = this.addToWatch.bind(this);
        this.checkIfSeen = this.checkIfSeen.bind(this);
        this.checkIfWished = this.checkIfWished.bind(this);
        this.deleteFromSeen = this.deleteFromSeen.bind(this);
        this.login = this.login.bind(this);
        this.getMovieRating = this.getMovieRating.bind(this);
        this.newRating = this.newRating.bind(this)
        this.updateRating = this.updateRating.bind(this);
    }

    getCredits() {
        let CREDITS = `${TMDB_BASE_MOVIE}${this.state.movie.id}/credits?api_key=${TMDB_API_KEY}`

        fetch(`${CREDITS}`)
            .then(response => response.json())
            .then(result => this.setCredits(result))
    }

    login(id) {
        let login_API = `${RAILS_API_BASE_LOGIN}?`

        var myHeaders = new Headers()
        myHeaders.append("Authorization", localStorage.getItem("Authorization"))

        fetch(`${login_API}`, { headers: myHeaders })
            .then(response => {
                return response.json()
            })
            .then(result => {
                if (!result.error) {
                    this.setState({ logged_in: true })
                    this.checkIfSeen(id)
                    this.checkIfWished(id)
                }
            })
    }

    getApiData() {
        fetch(`${TMDB_BASE_MOVIE}${this.props.match.params.movieId}?language=en-US&api_key=${TMDB_API_KEY}`)
            .then(response => response.json())
            .then(result => {
                this.setMovie(result)
                this.getCredits();
                this.login(result.id)
                this.getMovieRating(result.id)
            });
    }

    getMovieRating(id) {
        fetch(`${RAILS_API}movie_rating.json?movie_id=${id}`, { headers: myHeaders })
            .then(response => response.json())
            .then(result => {
                this.setState({ rating: result })
            });
    }

    checkIfSeen(id) {
        fetch(`${RAILS_API}seen_movies.json?`, { headers: myHeaders })
            .then(response => response.json())
            .then(result => {
                result.forEach(element => {
                    if (element.id === id) {
                        this.setState({ seen: true })
                    }
                });
            });
    }

    checkIfWished(id) {
        fetch(`${RAILS_API}wished_movies.json?`, { headers: myHeaders })
            .then(response => response.json())
            .then(result => {
                result.forEach(element => {
                    if (element.id === id) {
                        this.setState({ wished: true })
                    }
                });
            });
    }

    addToSeen() {
        const { movie } = this.state;
        let route = `${RAILS_API}seen_movies.json?title=${movie.original_title}&id=${movie.id}&poster_path=${movie.poster_path}`
        fetch(`${route}`, { method: 'POST', headers: myHeaders })
            .then()
    }

    deleteFromSeen() {
        const { movie } = this.state;
        let route = `${RAILS_API}seen_movies.json?id=${movie.id}`
        fetch(`${route}`, { method: 'DELETE', headers: myHeaders })
            .then((r) => {
                location.reload();
            })
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
        this.setState({ credits: result.cast, crew: result.crew })
    }

    newRating(eventKey, event) {
        fetch(`${RAILS_API}ratings.json?movie_id=${this.state.movie.id}&rating=${eventKey}&title=${this.state.movie.original_title}`,
            {
                method: 'POST',
                headers: myHeaders
            })
            .then(r => location.reload())
    }

    updateRating(eventKey, event) {
        fetch(`${RAILS_API}ratings.json?movie_id=${this.state.movie.id}&rating=${eventKey}`,
            {
                method: 'PUT',
                headers: myHeaders
            })
            .then(r => location.reload())
    }

    componentWillMount() {
        this.getApiData()
    }

    render() {
        //let mini = `${IMAGE_PATH}w45/${this.state.movie.backdrop_path}`;
        let originalBackdrop = `${IMAGE_PATH}original${this.state.movie.backdrop_path}`;
        let addToSeenBtn = null;
        let addToWatchBtn = null;
        let addReviewBtn = null;
        let rating = null;
        let userRating = null;
        let setRating = null;
        let dropdown = null;


        if (this.state.logged_in) {
            if (!this.state.seen) {
                addToSeenBtn = <Button onClick={this.addToSeen}>Add to seen list</Button>
            }
            if (!this.state.wished) {
                addToWatchBtn = <Button onClick={this.addToWatch}>Add to watch list</Button>
            }
            if (this.state.seen) {
                addToSeenBtn = <Button onClick={this.deleteFromSeen}>Remove from seen list</Button>
                addReviewBtn = <Link to={`/new_review/${this.state.movie.id}`}><Button onClick={this.addReview}>Add a review</Button></Link>
            }
            if (this.state.rating.rating) {
                rating = <h3>Movie rating: {`${this.state.rating.rating}`}</h3>
                if (this.state.rating.user_rating.rating) {
                    userRating = <h3>Your rating: {`${this.state.rating.user_rating.rating}`}</h3>
                    setRating = this.updateRating
                } else {
                    setRating = this.newRating
                }
            } else {
                setRating = this.newRating
            }
            dropdown =
                (<DropdownButton onSelect={setRating} title="Add rating" id='dropdown-size-medium'>
                    <MenuItem eventKey="1">1</MenuItem>
                    <MenuItem eventKey="2">2</MenuItem>
                    <MenuItem eventKey="3">3</MenuItem>
                    <MenuItem eventKey="4">4</MenuItem>
                    <MenuItem eventKey="5">5</MenuItem>
                </ DropdownButton>)
        } else {
            if (this.state.rating.rating) rating = <h3>Movie rating: {`${this.state.rating.rating}`}</h3>
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
                        {rating}
                        {userRating}<br />
                        {dropdown}
                    </div>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Credits">
                            <div>
                                <h3>Credits</h3><br />
                                <div>
                                    {this.state.credits.map((item, index) =>
                                        <div key={index}>
                                            <p><Link to={`/people/${item.id}`}>{item.name}</Link>: {item.character}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey={2} title="Crew">
                            <div>
                                <h3>Crew</h3><br />
                                <div>
                                    {this.state.crew.map((item, index) =>
                                        <div key={index}>
                                            <p>{item.job}: <Link to={`/people/${item.id}`}>{item.name}</Link></p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default SingleMovie;