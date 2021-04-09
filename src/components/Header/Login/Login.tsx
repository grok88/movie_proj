import axios from 'axios';
import React, {PureComponent} from 'react';
import {API_KEY_3, API_URL, GetToken} from '../../../api/api';

type ResponseWithLoginType = {
    success: boolean,
    expires_at: string,
    request_token: string
}

class Login extends PureComponent {
    onSend = () => {
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
        // const validateWithToken = (body: ValidateWithTokenBodyType) => {
        //     let loginUrl = `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`;
        //
        //     return new Promise((res, rej) => {
        //         fetch(loginUrl, {
        //             method: 'Post',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             mode: 'cors',
        //             body: JSON.stringify(body)
        //         })
        //             .then(res => {
        //                     if (res.status < 400) {
        //                         return res.json();
        //                     } else {
        //                         throw res
        //                     }
        //                 }
        //             ).then(data => {
        //             res(data);
        //         })
        //             .catch(response => {
        //                 response.json()
        //                     .then((err: any) => {
        //                         rej(err)
        //                     })
        //             })
        //     })
        // }

        // Цепочка из 3 запросов на сервер
        // 1 за токеном
        // 2 логин + пасс + этот токен
        // 3 на session id
        getRequestToken()
            .then(res => {
                let loginUrl = `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`;
                return fetchApi(loginUrl,
                    {
                        method: 'Post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        mode: 'cors',
                        body: JSON.stringify({
                            username: 'Alex_Gor',
                            password: 'thisissparta',
                            request_token: res.request_token
                        })
                    }
                )
            })
            .then((data: any) => {
                //session url
                let sessionUrl = `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`;

                return fetchApi(sessionUrl,
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
                console.log(data)
            })
            .then(data => {
                console.log('success', data);
            })
            .catch(error => {
                console.log('error : ', error)
            })
    }

    render() {
        console.log('Login')
        return (
            <div>
                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.onSend}>Login
                </button>
            </div>
        );
    }
}

export default Login;