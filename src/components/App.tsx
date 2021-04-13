import React from 'react';
import Filters from './Filters/Filters';
import MoviesList from './Movies/MoviesList';
import Header from './Header/Header';
import {AppRootStateType} from '../Store/store';
import {
    changeFilters,
    changePage,
    genresChange,
    genresReset,
    InitialAppStateType,
    resetAllFilters, setUser,
} from '../Store/appReducer';
import {connect} from 'react-redux';
import {genresResetChecked} from '../Store/genresFilterReducer';
import {getMovies} from '../Store/moviesReducer';
import {MovieType} from '../api/api';
import {GetAccountDetailsResponse} from './Header/Login/LoginForm/LoginForm';

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
    //Change pageNumber
    // setTotalPages = (pages: number) => {
    //     this.props.setTotalPages(pages);
    // }
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
    render() {
        const {filters, page, total_pages} = this.props.appReducer;
        return (
            <>
                <Header updateUser={this.updateUser} user={this.props.appReducer.user}/>
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
                                        // setTotalPages={this.setTotalPages}
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
    movies:  Array<MovieType>
}
const mapStateToProps = (state: AppRootStateType): MapStateToProps => {
    return {
        appReducer: state.app,
        movies:state.movies.movies,
    }
}

type MapDispatchToProps = {
    changeFilters: (value: string, name: string) => void
    changePage: (page: number) => void
    resetAllFilters: () => void
    genresReset: () => void
    genresChange: (genreId: string) => void
    genresResetChecked: () => void
    getMovies : (link: string) => void
    setUser : (user: GetAccountDetailsResponse) => void
}
export default connect<MapStateToProps, MapDispatchToProps, {}, AppRootStateType>(mapStateToProps, {
    changeFilters,
    changePage,
    resetAllFilters,
    genresReset,
    genresChange,
    genresResetChecked,
    getMovies,
    setUser
})(App);