import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MovieGrid from '../components/MovieGrid';
import PeopleGrid from '../components/PeopleGrid'

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
var bootstrap = require('bootstrap');

class SearchResultGrid extends Component {
    render() {
        var people = null
        var movies = null
        if (this.props.people) {
            people =
                <div className="col-lg-6">
                    <h2 style={{ color: 'white' }}>People</h2><br />
                    <PeopleGrid people={this.props.people.slice(0, 9)} />
                </div>
        }
        if (this.props.movies) {
            movies =
                <div className="col-lg-6">
                    <h2 style={{ color: 'white' }}>Movies</h2><br />
                    <MovieGrid movies={this.props.movies} />
                </div>
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    {people}
                    {movies}
                </div>
            </div>
        )
    }
}

SearchResultGrid.proptypes = {
    movie: PropTypes.array,
    people: PropTypes.array
}

export default SearchResultGrid