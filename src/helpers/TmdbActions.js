import { TMDB_API_KEY } from '../config'
import Tmdb from 'moviedb'

const tmdb = Tmdb(TMDB_API_KEY)

export function getPeopleDetails(idPerson) {
    return new Promise((resolve, reject) => {
        tmdb.personInfo({ id: idPerson }, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

export function getPeopleCredits(idPerson) {
    return new Promise((resolve, reject) => {
        tmdb.personMovieCredits({ id: idPerson }, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}