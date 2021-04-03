import React, {Component} from 'react';
import MovieItem from './MovieItem';
import {API_KEY_3, API_URL, GetMovies, MovieType} from '../../api/api';
import axios from 'axios';
import {FilterType} from '../App';


type MovieListType = {
    filters: FilterType
    page:number
    onChangePage:(value:number) => void
}
export default class MovieList extends Component <MovieListType, { movies: Array<MovieType> }> {
    constructor(props: MovieListType) {
        super(props);

        this.state = {
            movies: []
        };
    }

    getMovies = (page:number) => {
        const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${this.props.filters.sort_by}&page=${page}`;

        axios.get<GetMovies>(link).then(res => res.data)
            .then(data => {
                this.setState({
                    movies: data.results
                });
            });
    }

    componentDidMount() {
        this.getMovies(this.props.page);
    }


    componentDidUpdate(prevProps: Readonly<MovieListType>, prevState: Readonly<{ movies: Array<MovieType> }>, snapshot?: any) {
        if (prevProps.filters.sort_by !== this.props.filters.sort_by) {
            this.getMovies(1);
            this.props.onChangePage(1);
        }
        if (prevProps.page !== this.props.page) {
            this.getMovies(this.props.page);
        }

    }

    render() {
        const {movies} = this.state;
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
