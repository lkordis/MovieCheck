import React, { Component } from 'react';
import '../App.css';
import { RAILS_API } from '../constants'

import MovieGrid from './MovieGrid'
import UserApiData from '../helpers/UserApiData'
import { SearchUsersMovies } from '../helpers/SearchData'

const SEEN_MOVIES = "seen_movies.json"
const WISH_LIST = "wished_movies.json"

class UserProfile extends Component {
    render() {
        var seen_movies_api = new UserApiData(`${RAILS_API}${SEEN_MOVIES}`)
        var wished_movies_api = new UserApiData(`${RAILS_API}${WISH_LIST}`)
        var search_seen = new SearchUsersMovies(SEEN_MOVIES)
        var search_wish = new SearchUsersMovies(WISH_LIST)
        return (
            <div>
                <h2>Seen movies</h2>
                <MovieGrid props={seen_movies_api} getApiData={seen_movies_api.getApiData} getInitialApiData={seen_movies_api.getInitialApiData} search={search_seen} />
                <h2>Wish list</h2>
                <MovieGrid props={wished_movies_api} getApiData={wished_movies_api.getApiData} getInitialApiData={wished_movies_api.getInitialApiData} search={search_wish} />
            </div>
        )
    }
}

export default UserProfile;