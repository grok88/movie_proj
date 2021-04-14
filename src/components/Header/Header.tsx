import React, {Component} from 'react';
import Login from './Login/Login';
import {GetAccountDetailsResponse} from './Login/LoginForm/LoginForm';
import UserHeaderAvatar from './UserHeaderAvatar/UserHeaderAvatar';
import UserDropDownMenu from './UserDropDownMenu/UserDropDownMenu';

type HeaderPropsType = {
    updateUser: (user: GetAccountDetailsResponse) => void
    user: GetAccountDetailsResponse | null
    updateSessionId: (session_id: string) => void
}

class Header extends Component<HeaderPropsType> {
    render() {
        const {user, updateUser, updateSessionId} = this.props
        return (
            <nav className={'navbar navbar-dark bg-dark'}>
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href='tut.by' target='_blank'>Home</a>
                        </li>
                    </ul>
                    {user ?
                        <UserDropDownMenu user={user}/>
                        // <UserHeaderAvatar user={user}/>
                        : <Login updateUser={updateUser} updateSessionId={updateSessionId}/>}
                </div>
            </nav>
        );
    }
}

export default Header;