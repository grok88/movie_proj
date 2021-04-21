import React, {Component} from 'react';
import {MovieType} from '../../../../../../api/api';
import MovieItem from '../../../../../Movies/MovieItem';

type SimilarMoviesListPropsType = {
    page:number
    movies:Array<MovieType>
    session_id:string | null
}
class SimilarMoviesList extends Component<SimilarMoviesListPropsType> {

    render() {
        const {movies =[]} = this.props;
        console.log(movies)
        return (
            <div className="row">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} className="col-3 mb-4">
                            <MovieItem item={movie} changeFavorite={()=>{}} changeWatchlist={()=>{}}/>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default SimilarMoviesList;