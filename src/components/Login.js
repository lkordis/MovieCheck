import React, { Component } from 'react';
import '../App.css';
import { Button, Modal } from 'react-bootstrap';
import { RAILS_API_BASE_LOGIN } from '../constants'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.changeProps = this.changeProps.bind(this);
        this.login = this.login.bind(this);
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    onPassChange(event) {
        this.setState({ password: event.target.value });
    }

    changeProps(result) {
        this.props.onUserChange({
            name: result.name,
            last_name: result.last_name,
            email: result.email,
            id: result.id
        })

        this.props.onClose()
    }

    login() {
        let login_API = `${RAILS_API_BASE_LOGIN}?`

        var myHeaders = new Headers()
        myHeaders.append("Authorization", localStorage.getItem("Authorization"))

        fetch(`${login_API}`, { headers: myHeaders })
            .then(response => {
                return response.json()
            })
            .then(result => {
                console.log(result)
                this.changeProps(result)
            })
    }

    onSubmit(event) {
        const { email, password } = this.state;

        var myInit = {
            method: 'POST'
        };

        let login_API = `${RAILS_API_BASE_LOGIN}?email=${email}&password=${password}`
        var myRequest = new Request(`${login_API}`, myInit);

        fetch(myRequest)
            .then(response => {
                return response.json()
            })
            .then(result => {
                localStorage.setItem("Authorization", result.auth_token)
                this.login();
            })

        event.preventDefault();
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div>
                <Modal show={this.props.show} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.onSubmit}>
                            <span>
                                <label>Email </label>
                                <input
                                    type="text"
                                    onChange={this.onEmailChange}
                                />
                            </span><br />
                            <span>
                                <label>Password </label>
                                <input
                                    type="password"
                                    onChange={this.onPassChange}
                                />
                            </span><br />
                            <span>
                                <Button type="submit">
                                    Log in
                                </Button>
                            </span>
                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

Login.propTypes = {
    onClose: React.PropTypes.func.isRequired,
    onUserChange: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool,
    children: React.PropTypes.node
};

export default Login;