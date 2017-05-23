import React, { Component } from 'react';

import MovieGrid from '../components/MovieGrid';
import PeopleGrid from '../components/PeopleGrid'
import FilterMovies from './FilterMovies'
import DiscoverApiData from '../helpers/ApiData.js';
import SearchMovie from '../SearchStrategy/SearchMovie'
import SearchPeople from '../SearchStrategy/SearchPeople'

import Limiter from 'limiter'

const search = new SearchMovie()
const search_people = new SearchPeople()
const tmdb_data = new DiscoverApiData();
const limiter = new Limiter.RateLimiter(40, 10000)

class MovieGridWrapper extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movies: [],
            people: [],
            searching_movies: false,
            searching_people: false,
            filtering: false,
            options: {
                genreId: '',
                lowerYear: '',
                higherYear: ''
            }
        }

        this.setMovies = this.setMovies.bind(this);
        this.getData = this.getData.bind(this);
        this.changeGenre = this.changeGenre.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.searchWithOptions = this.searchWithOptions.bind(this)
    }

    setMovies(results) {
        this.setState({
            movies: this.state.movies.concat(results)
        });
    }

    changeGenre(id) {
        this.setState({
            options: {
                genreId: id,
                lowerYear: this.state.options.lowerYear,
                higherYear: this.state.options.higherYear
            },
            filtering: true
        })

        this.searchWithOptions({
            genreId: id,
            lowerYear: this.state.options.lowerYear,
            higherYear: this.state.options.higherYear
        })
    }

    changeYear(span) {
        var parts = span.split(',')
        var lower = parts[0]
        var higher = parts[1]

        this.setState({
            options: {
                genreId: this.state.options.genreId,
                lowerYear: lower,
                higherYear: higher
            },
            filtering: true
        })

        this.searchWithOptions({
            genreId: this.state.options.genreId,
            lowerYear: lower,
            higherYear: higher
        })
    }

    searchWithOptions(options) {
        sessionStorage.setItem('options', JSON.stringify(options))
        console.log(JSON.parse(sessionStorage.getItem('options')))

        search.search('', options).then(result => {
            this.setState({
                movies: []
            });
            this.setState({
                movies: result
            });
        })
    }

    getData() {
        if (!this.state.searching_movies &&
            (sessionStorage.getItem('query') == null || sessionStorage.getItem('query') === '') &&
            (sessionStorage.getItem('options') == null)) {
            tmdb_data.getInitialApiData(this.setMovies);
        } else if (sessionStorage.getItem('query') !== '') {
            search.search(sessionStorage.getItem('query')).then(results => {
                this.setState({ movies: results })
            })
            search.search(sessionStorage.getItem('query')).then(results => {
                this.setMovies(results)
            })
        } else if (sessionStorage.getItem('options') !== {}) {
            this.searchWithOptions(JSON.parse(sessionStorage.getItem('options')))
        } else if (this.state.searching_people && sessionStorage.getItem('query') !== '') {
            search_people.search(sessionStorage.getItem('query')).then((results) => {
                this.setState({ people: results })
                this.setState({ searching_people: true })
            })
        }
    }

    componentWillMount() {
        this.getData()
    }

    componentDidMount() {
        window.addEventListener('Movies', (e) => {
            if (e.detail === '') {
                this.setState({ searching_movies: false, movies: [] })
                tmdb_data.getInitialApiData(this.setMovies);
                sessionStorage.setItem('query', e.detail)
            } else {
                limiter.removeTokens(1, () => {
                    this.setState({ searching_movies: true, movies: [] })
                    sessionStorage.setItem('query', e.detail)
                    search.search(e.detail).then((results) => {
                        this.setState({ movies: results })
                    })
                })
            }
        })

        window.addEventListener('People', (e) => {
            if (e.detail === '') {
                this.setState({ searching_people: false, movies: [] })
                tmdb_data.getInitialApiData(this.setMovies);
                sessionStorage.setItem('query', e.detail)
            } else {
                limiter.removeTokens(1, () => {
                    sessionStorage.setItem('query', e.detail)
                    search_people.search(e.detail).then((results) => {
                        console.log(results)
                        this.setState({ people: results })
                        this.setState({ searching_people: true })
                    })
                })
            }
        })

        window.addEventListener('page_end', (e) => {
            if (!this.state.searching_movies && !this.state.filtering) {
                tmdb_data.getApiData(this.setMovies)
                tmdb_data.getApiData(this.setMovies)
            } else if (!this.state.filtering && this.state.searching_movies) {
                search.page++;
                search.search(sessionStorage.getItem('query')).then(results => {
                    this.setMovies(results)
                })
            } else {
                search.page++;
                search.search('', JSON.parse(sessionStorage.getItem('options'))).then(result => {
                    this.setState({
                        movies: this.state.movies.concat(result)
                    });
                })
            }
        })
    }

    render() {
        let grid =
            <div>
                <FilterMovies changeGenre={this.changeGenre} changeYear={this.changeYear} />
                <MovieGrid movies={this.state.movies} />
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

export default MovieGridWrapper;