import React, {PureComponent} from 'react';
import {Modal, ModalBody,} from 'reactstrap';
import LoginForm, {GetAccountDetailsResponse} from './LoginForm/LoginForm';
import Header from '../Header';

type ResponseWithLoginType = {
    success: boolean,
    expires_at: string,
    request_token: string
}

type LoginPropsType = {
    userAuthFlow:(username: string, password: string) => void
    disabled:boolean
    error:null | string
}


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
        const {disabled,error,userAuthFlow} = this.props;
        return (
            <div>
                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.toggleModal}>Login
                </button>
                <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
                    <ModalBody>
                        <LoginForm userAuthFlow={userAuthFlow}
                            error={error}
                            disabled={disabled}
                        />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Login;