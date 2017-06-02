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
import SinglePerson from './components/SinglePerson';
import UsersSearchGrid from './components/UsersSearchGrid'

import MovieGridWrapper from './components/MovieGridWrapper';
import ReviewGridWrapper from './components/ReviewGridWrapper';

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

  // <Route path="comments" component={() => (<Comments myProp="value" />)}/>

  render() {
    return (
      <BrowserRouter history={browserHistory}>
        <div className="App">
          <NavbarInstance onUserChange={this.onUserChange} />
          <Route exact={true} path="/movie/:movieId" component={SingleMovie} />
          <Route exact={true} path="/users/:userId" component={UserProfile} />
          <Route exact={true} path="/" component={MovieGridWrapper} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/register" component={Register} />
          <Route exact={true} path="/reviews" component={ReviewGridWrapper} />
          <Route exact={true} path="/new_review/:movieId" component={NewReview} />
          <Route exact={true} path="/edit_review/:reviewId" render={() => (<NewReview editing={true} />)} />
          <Route exact={true} path="/reviews/:reviewId" component={SingleReview} />
          <Route exact={true} path="/people/:personId" component={SinglePerson} />
          <Route exact={true} path="/search/users" component={UsersSearchGrid} />
          <Route exact={true} path="/user/:userId/reviews" component={ReviewGridWrapper} />
          <Route exact={true} path="/update" component={Register} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
