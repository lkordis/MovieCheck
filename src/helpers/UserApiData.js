var myHeaders = new Headers()
myHeaders.append("Authorization", localStorage.getItem("Authorization"));

class UserApiData {
    constructor(route) {
        this.route = route;

        this.fetchData = this.fetchData.bind(this);
        this.getApiData = this.getApiData.bind(this);
        this.getInitialApiData = this.getInitialApiData.bind(this);
    }

    fetchData(callback) {
        fetch(`${this.route}`, { headers: myHeaders })
            .then(response => response.json())
            .then(results => callback(results));
    }

    getInitialApiData(callback) {
        this.fetchData(callback);
    }

    getApiData(callback) {
        this.fetchData(callback);
    }
}

export default UserApiData;