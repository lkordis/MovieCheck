import { TMDB_API_KEY } from '../config'
import Tmdb from 'moviedb'

const tmdb = Tmdb(TMDB_API_KEY)

class SearchMovie {
    constructor() {
        this.page = 1
        this.total_pages = 1
        this.options = {}

        this.search = this.search.bind(this)
        this.handleTextSearch = this.handleTextSearch.bind(this)
        this.handleFilter = this.handleFilter.bind(this)
    }

    handleTextSearch(query) {
        if (this.query !== query) this.page = 1

        return new Promise((resolve, reject) => {
            tmdb.searchMovie({ query, page: this.page }, (err, result) => {
                if (err) reject(err)

                this.total_pages = result.total_pages
                this.query = query

                resolve(result.results)
            })
        })
    }

    handleFilter(options) {
        console.log(this.options)
        if (JSON.stringify(this.options) !== JSON.stringify(options)) this.page = 1

        return new Promise((resolve, reject) => {
            tmdb.discoverMovie({
                page: this.page,
                'primary_release_date.gte': options.lowerYear,
                'primary_release_date.lte': options.higherYear,
                with_genres: options.genreId,
                sort_by: options.sort_by
            }, (err, result) => {
                if (err) reject(err)

                this.total_pages = result.total_pages
                this.options = options

                resolve(result.results)
            })
        })
    }

    search(query, options = {}) {
        if (query !== '') {
            if (options === {}) return this.handleTextSearch(query)
            //return this.handleFilteredTextSearch(query, options)
        } else if (options) {
            return this.handleFilter(options)
        }
        return this.handleTextSearch(query)
    }
}

export default SearchMovie