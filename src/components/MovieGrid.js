import React, { Component } from 'react';
import MovieTile from './MovieTile';
import '../App.css';

import $ from "jquery";

let API_KEY = "0649ca7815178f68273bfb149e7716cc";
let DISCOVER_ROUTE = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=`;

class MovieGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            page: 2
        };

        this.getApiData = this.getApiData.bind(this);
        this.setMovies = this.setMovies.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(event){
        var win = $(window);
        if ($(document).height() - win.height() === win.scrollTop()) {
            this.getApiData(this.state.page++)
            this.setState({page: this.state.page++})
            this.getApiData(this.state.page++)
            this.setState({page: this.state.page++})
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

    getApiData(page) {
        fetch(`${DISCOVER_ROUTE}${page}`)
            .then(response => response.json())
            .then(results => this.setMovies(results.results));

    }

    componentWillMount() {
        this.getApiData(1);
        this.getApiData(2);
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

export default MovieGrid;