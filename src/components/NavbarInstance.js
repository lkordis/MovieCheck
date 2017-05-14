import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
        lastName: "",
        id: ""
      },
      logged_in: false
    }

    this.toggleModalLogin = this.toggleModalLogin.bind(this)
    this.toggleModalRegister = this.toggleModalRegister.bind(this)
    this.onUserChange = this.onUserChange.bind(this)
    this.logout = this.logout.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
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
  }

  isLoggedIn() {
    let RAILS_API_BASE = "https://peaceful-reef-40428.herokuapp.com/login.json"
    var myHeaders = new Headers()
    myHeaders.append("Authorization", localStorage.getItem("Authorization"));

    fetch(`${RAILS_API_BASE}`, { headers: myHeaders })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          this.setState({ logged_in: false })
        }
        else {
          this.setState({ logged_in: true, user: response })
        }
        console.log(response)
        console.log(localStorage.getItem("Authorization"))
      })
  }

  onUserChange(user) {
    this.setState({
      user: {
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        id: user.id
      },
      logged_in: true
    })

    this.props.onUserChange();
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
      logAction = <NavItem onClick={this.logout}>Odjava</NavItem>
      currentUser = <NavItem ><Link to={`/users/${this.state.user.id}`}>{this.state.user.name} {this.state.user.lastName}</Link></NavItem >
      reviews = <NavItem ><Link to={'/reviews'}>Reviews</Link></NavItem>
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
            <Register show={this.state.isOpenRegister} onClose={this.toggleModalRegister} onUserChange={this.onUserChange} />
            {currentUser}
            {logAction}
            {register}
            {reviews}
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