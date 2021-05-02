import React, {PureComponent} from 'react';
import Login from './Login/Login';
import {GetAccountDetailsResponse} from './Login/LoginForm/LoginForm';
import UserDropDownMenu from './UserDropDownMenu/UserDropDownMenu';
import {NavLink} from 'react-router-dom';

type HeaderPropsType = {
    user: GetAccountDetailsResponse | null
    onDeleteSession: () => void
}

class Header extends PureComponent<HeaderPropsType> {

    render() {
        const {user, onDeleteSession} = this.props;
        return (
            <nav className={'navbar navbar-dark bg-dark'}>
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink to={'/'} className={'nav-link'}>
                                Home
                            </NavLink>
                        </li>
                    </ul>
                    {user ?
                        <UserDropDownMenu user={user} onDeleteSession={onDeleteSession}/>
                        : <Login/>
                    }
                </div>
            </nav>
        );
    }
}

export default Header;