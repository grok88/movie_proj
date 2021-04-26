import React from 'react';
import MovieItem from './MovieItem';
import {AddFavoriteBodyType, AddWatchlistBodyType, MovieType} from '../../api/api';
import MoviesHOC from './MoviesHOC';
import {AppRootStateType} from '../../Store/store';
import {connect} from 'react-redux';
import {addFavorite, addWatchlist} from '../../Store/movieReducer';

type MoviesListPropsType = {
    movies: Array<MovieType>
    changeFavorite: (media_type: string, favorite: boolean, media_id: number) => void
    changeWatchlist: (media_type: string, watchlist: boolean, media_id: number) => void
    account_id:number | null
    session_id: null | string
}

const MoviesList: React.FC<MoviesListPropsType> = ({movies, changeFavorite, changeWatchlist,account_id,session_id}) => {
    return <div className="row">
        {movies.map(movie => {
            return (
                <div key={movie.id} className="col-6 mb-4">
                    <MovieItem item={movie} changeFavorite={changeFavorite} changeWatchlist={changeWatchlist} account_id={account_id} session_id={session_id}/>
                </div>
            );
        })}
    </div>
}

type MapStateToProps = {
    account_id: number | null
}
const mapStateToProps = (state: AppRootStateType): MapStateToProps => {
    return {
        account_id: state.app.user && state.app.user.id
    }
}

type MapDispatchToProps = {
    addFavorite: (link: string, body: AddFavoriteBodyType) => void
    addWatchlist: (link: string, body: AddWatchlistBodyType) => void
}

export default connect<MapStateToProps, MapDispatchToProps, {}, AppRootStateType>(mapStateToProps, {
    addFavorite,
    addWatchlist
})(MoviesHOC(MoviesList));