import React, { Component } from 'react';
import '../App.css';
import $ from "jquery";

import PersonTile from './PersonTile'

class PeopleGrid extends Component {
    constructor(props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(event) {
        var win = $(window);
        if ($(document).height() - win.height() === win.scrollTop()) {
            var custom = new CustomEvent('page_end', { detail: sessionStorage.getItem('query') })
            dispatchEvent(custom)
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };

    render() {
        return (
            <div className="review-grid">
                {this.props.people.map((item, index) =>
                    <div key={index}>
                        <PersonTile people={item} />
                    </div>
                )}
            </div>
        );
    }
}

export default PeopleGrid