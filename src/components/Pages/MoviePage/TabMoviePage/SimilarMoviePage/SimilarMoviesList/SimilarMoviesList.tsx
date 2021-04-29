import React, {Component} from 'react';
import {MovieType} from '../../../../../../api/api';
import MovieItem from '../../../../../Movies/MovieItem';

type SimilarMoviesListPropsType = {
    page:number
    movies:Array<MovieType>
    session_id:string | null
    changeFavorite: (media_type: string, favorite: boolean, media_id: number) => void
    changeWatchlist: (media_type: string, watchlist: boolean, media_id: number) => void
    account_id:number | null
    isAuth:boolean
}
class SimilarMoviesList extends Component<SimilarMoviesListPropsType> {

    render() {
        const {movies =[],changeWatchlist,changeFavorite,session_id,account_id,isAuth} = this.props;
        return (
            <div className="row mt-3">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} className="col-6 col-md-4 col-lg-3 mb-4">
                            <MovieItem item={movie}
                                       changeFavorite={changeFavorite}
                                       changeWatchlist={changeWatchlist}
                                       account_id={account_id}
                                       session_id={session_id}
                                       isAuth={isAuth}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default SimilarMoviesList;