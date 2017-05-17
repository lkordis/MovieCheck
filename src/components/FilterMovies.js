import React, { Component } from 'react';
import '../App.css';
import { MOVIE_GENRES } from '../constants'
import { DropdownButton, MenuItem } from 'react-bootstrap'

class FilterMovies extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{}} className="filter">
                <DropdownButton bsStyle='default' title="Genre" id='dropdown-size-medium'>
                    {MOVIE_GENRES.map((item, index) =>
                        <div key={index}>
                            <MenuItem>{item.name}</MenuItem>
                        </div>
                    )}
                </DropdownButton>
            </div>
        )
    }
}

export default FilterMovies;