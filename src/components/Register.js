import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../App.css';

let RAILS_API_BASE = "https://peaceful-reef-40428.herokuapp.com/users"

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            lastName: ""
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    onPassChange(event) {
        this.setState({ password: event.target.value });
    }

    onNameChange(event) {
        this.setState({ name: event.target.value });
    }

    onLastNameChange(event) {
        this.setState({ lastName: event.target.value });
    }

    onSubmit(event) {
        const { email, password, name, lastName } = this.state;

        let login_API = `${RAILS_API_BASE}?email=${email}&password=${password}&name=${name}&lastName=${lastName}`

        fetch(`${login_API}`, { method: "POST" })
            .then(response => response.json())
            .then(result => console.log(result))

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.onSubmit}>
                            <input
                                type="text"
                                onChange={this.onNameChange}
                            />
                            <input
                                type="text"
                                onChange={this.onLastNameChange}
                            />
                            <input
                                type="text"
                                onChange={this.onEmailChange}
                            />
                            <input
                                type="text"
                                onChange={this.onPassChange}
                            />
                            <button type="submit">
                                Register
                    </button>
                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

Register.propTypes = {
    onClose: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool,
    children: React.PropTypes.node
};

export default Register;