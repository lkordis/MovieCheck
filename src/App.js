import React, { Component } from 'react';
import { BrowserRouter, Route, browserHistory } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import SingleMovie from './components/SingleMovie';
import NavbarInstance from './components/NavbarInstance';
import UserProfile from './components/UserProfile';
import NewReview from './components/NewReview';
import SingleReview from './components/SingleReview';

import MovieGridWrapper from './helpers/MovieGridWrapper';
import ReviewGridWrapper from './helpers/ReviewGridWrapper';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldReload: false
    }

    this.onUserChange = this.onUserChange.bind(this);
  }

  onUserChange() {
    this.setState({ shouldReload: !this.state.shouldReload })
    location.reload();
  }

  /**
   * const SearchGridWrapper = React.createClass({
   *    return(
   *      <div><SearchGrid movies={this.state.movies}></div>
   *    )
   * })
   */

  // <Route path="comments" component={() => (<Comments myProp="value" />)}/>

  render() {
    return (
      <BrowserRouter history={browserHistory}>
        <div className="App">
          <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Monoton|Raleway" rel="stylesheet" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/9.8.0/css/bootstrap-slider.css" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/9.8.0/bootstrap-slider.js"></script>
          
          <NavbarInstance onUserChange={this.onUserChange} />
          <Route path="/movie/:movieId" component={SingleMovie} />
          <Route path="/users/:userId" component={UserProfile} />
          <Route exact={true} path="/" component={MovieGridWrapper} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/register" component={Register} />
          <Route exact={true} path="/reviews" component={ReviewGridWrapper} />
          <Route exact={true} path="/reviews/:reviewId" />
          <Route exact={true} path="/new_review/:movieId" component={NewReview} />
          <Route exact={true} path="/reviews/:reviewId" component={SingleReview} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
