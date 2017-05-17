import React, { Component } from 'react';
import '../App.css';
import { TMDB_API_KEY } from '../config'
import Tmdb from 'tmdbapi'

import $ from "jquery";

import MovieTile from './MovieTile';
import DiscoverApiData from '../helpers/ApiData.js'

class MovieGrid extends Component {
    constructor(props) {
        super(props);

        this.tmdb = new Tmdb({
            apiv3: TMDB_API_KEY
        })

        this.state = {
            movies: [],
            searching: false,
            currentPage: 1,
            pages: 1,
            query: '',
        };

        this.setMovies = this.setMovies.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.search = this.search.bind(this);

        addEventListener('search', (e) => {
            this.setState({ movies: [] })
            this.search(e.detail).then(results => {
                var movies = results.results.filter(value => {
                    return value.media_type !== 'tv' && value.media_type !== 'person'// I'll use that in the future
                })
                if (e.detail === "") {
                    this.props.getApiData(this.setMovies)
                    this.props.getApiData(this.setMovies)

                    this.setState({
                        query: e.detail,
                        pages: results.total_pages,
                        searching: false
                    })
                } else {
                    this.setState({
                        movies: this.state.movies.concat(movies),
                        query: e.detail,
                        pages: results.total_pages,
                        searching: true,
                        currentPage: 1
                    })
                }
            })
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
            if ($(document).height() - win.height() === win.scrollTop() && this.state.currentPage <= this.state.pages) {
                console.log('Upao')
                this.setState({ currentPage: ++this.state.currentPage })
                console.log(this.state.currentPage)
                this.search(this.state.query, this.state.currentPage).then(results => {
                    var movies = results.results.filter(value => {
                        return value.media_type !== 'tv' && value.media_type !== 'person'// I'll use that in the future
                    })
                    this.setMovies(movies)
                })
            }
        }
    }

    search(query, page = 1) {
        return new Promise((resolve, reject) => {
            this.tmdb.search.multi({ query: query, page }).then(result => {
                resolve(result)
            }).catch(error => {
                reject(error)
            })
        })
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
        if (!this.state.searching) this.props.getInitialApiData(this.setMovies);
    }

    render() {
        const {
            movies
        } = this.state;

        return (
            <div className="photo-grid">
                {movies.map((item, index) =>
                    <div key={index}>
                        <MovieTile props={item} />
                    </div>
                )}
            </div>
        );
    }
}

MovieGrid.propTypes = {
    getApiData: React.PropTypes.func.isRequired,
    getInitialApiData: React.PropTypes.func.isRequired
};

export default MovieGrid;