import React, { Component } from 'react';
import '../App.css';

import PeopleGrid from '../components/PeopleGrid'
import UserMoviesGridWrapper from './UserMoviesGridWrapper'
import SearchUserPeople from '../SearchStrategy/SearchUserPeople'

const search_people = new SearchUserPeople()

class UserProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            people: [],
            searching_people: false
        }
    }

    componentDidMount() {
        window.addEventListener('People_user', (e) => {
            if (e.detail === '') {
                this.setState({ searching_people: false })
                sessionStorage.setItem('query', e.detail)
            } else {
                sessionStorage.setItem('query', e.detail)
                search_people.search(e.detail).then((results) => {
                    console.log(results)
                    this.setState({ people: results })
                    this.setState({ searching_people: true })
                })
            }
        })
    }

    render() {
        var grid =
            <div>
                <UserMoviesGridWrapper type="seen_movies.json" text="Seen movies" />
                <UserMoviesGridWrapper type="wished_movies.json" text="Wished movies" />
            </div>

        if (this.state.searching_people) {
            grid =
                <div>
                    <PeopleGrid people={this.state.people} />
                </div>
        }
        return (
            <div>
                {grid}
            </div>
        )
    }
}

export default UserProfile;