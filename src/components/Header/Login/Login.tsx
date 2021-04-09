import axios from 'axios';
import React, {PureComponent} from 'react';
import {API_KEY_3, API_URL, GetToken} from '../../../api/api';

class Login extends PureComponent {
    onSend = () => {
        let tokenUrl = `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`;
        //get token
        axios.get<GetToken>(tokenUrl).then(res => res.data)
            .then(res => {
                //login url
                let loginUrl = `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`;
                // axios.post<GetToken>(loginUrl, {
                //         headers: {
                //             'Content-Type': 'application/json'
                //         },
                //         mode: 'cors',
                //     },{
                //         username: 'Alex_Gor',
                //         password: 'thisIsSparta',
                //         request_token: res.request_token
                //     }
                // ).then(res => res.data)
                //     .then(res => {
                //         debugger
                //     })
                fetch(loginUrl,
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
                    },
                )
                    .then(res => res.json())
                    .then(res => {
                        //session url
                        let loginUrl = `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`;
                        fetch(loginUrl,
                            {
                                method: 'Post',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                mode: 'cors',
                                body: JSON.stringify({
                                    request_token: res.request_token
                                })
                            },
                        )
                            .then(res => res.json())
                            .then(res => {
                                console.log(res)
                            })
                    })
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