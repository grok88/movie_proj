import React, {Component} from 'react';
import MovieItem from './MovieItem';
import {API_KEY_3, API_URL, MovieType} from '../../api/api';
import {FilterType} from '../App';


type MovieListType = {
    filters: FilterType
    page: number
    onChangePage: (value: number) => void
    movies: Array<MovieType>
    getMovies: (link: string) => void
}


export default class MovieList extends Component <MovieListType, {}> {

    getMovies = (page: number, primary_release_year: string = '', genres: Array<string> = ['']) => {
        const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${this.props.filters.sort_by}&page=${page}&primary_release_year=${primary_release_year}&with_genres=${genres}`;
        this.props.getMovies(link);
    }

    componentDidMount() {
        this.getMovies(this.props.page, this.props.filters.primary_release_year, this.props.filters.with_genres);
    }


    componentDidUpdate(prevProps: Readonly<MovieListType>, prevState: Readonly<{ movies: Array<MovieType> }>, snapshot?: any) {
        if (prevProps.filters.sort_by !== this.props.filters.sort_by) {
            this.getMovies(1, this.props.filters.primary_release_year, this.props.filters.with_genres);
            this.props.onChangePage(1);
        }
        if (prevProps.page !== this.props.page) {
            this.getMovies(this.props.page, this.props.filters.primary_release_year, this.props.filters.with_genres);
        }
        if (prevProps.filters.primary_release_year !== this.props.filters.primary_release_year) {
            this.getMovies(this.props.page, this.props.filters.primary_release_year, this.props.filters.with_genres);
            this.props.onChangePage(1);
        }
        if (prevProps.filters.with_genres !== this.props.filters.with_genres) {
            this.getMovies(this.props.page, this.props.filters.primary_release_year, this.props.filters.with_genres);
            this.props.onChangePage(1);
        }
    }

    render() {
        const {movies} = this.props;
        if (!movies.length) {
            return <h1>Movies aren't found</h1>
        }
        return (
            <div className="row">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} className="col-6 mb-4">
                            <MovieItem item={movie}/>
                        </div>
                    );
                })}
            </div>
        );
    }
}
