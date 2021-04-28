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
import {AddFavoriteBodyType, AddWatchlistBodyType, API_KEY_3, API_URL, GetMovies} from '../api/api';
import {GetAccountDetailsResponse} from './Header/Login/LoginForm/LoginForm';

import MoviesPage from './Pages/MoviesPage/MoviesPage';
import MoviePage from './Pages/MoviePage/MoviePage';
import {Redirect, Route, Switch} from 'react-router-dom';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import {Alert} from 'reactstrap';
import {Loader} from './Common/Loader/Loader';
import Favorite from './Pages/Favorite/Favorite';
import {addFavorite, addWatchlist, getFavoriteList} from '../Store/movieReducer';
//work with cookie
import Cookies from 'universal-cookie';

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
    // logout User
    onDeleteSession = () => {
        const link = `${API_URL}/authentication/session?api_key=${API_KEY_3}`;
        this.props.logoutUser(link);
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
        }
    }

    render() {
        // console.log('APP')
        const {appReducer: {error, status, session_id, user, isAuth}, getFavoriteList, favoriteMovies, addWatchlist, addFavorite, statusCode} = this.props;
        return (
            <>
                <Header user={user} onDeleteSession={this.onDeleteSession}/>
                {/*error Alerts*/}
                {error ? <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss} className={'mt-3'}>
                    {error}
                </Alert> : ''}
                {/*Loader*/}
                {status === 'loading' ? <Loader/> : ''}
                <Switch>
                    <Route exact path={'/'} render={() => <MoviesPage/>}/>
                    <Route exact path={'/movie/:id'} render={() => <MoviePage/>}/>
                    <Route exact path={'/movie/:id/:movietype?'} render={() => <MoviePage/>}/>
                    <Route exact path={'/favorite'} render={() => <Favorite session_id={session_id}
                                                                            account_id={user && user.id}
                                                                            isAuth={isAuth}
                                                                            getFavoriteList={getFavoriteList}
                                                                            favoriteMovies={favoriteMovies}
                                                                            addFavorite={addFavorite}
                                                                            addWatchlist={addWatchlist}
                                                                            statusCode={statusCode}
                    />}/>
                    <Route exact path={'/404'} render={() => <PageNotFound/>}/>
                    <Route exact path={'*'} render={() => <Redirect to={'/404'}/>}/>
                </Switch>
            </>
        );
    }
}

type MapStateToProps = {
    appReducer: InitialAppStateType
    favoriteMovies: GetMovies | null
    statusCode: number | null
}

const mapStateToProps = (state: AppRootStateType): MapStateToProps => {
    return {
        appReducer: state.app,
        favoriteMovies: state.moviePage.favoriteMovies,
        statusCode: state.moviePage.statusCode
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
    getFavoriteList: (link: string) => void
    addFavorite: (link: string, body: AddFavoriteBodyType) => void
    addWatchlist: (link: string, body: AddWatchlistBodyType) => void
}
export default connect<MapStateToProps, MapDispatchToProps, {}, AppRootStateType>(mapStateToProps, {
    setUser,
    setSessionId,
    logoutUser,
    getAccountDetails,
    changeIsAuth,
    userAuthFlow,
    setError,
    getFavoriteList,
    addWatchlist,
    addFavorite
})(App);