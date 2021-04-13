import React, {Component} from 'react';
import {GetAccountDetailsResponse} from '../Login/LoginForm/LoginForm';

type UserHeaderAvatarPropsType = {
    user: GetAccountDetailsResponse | null
}

class UserHeaderAvatar extends Component<UserHeaderAvatarPropsType> {
    render() {
        const {user} = this.props;
        return (
            <div>
                {/*<img width='40'*/}
                {/*     src={`https://www.gravatar.com/avatar/${user ? user.avatar.gravatar.hash : null}.jpg?s64`}*/}
                {/*     alt="user_Avatar"/>*/}
                <img  width='40' src={`https://image.tmdb.org/t/p/original/${user ? user.avatar.tmdb.avatar_path : null}?s64`}
                     alt="user_Avatar"/>
                <span style={{color: 'red'}} className={'ml-3'}>{user ? user.username : null}</span>
            </div>
        );
        // https://wx9DWGzEHTFOzXDJOjnjWh7OAW8.jpg
    }
}

export default UserHeaderAvatar;