import React, {Component} from 'react';
import Login from './Login/Login';
import {GetAccountDetailsResponse} from './Login/LoginForm/LoginForm';
import UserDropDownMenu from './UserDropDownMenu/UserDropDownMenu';
import {NavLink} from 'react-router-dom';

type HeaderPropsType = {
    // updateUser: (user: GetAccountDetailsResponse) => void
    user: GetAccountDetailsResponse | null
    // updateSessionId: (session_id: string) => void
    onDeleteSession: () => void
    userAuthFlow:(username: string, password: string) => void
    disabled:boolean
    error:null | string
}

class Header extends Component<HeaderPropsType> {

    render() {
        const {user,  onDeleteSession,error,disabled} = this.props;
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
                        : <Login
                            // updateUser={updateUser}
                            // updateSessionId={updateSessionId}
                            error={error}
                            disabled={disabled}
                            userAuthFlow={this.props.userAuthFlow}/>
                    }
                </div>
            </nav>
        );
    }
}

export default Header;