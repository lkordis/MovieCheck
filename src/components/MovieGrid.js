import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

import $ from "jquery";

import MovieTile from './MovieTile';

class MovieGrid extends Component {
    constructor(props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(event) {
        var win = $(window);
        if ($(document).height() - win.height() === win.scrollTop()) {
            var custom = new CustomEvent('page_end', { detail: sessionStorage.getItem('query') })
            dispatchEvent(custom)
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };

    render() {
        return (
            <div>
                <div className="photo-grid">
                    {this.props.movies.map((item, index) =>
                        <div key={index}>
                            <MovieTile props={item} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

MovieGrid.proptypes = {
    movies: PropTypes.array
}


export default MovieGrid;