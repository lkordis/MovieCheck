import React, { Component } from 'react';
import '../App.css';

import MovieGrid from './MovieGrid'

import UserApiData from '../helpers/UserApiData'

let BASE = "https://peaceful-reef-40428.herokuapp.com/"
let SEEN_MOVIES = "seen_movies.json"
let WISH_LIST = "wished_movies.json"

class UserProfile extends Component {
    render() {
        var seen_movies_api = new UserApiData(`${BASE}${SEEN_MOVIES}`)
        var wished_movies_api = new UserApiData(`${BASE}${WISH_LIST}`)
        return (
            <div>
                <h2>Seen movies</h2>
                <MovieGrid props={seen_movies_api} getApiData={seen_movies_api.getApiData} getInitialApiData={seen_movies_api.getInitialApiData} />
                <h2>Wish list</h2>
                <MovieGrid props={wished_movies_api} getApiData={wished_movies_api.getApiData} getInitialApiData={wished_movies_api.getInitialApiData} />
            </div>
        )
    }
}

export default UserProfile;