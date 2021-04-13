import React from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {useFormik} from 'formik';


type LoginFormValues = {
    username: string
    password: string
}
type LoginFormErrorsValues = {
    username?: string
    password?: string
}

const validate = (values: LoginFormValues) => {
    const errors: LoginFormErrorsValues = {}

    if (!values.username) {
        errors.username = 'Required';
    }

    if (!values.password) {
        errors.password = 'Required';
    }
    return errors;
};

// FUNCTIONAL COMPONENT USE  FOR FORMIK
const LoginForm = () => {
    //Formik
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <div className={'form-login-container'}>
            <h1 className={'h3 mb-3 text-center'}>Авторизация</h1>
            <Form className={'form-login'} onSubmit={formik.handleSubmit}>
                <FormGroup className={'form-group'}>
                    <Label for="username">Email</Label>
                    <Input type="text" id="username" placeholder="username" {...formik.getFieldProps('username')}
                           className={'form-control'}/>
                    {formik.touched.username && formik.errors.username ?
                        <div style={{color: 'red'}}>{formik.errors.username}</div> : null}
                </FormGroup>
                <FormGroup className={'form-group'}>
                    <Label for="password">Password</Label>
                    <Input type="password" id="password" placeholder="password"
                           {...formik.getFieldProps('password')} className={'form-control'}/>
                    {formik.touched.password && formik.errors.password ?
                        <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                </FormGroup>
                <button type="submit" className={'btn btn-ld btn-primary btn-block'}>Submit</button>
                {/*<input type={'button'} value={'Submit'} onClick={this.onSendHandler}/>*/}
            </Form>
        </div>
    );

}

export default LoginForm;