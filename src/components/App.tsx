import React from 'react';
import Header from './Header/Header';
import {AppRootStateType} from '../Store/store';
import {getAccountDetails, InitialAppStateType, logoutUser, setSessionId, setUser} from '../Store/appReducer';
import {connect} from 'react-redux';
import {API_KEY_3, API_URL} from '../api/api';
import {GetAccountDetailsResponse} from './Header/Login/LoginForm/LoginForm';
//work with cookie
import Cookies from 'universal-cookie';
import MoviesPage from './Pages/MoviesPage/MoviesPage';
import MoviePage from './Pages/MoviePage/MoviePage';
import {Redirect, Route, Switch} from 'react-router-dom';
import PageNotFound from './Pages/PageNotFound/PageNotFound';

const cookies = new Cookies();


export type Sort_By_type = 'popularity.desc' | 'popularity.asc' | 'vote_average.desc' | 'vote_average.asc';
export type FilterType = {
    sort_by: Sort_By_type
    primary_release_year: string
    with_genres: Array<string>
}


class App extends React.Component<MapStateToProps & MapDispatchToProps> {
    //updateUser
    updateUser = (user: GetAccountDetailsResponse) => {
        console.log(user);
        this.props.setUser(user);
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

    componentDidMount() {
        const session_id = cookies.get('session_id');
        if (session_id) {
            const accountUrl = `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`;
            this.props.getAccountDetails(accountUrl, session_id);
        }
    }

    render() {
        return (
            <>
                <Header updateUser={this.updateUser}
                        user={this.props.appReducer.user}
                        updateSessionId={this.updateSessionId}
                        onDeleteSession={this.onDeleteSession}
                />
                <Switch>
                    <Route exact path={'/'} render={() => <MoviesPage/>}/>
                    <Route exact path={'/movie/:id?'} render={() => <MoviePage/>}/>
                    <Route exact path={'/movie/:id?/:movietype?'} render={() =><MoviePage/>}/>
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
}
export default connect<MapStateToProps, MapDispatchToProps, {}, AppRootStateType>(mapStateToProps, {
    setUser,
    setSessionId,
    logoutUser,
    getAccountDetails
})(App);