import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../App.css';

let RAILS_API_BASE = "https://peaceful-reef-40428.herokuapp.com/users.json"

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
        this.changeProps = this.changeProps.bind(this);
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

    changeProps(result) {
        this.props.onUserChange({
            name: result.name,
            lastName: result.lastName,
            email: result.email
        })

        this.props.onClose()
    }

    onSubmit(event) {
        const { email, password, name, lastName } = this.state;
        let login_API = `${RAILS_API_BASE}?email=${email}&password=${password}&name=${name}&lastName=${lastName}`

        var myInit = {
            method: 'POST'
        };

        var myRequest = new Request(`${login_API}`, myInit);

        fetch(myRequest)
            .then(response => {
                console.log(response)
                return response.json() 
            })
            .then(result => {
                this.changeProps(result)
            })

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.onSubmit}>
                            <label>First name</label>
                            <input
                                type="text"
                                onChange={this.onNameChange}
                            /><br />
                            <label>Last name</label>
                            <input
                                type="text"
                                onChange={this.onLastNameChange}
                            /><br />
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={this.onEmailChange}
                            /><br />
                            <label>Password</label>
                            <input
                                type="text"
                                onChange={this.onPassChange}
                            /><br />
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
    onUserChange: React.PropTypes.func.isRequired,
    children: React.PropTypes.node
};

export default Register;