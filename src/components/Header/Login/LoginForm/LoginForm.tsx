import React from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../Store/store';
import {userAuthFlow} from '../../../../Store/appReducer';

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

// FUNCTIONAL COMPONENT USE  FORM
type LoginFormPropsType = {
    toggleModal?: () => void

}
const LoginForm: React.FC<LoginFormPropsType> = ({toggleModal}) => {
    const dispatch = useDispatch();
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);
    const disabled = useSelector<AppRootStateType, boolean>(state => state.app.disabled);

//Formik
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            repeatPassword: '',
        },
        validate,
        onSubmit: values => {
            dispatch(userAuthFlow(values.username, values.password));
            toggleModal && toggleModal();
            // userAuthFlow && userAuthFlow(values.username, values.password)
        },
    });

    return (
        <div className={'form-login-container'}>
            <h1 className={'h3 mb-3 text-center'}>Авторизация</h1>
            <Form className={'form-login'} onSubmit={formik.handleSubmit}>
                <FormGroup className={'form-group'}>
                    <Label for="username">Email</Label>
                    <Input type="text" id="username" placeholder="Alex_gor" {...formik.getFieldProps('username')}
                           className={'form-control'}

                           style={formik.touched.username && formik.errors.username ? {border: '2px solid red'} : undefined}/>
                    {formik.touched.username && formik.errors.username ?
                        <div style={{color: 'red'}}>{formik.errors.username}</div> : null}
                </FormGroup>
                <FormGroup className={'form-group'}>
                    <Label for="password">Password</Label>
                    <Input type="password" id="password" placeholder="thisissparta"
                           {...formik.getFieldProps('password')} className={'form-control'}
                           style={formik.touched.password && formik.errors.password ? {border: '2px solid red'} : undefined}/>
                    {formik.touched.password && formik.errors.password ?
                        <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                </FormGroup>
                <FormGroup className={'form-group'}>
                    <Label for="repeatPassword">Repeat Password</Label>
                    <Input type="password" id="repeatPassword"
                           placeholder="thisissparta" {...formik.getFieldProps('repeatPassword')}
                           className={'form-control'}
                           style={formik.touched.repeatPassword && formik.errors.repeatPassword ? {border: '2px solid red'} : undefined}
                    />
                    {formik.touched.repeatPassword && formik.errors.repeatPassword ?
                        <div style={{color: 'red'}}>{formik.errors.repeatPassword}</div> : null}
                </FormGroup>
                <button type="submit" className={'btn btn-ld btn-primary btn-block'} disabled={disabled}>Submit</button>
                {error ? <div style={{color: 'red'}} className={'mt-3 text-center'}>{error}</div> : null}
            </Form>
        </div>
    );
}

export default LoginForm;