import React, {useState} from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {useFormik} from 'formik';
import {API_KEY_3, API_URL, GetToken} from '../../../../api/api';
import axios from 'axios';

export type GetAccountDetailsResponse = {
    avatar: {
        gravatar: {
            hash: string
        },
        tmdb: {
            avatar_path: null | string
        }
    }
    id: number
    iso_639_1: string
    iso_3166_1: string
    name: string
    include_adult: boolean
    username: string
}

type LoginFormValues = {
    username: string
    password: string
    repeatPassword: string
}
type LoginFormErrorsValues = {
    username?: string
    password?: string
    repeatPassword?: string
}

const validate = (values: LoginFormValues) => {
    const errors: LoginFormErrorsValues = {}

    if (!values.username) {
        errors.username = 'Required';
    }

    if (!values.password) {
        errors.password = 'Required';
    }
    if (!values.repeatPassword) {
        errors.repeatPassword = 'Required';
    } else if (values.password !== values.repeatPassword) {
        errors.repeatPassword = ' Passwords are not equal'
    }
    return errors;
};

// FUNCTIONAL COMPONENT USE  FOR
type LoginFormPropsType = {
    updateUser: (user: GetAccountDetailsResponse) => void
    updateSessionId: (session_id: string) => void
}
const LoginForm: React.FC<LoginFormPropsType> = ({updateUser, updateSessionId}) => {
    const [serverError, setServerError] = useState<null | string>(null);
    const [submit, setSubmit] = useState<boolean>(false);

//Formik
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            repeatPassword: '',
        },
        validate,
        onSubmit: values => {
            onSendAuth(values.username, values.password);
            // console.log(values.username, values.password)
        },
    });

    // 3 request
    const onSendAuth = async (username: string, password: string) => {
        let tokenUrl = `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`;

        const getRequestToken = () => {
            return axios.get<GetToken>(tokenUrl).then(res => res.data)
                .catch((err) => {
                    return err.response.data.status_message;
                })
        }

        const fetchApi = (url: string, options: any = {}) => {
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
            setSubmit(true);
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
                        username,
                        password,
                        request_token: data.request_token
                    })
                }
            );
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
            // @ts-ignore
            //add session_id to AppReducer state
            updateSessionId(session.session_id);
            // @ts-ignore
            const accountUrl = `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session.session_id}`;
            const getAccountDetails = () => {
                return axios.get<GetAccountDetailsResponse>(accountUrl).then(res => res.data)
                    .catch((err) => {
                        return err.response.data.status_message;
                    })
            }
            let user = await getAccountDetails();
            //add user to AppReducer state
            updateUser(user);
            //disabled btn
            setSubmit(false);
            console.log(user)
        } catch (e) {
            //disabled btn
            setSubmit(false);
            console.log(e)
            //ser LoginForm serverError
            setServerError(e.status_message);
            setTimeout(() => {
                setServerError(null);
            }, 3000);
        }
    }
    return (
        <div className={'form-login-container'}>
            <h1 className={'h3 mb-3 text-center'}>Авторизация</h1>
            <Form className={'form-login'} onSubmit={formik.handleSubmit}>
                <FormGroup className={'form-group'}>
                    <Label for="username">Email</Label>
                    <Input type="text" id="username" placeholder="username" {...formik.getFieldProps('username')}
                           className={'form-control'}
                           style={formik.touched.username && formik.errors.username ? {border: '2px solid red'} : undefined}/>
                    {formik.touched.username && formik.errors.username ?
                        <div style={{color: 'red'}}>{formik.errors.username}</div> : null}
                </FormGroup>
                <FormGroup className={'form-group'}>
                    <Label for="password">Password</Label>
                    <Input type="password" id="password" placeholder="password"
                           {...formik.getFieldProps('password')} className={'form-control'}
                           style={formik.touched.password && formik.errors.password ? {border: '2px solid red'} : undefined}/>
                    {formik.touched.password && formik.errors.password ?
                        <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                </FormGroup>
                <FormGroup className={'form-group'}>
                    <Label for="repeatPassword">Repeat Password</Label>
                    <Input type="password" id="repeatPassword"
                           placeholder="repeatPassword" {...formik.getFieldProps('repeatPassword')}
                           className={'form-control'}
                           style={formik.touched.repeatPassword && formik.errors.repeatPassword ? {border: '2px solid red'} : undefined}
                    />
                    {formik.touched.repeatPassword && formik.errors.repeatPassword ?
                        <div style={{color: 'red'}}>{formik.errors.repeatPassword}</div> : null}
                </FormGroup>
                <button type="submit" className={'btn btn-ld btn-primary btn-block'} disabled={submit}>Submit</button>
                {serverError ? <div style={{color: 'red'}} className={'mt-3 text-center'}>{serverError}</div> : null}
            </Form>
        </div>
    );
}

export default LoginForm;