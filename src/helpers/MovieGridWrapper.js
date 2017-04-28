import React, { Component } from 'react';

import MovieGrid from '../components/MovieGrid';
import DiscoverApiData from './ApiData.js'

class MovieGridWrapper extends Component {
    render(){
        var api = new DiscoverApiData();
        return (
            <MovieGrid props={api} getApiData={api.getApiData} getInitialApiData={api.getInitialApiData}/>
        )
    }
}

export default MovieGridWrapper;