import React, { Component } from 'react';
import '../App.css';
import { RAILS_API } from '../constants'
import { Link } from 'react-router-dom';

import PeopleGrid from '../components/PeopleGrid'
import UserMoviesGridWrapper from './UserMoviesGridWrapper'
import UserApiData from '../helpers/UserApiData'
import SearchUserPeople from '../SearchStrategy/SearchUserPeople'

const search_people = new SearchUserPeople()

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
var bootstrap = require('bootstrap');

class UserProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            people: [],
            searching_people: false,
            user: {}
        }
        this.onSearch = this.onSearch.bind(this)
        this.user_movies_api = new UserApiData(`${RAILS_API}users/${this.props.match.params.userId}.json`)
    }

    componentWillMount() {
        this.user_movies_api.getApiData((result) => {
            this.setState({ user: result })
        })
    }

    onSearch(e) {
        if (e.detail === '') {
            this.setState({ searching_people: false })
            sessionStorage.setItem('query', e.detail)
        } else {
            sessionStorage.setItem('query', e.detail)
            search_people.search(e.detail).then((results) => {
                this.setState({ people: results })
                this.setState({ searching_people: true })
            })
        }
    }

    componentDidMount() {
        window.addEventListener('search_user', this.onSearch)
    }

    componentWillUnmount() {
        removeEventListener('search_user', this.onSearch)
    }

    render() {
        var movies =
            <div className="col-lg-12">
                <UserMoviesGridWrapper type={`seen_movies.json`} id={`${this.props.match.params.userId}`} text="Seen movies" />
                <UserMoviesGridWrapper type={`wished_movies.json`} id={`${this.props.match.params.userId}`} text="Wished movies" />
            </div>;
        var people = null
        if (this.state.searching_people) {
            people =
                (<div className="col-lg-6">
                    <h3>People</h3>
                    <PeopleGrid people={this.state.people} />
                </div>)

            var movies =
                <div className="col-lg-6">
                    <UserMoviesGridWrapper type={`seen_movies.json`} id={`${this.props.match.params.userId}`} text="Seen movies" />
                    <UserMoviesGridWrapper type={`wished_movies.json`} id={`${this.props.match.params.userId}`} text="Wished movies" />
                </div>;
        }
        return (
            <div className="container-fluid" style={{ color: 'white', fontFamily: 'Monospace' }}>
                <h2>{this.state.user.name}  {this.state.user.last_name}</h2>
                <Link to={`/user/${this.state.user.id}/reviews`}>{this.state.user.name}'s reviews</Link>
                <div className="row">
                    {people}
                    {movies}
                </div>
            </div>
        )
    }
}

export default UserProfile;