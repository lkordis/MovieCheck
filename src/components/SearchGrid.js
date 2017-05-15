import React, { Component } from 'react';
import '../App.css';
import { TMDB_API_KEY } from '../config'
import Tmdb from 'tmdbapi'

class SearchGrid extends Component {
    constructor(props) {
        super(props)

        this.tmdb = new Tmdb({
            apiv3: TMDB_API_KEY
        })

        this.state = {
            movies: []
        }

        this.search = this.search.bind(this)
    }

    search(query) {
        return new Promise((resolve, reject) => {
            this.tmdb.search.multi({ query: query }).then(result => {
                resolve(result)
            }).catch(error => {
                reject(error)
            })
        })
    }

    componentWillMount() {
        this.search(this.props.match.params.query).then(results => {
            console.log(results)
        })        
    }

    render() {
        return(
            <div>
                <h1>{this.props.match.params.query}</h1>
            </div>
        )
    }
}

export default SearchGrid