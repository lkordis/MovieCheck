import React, { Component } from 'react';
import '../App.css';

import $ from "jquery";

import MovieTile from './MovieTile';
import DiscoverApiData from '../helpers/ApiData.js'

class MovieGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        };

        this.setMovies = this.setMovies.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(event) {
        if (this.props.props instanceof DiscoverApiData)
        {
            var win = $(window);
            if ($(document).height() - win.height() === win.scrollTop()) {
                this.props.getApiData(this.setMovies)
                this.props.getApiData(this.setMovies)
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
        this.props.getInitialApiData(this.setMovies);
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