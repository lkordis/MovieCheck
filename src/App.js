import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';

import MovieGrid from './components/MovieGrid';
import Login from './components/Login';
import Register from './components/Register';
import SingleMovie from './components/SingleMovie'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        lastName: "",
        email: "",
        id: "",
      },
      isOpen: false
    }
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Monoton|Raleway" rel="stylesheet" />
          <NavbarInstance />
          <Route path="/movie/:movieId" component={SingleMovie} />
          <Route exact={true} path="/" component={MovieGrid} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/register" component={Register} />
        </div>
      </BrowserRouter>
    );
  }
}

class NavbarInstance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenLogin: false,
      isOpenRegister: false,
      user: {
        email: "",
        name: "",
        lastName: ""
      },
      logged_in: false
    }

    this.toggleModalLogin = this.toggleModalLogin.bind(this)
    this.toggleModalRegister = this.toggleModalRegister.bind(this)
    this.onUserChange = this.onUserChange.bind(this)
    this.logout = this.logout.bind(this)
  }

  toggleModalLogin = () => {
    this.setState({
      isOpenLogin: !this.state.isOpenLogin
    });
  }

  toggleModalRegister = () => {
    this.setState({
      isOpenRegister: !this.state.isOpenRegister
    });
  }

  logout(){
    let RAILS_API_BASE = "https://peaceful-reef-40428.herokuapp.com/logout"

    fetch(`${RAILS_API_BASE}`, {method: 'DELETE'})
      .then(response => this.setState({logged_in: false, user: {}}))
  }

  onUserChange(user) {
    this.setState({
      user: {
        name: user.name,
        email: user.email,
        lastName: user.lastName
      },
      logged_in: true
    })
  }

  render() {
    let logAction = null;
    let register = null;
    let currentUser = null;

    if (!this.state.logged_in) {
      logAction = <NavItem onClick={this.toggleModalLogin} >Prijava</NavItem>
      register = <NavItem onClick={this.toggleModalRegister}>Registracija</NavItem>
    } else {
      logAction = <NavItem onClick={this.logout}>Odjava</NavItem>
      currentUser = <NavItem >{this.state.user.name} {this.state.user.lastName}</NavItem >
    }

    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Završni rad</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <Login show={this.state.isOpenLogin} onClose={this.toggleModalLogin} onUserChange={this.onUserChange} />
            <Register show={this.state.isOpenRegister} onClose={this.toggleModalRegister} onUserChange={this.onUserChange}/>
            {currentUser}
            {logAction}
            {register}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default App;
