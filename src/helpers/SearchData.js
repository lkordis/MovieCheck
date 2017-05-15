import { TMDB_API_KEY } from '../config'
import Tmdb from 'tmdb'

class SearchData {
    constructor() {
        this.tmdb = new Tmdb({
            apiv3: TMDB_API_KEY
        })
    }

    search(query) {
        return new Promise((resolve, reject) => {
            tmdb.search.multi({ query: query }).then(result => {
                resolve(result)
            }).catch(error => {
                reject(error)
            })
        })
    }
}