import { TMDB_API_KEY } from '../config'
import Tmdb from 'moviedb'

const tmdb = Tmdb(TMDB_API_KEY)

class SearchPeople {
    constructor() {
        this.page = 1
        this.total_pages = 1
        this.query = ''

        this.search = this.search.bind(this)
        this.searchImages = this.searchImages.bind(this)
    }

    search(query) {
        if (this.query !== query) this.page = 1
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

    searchImages(id) {
        return new Promise((resolve, reject) => {
            tmdb.personImages({ id: id }, (err, result) => {
                console.log(result)
                resolve(result)
            })
        })
    }
}

export default SearchPeople