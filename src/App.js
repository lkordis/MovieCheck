import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
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

    this.state = { isOpenLogin: false, isOpenRegister: false }

    this.toggleModalLogin = this.toggleModalLogin.bind(this)
    this.toggleModalRegister = this.toggleModalRegister.bind(this)
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

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Završni rad</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <Login show={this.state.isOpenLogin} onClose={this.toggleModalLogin} />
            <Register show={this.state.isOpenRegister} onClose={this.toggleModalRegister} />
            <NavItem onClick={this.toggleModalLogin} >Prijava</NavItem>
            <NavItem onClick={this.toggleModalRegister}>Registracija</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default App;
