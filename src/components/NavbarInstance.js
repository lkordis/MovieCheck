import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RAILS_API_BASE_LOGIN } from '../constants'

import Search from './Search'
import Login from './Login';
import Register from './Register';

import '../App.css';

class NavbarInstance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenLogin: false,
      isOpenRegister: false,
      user: {
        email: "",
        name: "",
        last_name: "",
        id: ""
      },
      logged_in: false,
      search_term: ''
    }

    this.toggleModalLogin = this.toggleModalLogin.bind(this)
    this.toggleModalRegister = this.toggleModalRegister.bind(this)
    this.onUserChange = this.onUserChange.bind(this)
    this.logout = this.logout.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.onUsersSearch = this.onUsersSearch.bind(this)
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

  logout() {
    localStorage.removeItem("Authorization")
    this.setState({ logged_in: false, user: {} })
    this.props.onUserChange();
    window.location.replace("/");
  }

  isLoggedIn() {
    var myHeaders = new Headers()
    myHeaders.append("Authorization", localStorage.getItem("Authorization"));

    fetch(`${RAILS_API_BASE_LOGIN}`, { headers: myHeaders })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          this.setState({ logged_in: false })
        }
        else {
          this.setState({ logged_in: true, user: response })
        }
      })
  }

  onUserChange(user) {
    this.setState({
      user: {
        name: user.name,
        email: user.email,
        last_name: user.last_name,
        id: user.id
      },
      logged_in: true
    })

    this.props.onUserChange();
  }

  onUsersSearch() {
    location.replace('/search/users');
  }

  componentWillMount() {
    this.isLoggedIn();
  }

  render() {
    let logAction = null;
    let register = null;
    let currentUser = null;
    let reviews = null;

    if (!this.state.logged_in) {
      logAction = <NavItem onClick={this.toggleModalLogin} >Login</NavItem>
      register = <NavItem onClick={this.toggleModalRegister}>Register</NavItem>
    } else {
      logAction = <MenuItem onClick={this.logout}>Log out</MenuItem>
      currentUser = <NavItem ><Link to={`/users/${this.state.user.id}`}>{this.state.user.name} {this.state.user.last_name}</Link></NavItem >
      reviews = <NavItem ><Link to={'/reviews'}>Reviews</Link></NavItem>
    }

    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" onClick={sessionStorage.clear()}>Završni rad</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Form pullLeft>
          <Search />
        </Navbar.Form>
        <Navbar.Collapse>
          <Nav pullRight>
            <Login show={this.state.isOpenLogin} onClose={this.toggleModalLogin} onUserChange={this.onUserChange} />
            <Register show={this.state.isOpenRegister} onClose={this.toggleModalRegister} onUserChange={this.onUserChange} />
            {currentUser}
            {register}
            {reviews}
            <NavDropdown title="Actions" id="basic-nav-dropdown">
              <MenuItem >Update profile</MenuItem>
              <MenuItem onClick={this.onUsersSearch}> Search users</MenuItem>
              <MenuItem divider />
              {logAction}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

NavbarInstance.propTypes = {
  onUserChange: React.PropTypes.func.isRequired
}

export default NavbarInstance;