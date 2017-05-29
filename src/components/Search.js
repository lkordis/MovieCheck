import React, { Component } from 'react';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
var bootstrap = require('bootstrap');

class Search extends Component {
    constructor(props) {
        super(props)

        this.onSearchChange = this.onSearchChange.bind(this)
    }

    onSearchChange(event) {
        var custom = null
        if (window.location.pathname.split('/').pop() === '') {
            custom = new CustomEvent("search", { 'detail': event.target.value });
            dispatchEvent(custom)
        } else if (window.location.pathname.split('/')[1].startsWith("user")) {
            custom = new CustomEvent(`search_user`, { 'detail': event.target.value });
            dispatchEvent(custom)
        }

        // if (window.location.pathname.split('/').pop() !== '') window.location.replace('/')
    }

    render() {
        return (
            <div className="col-lg-12">
                <input type="text" className="form-control" aria-label="..." placeholder="Search" onChange={this.onSearchChange} />
            </div>
        )
    }
}

export default Search