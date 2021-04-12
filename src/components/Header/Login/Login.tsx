import axios from 'axios';
import React, {PureComponent} from 'react';
import {API_KEY_3, API_URL, GetToken} from '../../../api/api';
import {Modal, ModalBody,} from 'reactstrap';

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

    // 3 request
    onSend = async () => {
        let tokenUrl = `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`;

        const getRequestToken = () => {
            return axios.get<GetToken>(tokenUrl).then(res => res.data)
                .catch((err) => {
                    return err.response.data.status_message;
                })
        }

        const fetchApi = (url: string, options: any) => {
            return new Promise((res, rej) => {
                fetch(url, options)
                    .then(res => {
                            if (res.status < 400) {
                                return res.json();
                            } else {
                                throw res
                            }
                        }
                    ).then(data => {
                    res(data);
                })
                    .catch(response => {
                        response.json()
                            .then((err: any) => {
                                rej(err)
                            })
                    })
            })
        }
        // Цепочка из 3 запросов на сервер
        // 1 за токеном
        // 2 логин + пасс + этот токен
        // 3 на session id

        //1
        try {
            const data = await getRequestToken();
            //2
            const loginUrl = `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`;
            const result = await fetchApi(loginUrl,
                {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify({
                        username: 'Alex_Gor',
                        password: 'thisissparta',
                        request_token: data.request_token
                    })
                }
            );
            console.log(result)
            //3
            //session url
            const sessionUrl = `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`;
            const session = await
                fetchApi(sessionUrl,
                    {
                        method: 'Post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        mode: 'cors',
                        body: JSON.stringify({
                            request_token: data.request_token
                        })
                    }
                )
            console.log(session)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        console.log('Login')
        return (
            <div>
                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.toggleModal}>Login
                </button>
                <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
                    <ModalBody>
                        LOGIN FORM
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Login;