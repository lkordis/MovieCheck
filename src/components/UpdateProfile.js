import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import '../App.css';

import { RAILS_API_USERS, CLOUDINARY_UPLOAD, RAILS_API_BASE_LOGIN } from '../constants'
import { CLOUDINARY } from '../config'

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            last_name: "",
            user_image: '',
            original_fileName: ''
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.login = this.login.bind(this)

        this.onSubmit = this.onSubmit.bind(this);
        this.changeProps = this.changeProps.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    onImageDrop(files) {
        this.setState({
            original_fileName: files[0].name
        })
        this.handleImageUpload(files[0]);
    }

    changeProps(result) {
        this.setState({
            name: result.name,
            last_name: result.last_name,
            email: result.email
        })

        localStorage.setItem("Authorization", result.auth_token)

        this.props.onClose()
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

    onNameChange(event) {
        this.setState({ name: event.target.value });
    }

    onLastNameChange(event) {
        this.setState({ last_name: event.target.value });
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

    componentWillMount() {
        this.login()
    }

    onSubmit(event) {
        var myHeaders = new Headers()
        myHeaders.append("Authorization", localStorage.getItem("Authorization"));
        const { email, name, last_name, user_image } = this.state;
        let login_API = `${RAILS_API_USERS}?email=${email}&name=${name}&lastName=${last_name}&user_image=${user_image}`

        var myInit = {
            method: 'PUT',
            headers: myHeaders
        };

        var myRequest = new Request(`${login_API}`, myInit);

        fetch(myRequest)
            .then()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>First name</label>
                    <input
                        type="text"
                        onChange={this.onNameChange}
                        value={this.state.name}
                    /><br />
                    <label>Last name</label>
                    <input
                        type="text"
                        onChange={this.onLastNameChange}
                        value={this.state.last_name}
                    /><br />
                    <label>Email</label>
                    <input
                        type="text"
                        onChange={this.onEmailChange}
                        value={this.state.email}
                    /><br />
                    <label>Password</label>
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
                        Update
                    </button>
                </form>
            </div>
        )
    }
}

export default UpdateProfile;