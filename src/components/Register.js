import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import '../App.css';

import { RAILS_API_USERS, CLOUDINARY_UPLOAD } from '../constants'
import { CLOUDINARY } from '../config'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            lastName: "",
            user_image: '',
            original_fileName: ''
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        this.changeProps = this.changeProps.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.close = this.close.bind(this)
    }

    onImageDrop(files) {        
        this.setState({
            original_fileName: files[0].name
        })
        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        const upload = request.post(CLOUDINARY_UPLOAD)
            .field('upload_preset', CLOUDINARY.CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    user_image: response.body.secure_url
                });
            }
        });
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
            email: result.email,
            id: result.id
        })

        localStorage.setItem("Authorization", result.auth_token)

        this.props.onClose()
    }

    close() {
        this.setState({
            email: "",
            password: "",
            name: "",
            lastName: "",
            user_image: ''
        })

        this.props.onClose()
    }

    onSubmit(event) {
        const { email, password, name, lastName, user_image } = this.state;
        let login_API = `${RAILS_API_USERS}?email=${email}&password=${password}&name=${name}&lastName=${lastName}&user_image=${user_image}`

        var myInit = {
            method: 'POST'
        };

        var myRequest = new Request(`${login_API}`, myInit);

        fetch(myRequest)
            .then(response => {
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
                                type="password"
                                onChange={this.onPassChange}
                            /><br />
                            <Dropzone
                                multiple={false}
                                accept="image/*"
                                onDrop={this.onImageDrop}>
                                <p>Drop an image or click to select a file to upload.</p>
                            </Dropzone>
                            <div>
                                {this.state.user_image === '' ? null :
                                    <div>
                                        <p>{this.state.original_fileName}</p>
                                        <img src={this.state.user_image} alt={this.state.user_image} width="100" height="100" />
                                    </div>
                                }
                            </div>
                            <button type="submit">
                                Register
                            </button>
                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
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