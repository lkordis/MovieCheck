import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

let IMAGE_PATH = "https://image.tmdb.org/t/p/w154";

class MovieTile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: props.props
        };
    }

    shouldComponentUpdate(nextProps, nextState){
        return false;
    }

    render() {
        var src = IMAGE_PATH.concat(this.state.movie.poster_path);
        return (
            <figure className="grid-figure">
                <div className="grid-photo-wrap">
                    <Link to={`/movie/${this.state.movie.id}`}><img src={src} alt={this.state.movie.title} className="grid-photo" /></Link>
                </div>
            </figure>
        );
    }
}

export default MovieTile;