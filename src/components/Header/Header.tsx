import React, {Component} from 'react';
import Login from './Login/Login';
import {GetAccountDetailsResponse} from './Login/LoginForm/LoginForm';

type HeaderPropsType = {
    updateUser: (user: GetAccountDetailsResponse) => void
}

class Header extends Component<HeaderPropsType> {
    render() {
        return (
            <nav className={'navbar navbar-dark bg-dark'}>
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href='tut.by' target='_blank'>Home</a>
                        </li>
                    </ul>
                    <Login updateUser={this.props.updateUser}/>
                </div>
            </nav>
        );
    }
}

export default Header;