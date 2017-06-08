import React, { Component } from 'react';
import '../App.css';
import { MOVIE_GENRES, SORT_BY } from '../constants'
import { DropdownButton, MenuItem, Grid, Row, Col } from 'react-bootstrap'
import 'bootstrap-slider'
import $ from "jquery";

class FilterMovies extends Component {
    constructor(props) {
        super(props)

        this.state = {
            genre: 'Genre',
            sort_by: 'Sort by'
        }

        this.changeGenre = this.changeGenre.bind(this)
        this.changeYear = this.changeYear.bind(this)
        this.changeSortBy = this.changeSortBy.bind(this)
    }

    changeGenre(event) {
        var str = event.target.id
        MOVIE_GENRES.forEach(item =>
        { if (item.id == str) this.setState({ genre: item.name }) })

        this.props.changeGenre(str)
    }

    changeYear(event) {
        this.props.changeYear(event.target.value)
    }

    changeSortBy(event) {
        var str = event.target.id
        SORT_BY.forEach(item =>
        { if (item.id === str) this.setState({ sort_by: item.title }) })
        this.props.changeSortBy(str)
    }

    componentDidMount() {
        $("#ex2").slider({});
        $("#ex2").on("slide", this.changeYear);
    }

    render() {
        return (
            <div className="filter" style={{ color: 'white' }}>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={2} lg={2}>
                            <DropdownButton bsStyle='default' title={this.state.genre} id='dropdown-size-medium'>
                                {MOVIE_GENRES.map((item, index) =>
                                    <div key={index}>
                                        <MenuItem onClick={this.changeGenre} id={item.id}>{item.name}</MenuItem>
                                    </div>
                                )}
                            </DropdownButton>
                        </Col>
                        <Col xs={12} md={2} lg={2}>
                            <DropdownButton bsStyle='default' title={this.state.sort_by} id='dropdown-size-medium'>
                                {SORT_BY.map((item, index) =>
                                    <div key={index}>
                                        <MenuItem onClick={this.changeSortBy} id={item.id}>{item.title}</MenuItem>
                                    </div>
                                )}
                            </DropdownButton>
                        </Col>
                        <Col xs={12} md={5} lg={5}>
                            <div >
                                <p>Year interval </p>
                                <input
                                    id="ex2"
                                    type="text"
                                    className="span2" value=""
                                    data-slider-min="1940"
                                    data-slider-max="2017"
                                    data-slider-step="1"
                                    data-slider-value="[1940,2017]"
                                />
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>

        )
    }
}

export default FilterMovies;