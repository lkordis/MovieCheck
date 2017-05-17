import { TMDB_API_KEY } from '../config'
import Tmdb from 'moviedb'

const tmdb = Tmdb(TMDB_API_KEY)

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

                console.log(result)
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

