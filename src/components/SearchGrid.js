import React, { Component } from 'react';
import '../App.css';
import { TMDB_API_KEY } from '../config'
import Tmdb from 'tmdbapi'
import MovieTile from './MovieTile';


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

        addEventListener('search', (e) => {
            this.setState({ movies: [] })
            this.search(e.detail).then(results => {
                var movies = results.results.filter(value => {
                    return value.media_type !== 'tv' && value.media_type !== 'person'// I'll use that in the future
                })
                this.setState({ movies: this.state.movies.concat(movies) })
            })
        })
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

    render() {
        return (
            <div className="photo-grid">
                {this.state.movies.map((item, index) =>
                    <div key={index}>
                        <MovieTile props={item} />
                    </div>
                )}
            </div>
        )
    }
}

export default SearchGrid