import axios from 'axios';
import React, {PureComponent} from 'react';
import {API_KEY_3, API_URL, GetToken} from '../../../api/api';
import {Modal, ModalBody,} from 'reactstrap';
import LoginForm from './LoginForm/LoginForm';

type ResponseWithLoginType = {
    success: boolean,
    expires_at: string,
    request_token: string
}

type LoginPropsType = {}

class Login extends PureComponent<LoginPropsType, { showModal: boolean }> {
    constructor(props: LoginPropsType) {
        super(props)
        this.state = {
            showModal: false
        }
    }

    //modal
    toggleModal = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }))
    }


    render() {
        console.log('Login')
        return (
            <div>
                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.toggleModal}>Login
                </button>
                <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
                    <ModalBody>
                        <LoginForm/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Login;