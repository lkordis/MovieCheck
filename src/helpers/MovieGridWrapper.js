import React, { Component } from 'react';

import MovieGrid from '../components/MovieGrid';
import DiscoverApiData from './ApiData.js';
import { SearchMovie } from './SearchData'
import { DiscoverMovies } from '../helpers/SearchData.js'


class MovieGridWrapper extends Component {
    render() {
        var api = new DiscoverApiData();
        var search = new SearchMovie();
        var discover = new DiscoverMovies()
        return (
            <MovieGrid props={api} getApiData={api.getApiData} getInitialApiData={api.getInitialApiData} search={search} searchDiscover={discover.search}/>
        )
    }
}

export default MovieGridWrapper;