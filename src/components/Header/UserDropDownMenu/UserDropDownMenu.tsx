import React, {Component} from 'react';
import {GetAccountDetailsResponse} from '../Login/LoginForm/LoginForm';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import UserHeaderAvatar from '../UserHeaderAvatar/UserHeaderAvatar';
import {NavLink} from 'react-router-dom';

type UserDropDownMenuProps = {
    user: GetAccountDetailsResponse | null
    onDeleteSession: () => void
}

class UserDropDownMenu extends Component<UserDropDownMenuProps, { dropdownOpen: boolean }> {
    state = {
        dropdownOpen: false
    }

    toggleDropdown = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

    render() {
        const {user, onDeleteSession} = this.props;
        return <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
            <DropdownToggle
                tag="div"
                data-toggle="dropdown"
                aria-expanded={this.state.dropdownOpen}
            >
                <UserHeaderAvatar user={user}/>
            </DropdownToggle>
            <DropdownMenu right={true}>
                <DropdownItem onClick={onDeleteSession}>Logout</DropdownItem>
                <DropdownItem  onClick={() => {
                }}>
                    <NavLink to={'/favorite'} style={{textDecoration:'none', color:'black'}}>
                        Favorite
                    </NavLink>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    }
}

export default UserDropDownMenu;