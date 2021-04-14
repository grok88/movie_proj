import React from 'react';
import MovieItem from './MovieItem';
import {MovieType} from '../../api/api';
import MoviesHOC from './MoviesHOC';


type MoviesListPropsType = {
    movies: Array<MovieType>
}

const MoviesList: React.FC<MoviesListPropsType> = ({movies}) => {
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

export default MoviesHOC(MoviesList);