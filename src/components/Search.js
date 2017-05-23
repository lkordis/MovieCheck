import React, { Component } from 'react';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
var bootstrap = require('bootstrap');

class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search_option: ''
        }

        this.onSearchChange = this.onSearchChange.bind(this)
        this.changeOptions = this.changeOptions.bind(this)
    }

    onSearchChange(event) {
        var custom = null
        if (window.location.pathname.split('/').pop() === '') {
            custom = new CustomEvent(this.state.search_option, { 'detail': event.target.value });
            dispatchEvent(custom)
        } else if (window.location.pathname.split('/')[1].startsWith("user")) {
            custom = new CustomEvent(`${this.state.search_option}_user`, { 'detail': event.target.value });
            dispatchEvent(custom)
        }
        
        // if (window.location.pathname.split('/').pop() !== '') window.location.replace('/')
    }

    changeOptions(event) {
        console.log(event.target.text)
        this.setState({ search_option: event.target.text })
    }

    render() {
        let search_option = "Search option"
        if (this.state.search_option !== '') search_option = this.state.search_option
        return (
            <div className="col-lg-12">
                <input type="text" className="form-control" aria-label="..." placeholder="Search" onChange={this.onSearchChange} />
                <div className="input-group">
                    <div className="input-group-btn">
                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {search_option} <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a onClick={this.changeOptions}>Movies</a></li>
                            <li><a onClick={this.changeOptions} >People</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search