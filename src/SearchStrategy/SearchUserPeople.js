import { RAILS_API } from '../constants'

var myHeaders = new Headers()
myHeaders.append("Authorization", localStorage.getItem("Authorization"))

class SearchUserPeople {
    search(query) {
        return new Promise((resolve, reject) => {
            fetch(`${RAILS_API}search/people?query=${query}`, { headers: myHeaders })
                .then(response => response.json())
                .then(results => {
                    resolve(results)
                })
                .catch(err => reject(err))
        })
    }
}

export default SearchUserPeople;