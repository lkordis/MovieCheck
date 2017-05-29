import React, { Component } from 'react';
import '../App.css';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import { IMAGE_PATH_W154 } from '../constants'
import { getPeopleDetails, getPeopleCredits } from '../helpers/TmdbActions'
import MovieGrid from '../components/MovieGrid';

class SinglePerson extends Component {
    constructor(props) {
        super(props)

        this.state = {
            person: {},
            credits: {}
        }

        this.getData = this.getData.bind(this)
    }

    async getData() {
        await getPeopleDetails(this.props.match.params.personId).then(result => {
            this.setState({ person: result })
        })
        await getPeopleCredits(this.props.match.params.personId).then(result => {
            this.setState({ credits: result })
        })
    }

    async componentWillMount() {
        await this.getData()
    }

    render() {
        var movies = null;
        if (this.state.credits.cast) movies = <MovieGrid movies={this.state.credits.cast} />
        return (
            <div style={{
                display: 'flex',
                maxWidth: '65%',
                backgroundColor: '#2b2929',
                position: 'relative',
                margin: 'auto'
            }}>
                <div style={{ color: 'white', position: 'relative', margin: 'auto' }}>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12} md={8} lg={3}>
                                <Image src={`${IMAGE_PATH_W154}${this.state.person.profile_path}`} alt={this.state.person.profile_path} className="img-responsive" />
                            </Col>
                            <Col xs={6} md={4} lg={9}>
                                <h2 style={{ fontFamily: 'Monospace' }}>{this.state.person.name}</h2><br />
                                <p style={{ position: 'relative' }}>{this.state.person.biography}</p>
                            </Col>
                        </Row>
                    </Grid>
                    <div>
                        <h3 style={{ fontFamily: 'Monospace' }}> Movies </h3>
                        {movies}
                    </div>
                </div>
            </div>
        )
    }
}

export default SinglePerson;