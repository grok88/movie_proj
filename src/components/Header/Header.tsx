import React, {Component} from 'react';
import Login from './Login/Login';

class Header extends Component {
    render() {
        return (
            <nav className={'navbar navbar-dark bg-dark'}>
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href='#'>Home</a>
                        </li>
                    </ul>
                    <Login/>
                </div>
            </nav>
        );
    }
}

export default Header;