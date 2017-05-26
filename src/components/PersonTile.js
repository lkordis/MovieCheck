import React, { Component } from 'react';
import { IMAGE_PATH_W154 } from '../constants'
import { Link } from 'react-router-dom';
import '../App.css';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;
var bootstrap = require('bootstrap');

class PersonTile extends Component {
    render() {
        return (
            <figure className="grid-figure">
                <div className="review-tile">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-2">
                                <img src={`${IMAGE_PATH_W154}${this.props.people.profile_path}`} alt={this.props.people.profile_path} className="img-responsive" />
                            </div>
                            <div className="col-xs-10">
                                <h2>{this.props.people.name} {this.props.people.lastName}</h2>
                                <h3>Known for:</h3>
                                {this.props.people.known_for.map((item, index) => {
                                    if (item.original_title) {
                                        return <Link to={`/movie/${item.id}`} key={index}>{item.original_title}, </Link>
                                    } else {
                                        return <Link to={`/movie/${item.id}`} key={index}>{item.title}, </Link>
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </figure>
        )
    }
}

export default PersonTile