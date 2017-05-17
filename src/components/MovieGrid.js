import React, { Component } from 'react';
import '../App.css';
import Limiter from 'limiter'

import $ from "jquery";

import MovieTile from './MovieTile';
import FilterMovies from './FilterMovies'
import DiscoverApiData from '../helpers/ApiData.js'

class MovieGrid extends Component {
    constructor(props) {
        super(props);

        this.limiter = new Limiter.RateLimiter(40, 10000)

        this.state = {
            movies: [],
            searching: false,
            genreId: ''
        };

        this.setMovies = this.setMovies.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        addEventListener('search', (e) => {
            if (e.detail === '') {
                this.setState({ searching: false, movies: [] })
                this.props.props.page = 1
                this.props.getInitialApiData(this.setMovies);
                sessionStorage.setItem('query', e.detail)
            } else {
                this.limiter.removeTokens(1, () => {
                    this.setState({ searching: true, movies: [] })
                    sessionStorage.setItem('query', e.detail)
                    this.props.search.search(e.detail).then((results) => {
                        this.setState({ movies: results })
                    })
                    this.props.search.search(e.detail).then((results) => {
                        this.setMovies(results)
                    })
                })
            }
        })
    }

    handleScroll(event) {
        var win = $(window);
        if (this.props.props instanceof DiscoverApiData && !this.state.searching) {
            if ($(document).height() - win.height() === win.scrollTop()) {
                this.props.getApiData(this.setMovies)
                this.props.getApiData(this.setMovies)
            }
        } else if (this.state.searching) {
            if ($(document).height() - win.height() === win.scrollTop()) {
                var custom = new CustomEvent('page_end', { detail: sessionStorage.getItem('query') })
                dispatchEvent(custom)

                this.props.search.search(sessionStorage.getItem('query')).then(results => {
                    this.setMovies(results)
                })
            }
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };

    setMovies(results) {
        this.setState({
            movies: this.state.movies.concat(results)
        });
    }

    componentWillMount() {
        console.log(sessionStorage.getItem('query'))
        if (!this.state.searching && (sessionStorage.getItem('query') == null || sessionStorage.getItem('query') === '')) {
            this.props.getInitialApiData(this.setMovies);
        } else if (sessionStorage.getItem('query')) {
            this.props.search.search(sessionStorage.getItem('query')).then(results => {
                this.setState({ movies: results })
            })
            this.props.search.search(sessionStorage.getItem('query')).then(results => {
                this.setMovies(results)
            })
        }
    }

    render() {
        const {
            movies
        } = this.state;

        return (
            <div>
                <FilterMovies />
                <div className="photo-grid">
                    {movies.map((item, index) =>
                        <div key={index}>
                            <MovieTile props={item} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

MovieGrid.propTypes = {
    getApiData: React.PropTypes.func.isRequired,
    getInitialApiData: React.PropTypes.func.isRequired,
};

export default MovieGrid;