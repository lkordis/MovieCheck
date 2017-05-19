import { TMDB_API_KEY } from '../config'
import { RAILS_API } from '../constants'
import Tmdb from 'moviedb'

const tmdb = Tmdb(TMDB_API_KEY)
var myHeaders = new Headers()
myHeaders.append("Authorization", localStorage.getItem("Authorization"))

export class SearchMovie {
    constructor() {
        this.page = 1
        this.total_pages = 1

        this.search = this.search.bind(this)

        addEventListener('page_end', (e) => {
            this.page++;
        })
    }

    search(query) {
        if (this.query !== query) this.page = 1

        return new Promise((resolve, reject) => {
            tmdb.searchMovie({ query: query, page: this.page }, (err, result) => {
                if (err) reject(err)

                this.total_pages = result.total_pages
                this.query = query

                resolve(result.results)
            })
        })
    }

}

export class SearchPeople {
    constructor() {
        this.page = 1
        this.total_pages = 1
        this.query = ''

        this.search = this.search.bind(this)
    }

    search(query) {
        if (this.total_pages >= this.page) {
            return new Promise((resolve, reject) => {
                tmdb.searchPerson({ query: query, page: this.page }, (err, result) => {
                    if (err) reject(err)
                    console.log('Results:', result)
                    resolve(result.results)
                })
            })
        }
    }
}

export class DiscoverMovies {
    constructor() {
        this.page = 1;

        this.search = this.search.bind(this)
    }

    search(options) {
        return new Promise((resolve, reject) => {
            tmdb.discoverMovie({
                page: this.page,
                'primary_release_date.gte': options['primary_release_date.gte'],
                'primary_release_date.lte': options['primary_release_date.lte'],
                with_genres: options.with_genres
            }, (err, result) => {
                if (err) reject(err)
                resolve(result.results)
            })
        })
    }
}

export class SearchUsersMovies {
    constructor(route) {
        this.route = route
    }

    search(query) {
        return new Promise((resolve, reject) => {
            fetch(`${RAILS_API}search/${this.route}?query=${query}`, { headers: myHeaders })
                .then(response => response.json())
                .then(results => {
                    resolve(results)
                })
                .catch(err => reject(err))
        })
    }
}

