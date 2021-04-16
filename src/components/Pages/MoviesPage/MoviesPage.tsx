import React from 'react';
import Filters from './../../Filters/Filters';
import {AppRootStateType} from '../../../Store/store';
import {changeFilters, changePage, genresChange, genresReset, resetAllFilters} from '../../../Store/appReducer';
import {connect} from 'react-redux';
import {genresResetChecked} from '../../../Store/genresFilterReducer';
import {getMovies, InitialMoviesStateType} from '../../../Store/moviesReducer';
import MoviesList from './../../Movies/MoviesList';

class MoviesPage extends React.Component<MapStateToProps & MapDispatchToProps> {

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

    render() {
        const {filters, page, total_pages,movies} = this.props.moviesReducer;
        return (
            <>
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
                                        session_id={this.props.session_id}
                                        onChangePage={this.onChangePage}
                                        movies={movies}
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
    moviesReducer: InitialMoviesStateType
    session_id:string | null
}
const mapStateToProps = (state: AppRootStateType): MapStateToProps => {
    return {
        moviesReducer: state.movies,
        session_id:state.app.session_id
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
}
export default connect<MapStateToProps, MapDispatchToProps, {}, AppRootStateType>(mapStateToProps, {
    changeFilters,
    changePage,
    resetAllFilters,
    genresReset,
    genresChange,
    genresResetChecked,
    getMovies,
})(MoviesPage);