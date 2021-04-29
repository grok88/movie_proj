import React from 'react';
import MovieItem from './MovieItem';
import {AddFavoriteBodyType, AddWatchlistBodyType, MovieType} from '../../api/api';
import MoviesHOC from './MoviesHOC';
import {AppRootStateType} from '../../Store/store';
import {connect} from 'react-redux';
import {addFavorite, addWatchlist,setRatingThunk} from '../../Store/movieReducer';

type MoviesListPropsType = {
    movies: Array<MovieType>
    changeFavorite: (media_type: string, favorite: boolean, media_id: number) => void
    changeWatchlist: (media_type: string, watchlist: boolean, media_id: number) => void
    account_id: number | null
    session_id: null | string
    isAuth: boolean
    setRatingThunk: (link: string, body: { value: number }) => void
}

const MoviesList: React.FC<MoviesListPropsType> = ({movies, changeFavorite, setRatingThunk, changeWatchlist, account_id, isAuth, session_id}) => {

    return <div className="row">
        {movies.map(movie => {
            return (
                <div key={movie.id} className="col-sm-6 col-lg-4 mb-4">
                    <MovieItem item={movie}
                               changeFavorite={changeFavorite}
                               changeWatchlist={changeWatchlist}
                               account_id={account_id}
                               session_id={session_id}
                               isAuth={isAuth}
                               setRatingThunk={setRatingThunk}
                    />
                </div>
            );
        })}
    </div>
}

type MapStateToProps = {
    account_id: number | null,
    isAuth: boolean
}
const mapStateToProps = (state: AppRootStateType): MapStateToProps => {
    return {
        account_id: state.app.user && state.app.user.id,
        isAuth: state.app.isAuth
    }
}

type MapDispatchToProps = {
    addFavorite: (link: string, body: AddFavoriteBodyType) => void
    addWatchlist: (link: string, body: AddWatchlistBodyType) => void
    setRatingThunk: (link: string, body: { value: number }) => void
}

export default connect<MapStateToProps, MapDispatchToProps, {}, AppRootStateType>(mapStateToProps, {
    addFavorite,
    addWatchlist,
    setRatingThunk
})(MoviesHOC(MoviesList));