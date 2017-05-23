import React, { Component } from 'react';
import '../App.css';
import { RAILS_API } from '../constants'

import UserApiData from '../helpers/UserApiData'
import SearchUserMovie from '../SearchStrategy/SearchUserMovie'

import MovieGrid from '../components/MovieGrid';

class UserMoviesGridWrapper extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movies: [],
            searching: false,
        }

        this.user_movies_api = new UserApiData(`${RAILS_API}${this.props.type}`)
        this.search = new SearchUserMovie(this.props.type)
        this.setMovies = this.setMovies.bind(this)
    }

    componentWillMount() {
        this.user_movies_api.getInitialApiData((results) => {
            this.setState({ movies: results })
        })
    }

    setMovies(movies) {
        this.setState({ movies })
    }

    componentDidMount() {
        window.addEventListener('Movies_user', (e) => {
            if (e.detail === '') {
                this.setState({ searching: false, movies: [] })
                this.user_movies_api.getInitialApiData(this.setMovies);
                sessionStorage.setItem('query', e.detail)
            } else {
                this.setState({ searching: true, movies: [] })
                sessionStorage.setItem('query', e.detail)

                this.search.search(e.detail).then((results) => {
                    this.setState({ movies: results })
                })
            }
        })
    }

    render() {
        return (
            <div>
                <h2>{this.props.text}</h2>
                <MovieGrid movies={this.state.movies} />
            </div>
        )
    }
}

export default UserMoviesGridWrapper;