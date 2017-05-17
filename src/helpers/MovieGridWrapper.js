import React, { Component } from 'react';

import MovieGrid from '../components/MovieGrid';
import DiscoverApiData from './ApiData.js';
import { SearchMovie } from './SearchData'

class MovieGridWrapper extends Component {
    render() {
        var api = new DiscoverApiData();
        var search = new SearchMovie()
        return (
            <MovieGrid props={api} getApiData={api.getApiData} getInitialApiData={api.getInitialApiData} search={search} />
        )
    }
}

export default MovieGridWrapper;