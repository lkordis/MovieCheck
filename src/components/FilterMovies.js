import React, { Component } from 'react';
import '../App.css';
import { MOVIE_GENRES } from '../constants'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import 'bootstrap-slider'
import $ from "jquery";


class FilterMovies extends Component {
    constructor(props) {
        super(props)

        this.changeGenre = this.changeGenre.bind(this)
        this.changeYear = this.changeYear.bind(this)
    }

    changeGenre(event) {
        this.props.changeGenre(event.target.id)
    }

    changeYear(event) {
        this.props.changeYear(event.target.value)
    }

    componentDidMount() {
        $("#ex2").slider({});
        $("#ex2").on("slide", this.changeYear);
    }

    render() {
        return (
            <div className="filter">
                <DropdownButton bsStyle='default' title="Genre" id='dropdown-size-medium'>
                    {MOVIE_GENRES.map((item, index) =>
                        <div key={index}>
                            <MenuItem onClick={this.changeGenre} id={item.id}>{item.name}</MenuItem>
                        </div>
                    )}
                </DropdownButton>
                <div >
                    Filter by year interval: <b>1940</b>
                    <input
                        id="ex2"
                        type="text"
                        className="span2" value=""
                        data-slider-min="1940"
                        data-slider-max="2017"
                        data-slider-step="1"
                        data-slider-value="[1940,2017]"
                    />
                    <b>2017</b>
                </div>
            </div>
        )
    }
}

export default FilterMovies;