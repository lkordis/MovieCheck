import React, { Component } from 'react';

import MovieGrid from '../components/MovieGrid';
import SearchResultGrid from '../components/SearchResultGrid'
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
            searching: false,
            filtering: false,
            options: {
                genreId: '',
                lowerYear: '',
                higherYear: '',
                sort_by: ''
            }
        }

        this.setMovies = this.setMovies.bind(this);
        this.getData = this.getData.bind(this);
        this.changeGenre = this.changeGenre.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.searchWithOptions = this.searchWithOptions.bind(this)
        this.onPageEnd = this.onPageEnd.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.searchAll = this.searchAll.bind(this)
        this.changeSortBy = this.changeSortBy.bind(this)
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
                higherYear: this.state.options.higherYear,
                sort_by: this.state.options.sort_by
            },
            filtering: true
        })

        this.searchWithOptions({
            genreId: id,
            lowerYear: this.state.options.lowerYear,
            higherYear: this.state.options.higherYear,
            sort_by: this.state.options.sort_by
        })
    }

    changeSortBy(value) {
        this.setState({
            options: {
                genreId: this.state.options.genreId,
                lowerYear: this.state.options.lowerYear,
                higherYear: this.state.options.higherYear,
                sort_by: value
            },
            filtering: true
        })

        this.searchWithOptions({
            genreId: this.state.options.genreId,
            lowerYear: this.state.options.lowerYear,
            higherYear: this.state.options.higherYear,
            sort_by: value
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
                higherYear: higher,
                sort_by: this.state.options.sort_by
            },
            filtering: true
        })

        this.searchWithOptions({
            genreId: this.state.options.genreId,
            lowerYear: lower,
            higherYear: higher,
            sort_by: this.state.options.sort_by
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

    onPageEnd(e) {
        if (!this.state.searching && !this.state.filtering) {
            tmdb_data.getApiData(this.setMovies)
            tmdb_data.getApiData(this.setMovies)
        } else {
            search.page++;
            search.search('', JSON.parse(sessionStorage.getItem('options'))).then(result => {
                this.setState({
                    movies: this.state.movies.concat(result)
                });
            })
        }
    }

    onSearch(e) {
        this.searchAll(e.detail)
    }

    searchAll(query) {
        console.log(query)
        if (query === '') {
            this.setState({ searching: false, movies: [], people: [] })
            tmdb_data.getInitialApiData(this.setMovies);
            sessionStorage.setItem('query', query)
        } else {
            this.setState({ searching: true, movies: [], people: [] })
            sessionStorage.setItem('query', query)
            limiter.removeTokens(1, () => {
                this.setState({ movies: [], people: [] })
                search.search(query).then((results) => {
                    this.setState({ movies: results })
                    search_people.search(query).then((people) => {
                        this.setState({ people })
                    })
                })
            })
        }
        console.log(sessionStorage.getItem('query'))
    }

    getData() {
        console.log(sessionStorage.getItem('query'))
        if (!this.state.searching &&
            (sessionStorage.getItem('query') == null || sessionStorage.getItem('query') === '') &&
            (sessionStorage.getItem('options') == null)) {
            tmdb_data.getInitialApiData(this.setMovies);
        } else if (sessionStorage.getItem('query') !== '') {
            this.setState({ searching: true })
            this.searchAll(sessionStorage.getItem('query'))
        } else if (sessionStorage.getItem('options') !== {}) {
            this.searchWithOptions(JSON.parse(sessionStorage.getItem('options')))
        }
    }

    componentWillMount() {
        this.getData()

        addEventListener('search', this.onSearch)
        addEventListener('page_end', this.onPageEnd)
    }

    componentWillUnmount() {
        removeEventListener('search', this.onSearch)
        removeEventListener('page_end', this.onPageEnd)
    }

    render() {
        let grid =
            <div>
                <FilterMovies changeGenre={this.changeGenre} changeYear={this.changeYear} changeSortBy={this.changeSortBy}/>
                <MovieGrid movies={this.state.movies} />
            </div>

        if (this.state.searching) {
            grid =
                <div>
                    <SearchResultGrid movies={this.state.movies} people={this.state.people} />
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