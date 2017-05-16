import { TMDB_API_KEY } from '../config'

let DISCOVER_ROUTE = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=`;
let RAIL_BASE = "https://peaceful-reef-40428.herokuapp.com/user_movies.json"

var myHeaders = new Headers()
myHeaders.append("Authorization", localStorage.getItem("Authorization"));

class DiscoverApiData {
    constructor(route) {
        this.page = 2;

        this.fetchData = this.fetchData.bind(this);
        this.getApiData = this.getApiData.bind(this);
        this.getInitialApiData = this.getInitialApiData.bind(this);

    }

    fetchData(callback) {
        if (localStorage.getItem("Authorization") != null) {
            fetch(`${RAIL_BASE}`, { headers: myHeaders })
                .then(rails_response => { 
                    console.log(rails_response)
                    if(rails_response.statusText === 'Unauthorized') return [];
                    return rails_response.json() 
                })
                .then(user_movies => {
                    fetch(`${DISCOVER_ROUTE}${this.page}`)
                        .then(response => response.json())
                        .then(results => {
                            callback(results.results.filter(value => {
                                return !user_movies.find(movie => { return movie.id === value.id })
                            }))
                            this.page++;
                        });
                })
        } else {
            fetch(`${DISCOVER_ROUTE}${this.page}`)
                .then(response => response.json())
                .then(results => {
                    callback(results.results)
                    this.page++;
                });
        }
    }

    getInitialApiData(callback) {
        this.fetchData(callback);
        this.fetchData(callback);
    }

    getApiData(callback) {
        this.fetchData(callback);
    }
}

export default DiscoverApiData;