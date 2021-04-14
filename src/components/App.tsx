import React from 'react';
import Filters from './Filters/Filters';
import Header from './Header/Header';
import {AppRootStateType} from '../Store/store';
import {
    changeFilters,
    changePage,
    genresChange,
    genresReset,
    InitialAppStateType,
    resetAllFilters,
    setSessionId,
    setUser,
} from '../Store/appReducer';
import {connect} from 'react-redux';
import {genresResetChecked} from '../Store/genresFilterReducer';
import {getMovies} from '../Store/moviesReducer';
import {API_KEY_3, API_URL, MovieType} from '../api/api';
import {GetAccountDetailsResponse} from './Header/Login/LoginForm/LoginForm';
//work with cookie
import Cookies from 'universal-cookie';
import axios from 'axios';
import MoviesContainer from './Movies/MoviesContainer';
import MoviesList from './Movies/MoviesList';

const cookies = new Cookies();

export type Sort_By_type = 'popularity.desc' | 'popularity.asc' | 'vote_average.desc' | 'vote_average.asc';
export type FilterType = {
    sort_by: Sort_By_type
    primary_release_year: string
    with_genres: Array<string>
}


class App extends React.Component<MapStateToProps & MapDispatchToProps> {

    //Change Filter Type
    changeFilters = (value: string, name: string) => {
        this.props.changeFilters(value, name);
    }

    //Change pageNumber
    onChangePage = (page: number) => {
        this.props.changePage(page);
    }
    //Reset All Filters
    resetAllFilters = () => {
        this.props.resetAllFilters();
        this.props.genresResetChecked();
    }
    //Change GenresFilter
    onGenresChange = (genreId: string) => {
        this.props.genresChange(genreId);
    }
    //reset GenresFilter
    onGenresReset = () => {
        this.props.genresReset();
    }

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

    componentDidMount() {
        const session_id = cookies.get('session_id');
        if (session_id) {
            const accountUrl = `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`;
            const getAccountDetails = () => {
                return axios.get<GetAccountDetailsResponse>(accountUrl).then(res => res.data)
                    .catch((err) => {
                        return err.response.data.status_message;
                    })
            }
            getAccountDetails()
                .then(data => {
                    this.updateUser(data);
                });
        }
    }

    render() {
        const {filters, page, total_pages} = this.props.appReducer;
        return (
            <>
                <Header updateUser={this.updateUser}
                        user={this.props.appReducer.user}
                        updateSessionId={this.updateSessionId}
                />
                {/*<div className="text-center">*/}
                {/*    <Spinner color="primary" className={'mt-3'}/>*/}
                {/*</div>*/}
                <div className="container">
                    <div className="row mt-4">
                        <div className="col-4">
                            <div className="card" style={{width: '100%'}}>
                                <div className="card-body">
                                    <h3>Фильтры:</h3>
                                    <Filters filters={filters} changeFilters={this.changeFilters} page={page}
                                             onChangePage={this.onChangePage}
                                             totalPages={total_pages}
                                             resetAllFilters={this.resetAllFilters}
                                             onGenresChange={this.onGenresChange}
                                             onGenresReset={this.onGenresReset}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <MoviesList filters={filters} page={page}
                                             onChangePage={this.onChangePage}
                                             movies={this.props.movies}
                                             getMovies={this.props.getMovies}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

type MapStateToProps = {
    appReducer: InitialAppStateType
    movies: Array<MovieType>
}
const mapStateToProps = (state: AppRootStateType): MapStateToProps => {
    return {
        appReducer: state.app,
        movies: state.movies.movies,
    }
}

type MapDispatchToProps = {
    changeFilters: (value: string, name: string) => void
    changePage: (page: number) => void
    resetAllFilters: () => void
    genresReset: () => void
    genresChange: (genreId: string) => void
    genresResetChecked: () => void
    getMovies: (link: string) => void
    setUser: (user: GetAccountDetailsResponse) => void
    setSessionId: (session_id: string) => void
}
export default connect<MapStateToProps, MapDispatchToProps, {}, AppRootStateType>(mapStateToProps, {
    changeFilters,
    changePage,
    resetAllFilters,
    genresReset,
    genresChange,
    genresResetChecked,
    getMovies,
    setUser,
    setSessionId
})(App);