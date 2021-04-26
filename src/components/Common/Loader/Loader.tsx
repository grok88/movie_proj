import React from 'react';
import {Spinner} from 'reactstrap';

export const Loader = () => {
    return  <div
        // className={'mt-3 loading'}
        className={'mt-3 d-flex justify-content-center align-items-center'}
    >
        <Spinner type="grow" color="primary" />
        <Spinner type="grow" color="secondary" />
        <Spinner type="grow" color="success" />
        <Spinner type="grow" color="danger" />
        <Spinner type="grow" color="warning" />
        <Spinner type="grow" color="info" />
        <Spinner type="grow" color="dark" />
    </div>
}