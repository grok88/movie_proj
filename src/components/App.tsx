import React from 'react';
import Header from './Header/Header';
import {AppRootStateType} from '../Store/store';
import {
    changeIsAuth,
    getAccountDetails,
    InitialAppStateType,
    logoutUser,
    setError,
    setSessionId,
    setUser,
    userAuthFlow
} from '../Store/appReducer';
import {connect} from 'react-redux';
import {API_KEY_3, API_URL} from '../api/api';
import {GetAccountDetailsResponse} from './Header/Login/LoginForm/LoginForm';
//work with cookie
import Cookies from 'universal-cookie';
import MoviesPage from './Pages/MoviesPage/MoviesPage';
import MoviePage from './Pages/MoviePage/MoviePage';
import {Redirect, Route, Switch} from 'react-router-dom';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import {Alert} from 'reactstrap';

const cookies = new Cookies();


export type Sort_By_type = 'popularity.desc' | 'popularity.asc' | 'vote_average.desc' | 'vote_average.asc';
export type FilterType = {
    sort_by: Sort_By_type
    primary_release_year: string
    with_genres: Array<string>
}


class App extends React.Component<MapStateToProps & MapDispatchToProps> {
    state = {
        visible: true
    }
    //updateUser
    updateUser = (user: GetAccountDetailsResponse) => {
        console.log(user);
        this.props.setUser(user);
        this.props.changeIsAuth(true);
    }
    //update SessionId and cookie
    updateSessionId = (session_id: string) => {
        //cookie
        cookies.set('session_id', session_id, {
            path: '/',
            maxAge: 2592000
        });
        console.log(cookies.get('session_id'));
        //update SessionId
        this.props.setSessionId(session_id);
    }

    // logout USer
    onDeleteSession = () => {
        // cookies.remove('session_id');
        const link = `${API_URL}/authentication/session?api_key=${API_KEY_3}`;
        this.props.logoutUser(link);
        cookies.remove('session_id');
        console.log('delete');
    }
    // error alert
    onDismiss = () => {
        this.setState({
            visible: false
        });
        this.props.setError(null);
    }

    componentDidMount() {
        const session_id = cookies.get('session_id');
        if (session_id) {
            const accountUrl = `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`;
            this.props.getAccountDetails(accountUrl, session_id);
            // запрос для избранных
        }
    }

    render() {
        const {appReducer: {error}} = this.props;
        return (
            <>
                <Header user={this.props.appReducer.user}
                        error={this.props.appReducer.error}
                        disabled={this.props.appReducer.disabled}
                        onDeleteSession={this.onDeleteSession}
                        userAuthFlow={this.props.userAuthFlow}
                />
                {error ? <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss} className={'mt-3'}>
                    {error}
                </Alert> : ''}
                <Switch>
                    <Route exact path={'/'} render={() => <MoviesPage/>}/>
                    <Route exact path={'/movie/:id'} render={() => <MoviePage/>}/>
                    <Route exact path={'/movie/:id/:movietype?'} render={() => <MoviePage/>}/>
                    <Route exact path={'/404'} render={() => <PageNotFound/>}/>
                    <Route exact path={'*'} render={() => <Redirect to={'/404'}/>}/>
                </Switch>
            </>
        );
    }
}

type MapStateToProps = {
    appReducer: InitialAppStateType
}
const mapStateToProps = (state: AppRootStateType): MapStateToProps => {
    return {
        appReducer: state.app,
    }
}

type MapDispatchToProps = {
    setUser: (user: GetAccountDetailsResponse | null) => void
    setSessionId: (session_id: string) => void
    logoutUser: (link: string) => void
    getAccountDetails: (link: string, session_id: string) => void;
    changeIsAuth: (isAuth: boolean) => void
    userAuthFlow: (username: string, password: string) => void
    setError: (error: null | string) => void
}
export default connect<MapStateToProps, MapDispatchToProps, {}, AppRootStateType>(mapStateToProps, {
    setUser,
    setSessionId,
    logoutUser,
    getAccountDetails,
    changeIsAuth,
    userAuthFlow,
    setError
})(App);