import React, {useState} from 'react';
import {Modal, ModalBody} from 'reactstrap';
import LoginForm from '../../Header/Login/LoginForm/LoginForm';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../Store/store';

export const CheckIsAuthLoginModal = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth);
    const [showModal, setShowModal] = useState<boolean>(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    }
    return <>
        {
            showModal && !isAuth
                ? <Modal isOpen={showModal} toggle={toggleModal}>
                    <ModalBody>
                        <LoginForm/>
                    </ModalBody>
                </Modal>
                : ''
        }
    </>
}