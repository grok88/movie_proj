import React from 'react';
import MovieItem from './MovieItem';
import {MovieType} from '../../api/api';


type MoviesListPropsType = {
    movies: Array<MovieType>
}

export const MoviesList: React.FC<MoviesListPropsType> = ({movies}) => {
    return <div className="row">
        {movies.map(movie => {
            return (
                <div key={movie.id} className="col-6 mb-4">
                    <MovieItem item={movie}/>
                </div>
            );
        })}
    </div>
}
