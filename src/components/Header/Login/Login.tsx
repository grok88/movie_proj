import React, {Component} from 'react';

class Login extends Component {
    onSend = () => {
        console.log('Send');
    }

    render() {
        return (
            <div>
                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.onSend}>Login</button>
            </div>
        );
    }
}

export default Login;