import React, {Component} from 'react';
import MovieItem from './MovieItem';
import {API_KEY_3, API_URL, GetMovies, MovieType} from '../../api/api';
import axios from 'axios';
import {FilterType} from '../App';


type MovieListType = {
    filters: FilterType
    page:number
    onChangePage:(value:number) => void
    setTotalPages : (pages: number) => void
    genres: Array<string>
}

export default class MovieList extends Component <MovieListType, { movies: Array<MovieType> }> {
    constructor(props: MovieListType) {
        super(props);

        this.state = {
            movies: [],

        };
    }

    getMovies = (page:number,primary_release_year:string = '' , genres: Array<string>=['']) => {
        const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${this.props.filters.sort_by}&page=${page}&primary_release_year=${primary_release_year}&with_genres=${genres}`;

        axios.get<GetMovies>(link).then(res => res.data)
            .then(data => {
                this.props.setTotalPages(data.total_pages);
                console.log(data)
                this.setState({
                    movies: data.results,
                });
            });
    }

    componentDidMount() {
        console.log(this.props.genres)
        this.getMovies(this.props.page, this.props.filters.primary_release_year, this.props.genres);
    }


    componentDidUpdate(prevProps: Readonly<MovieListType>, prevState: Readonly<{ movies: Array<MovieType> }>, snapshot?: any) {
        if (prevProps.filters.sort_by !== this.props.filters.sort_by) {
            this.getMovies(1,this.props.filters.primary_release_year,this.props.genres);
            this.props.onChangePage(1);
        }
        if (prevProps.page !== this.props.page) {
            this.getMovies(this.props.page,this.props.filters.primary_release_year,this.props.genres);
        }
        if (prevProps.filters.primary_release_year !== this.props.filters.primary_release_year) {
            this.getMovies(this.props.page,this.props.filters.primary_release_year,this.props.genres);
            this.props.onChangePage(1);
        }
        if (prevProps.filters.with_genres !== this.props.filters.with_genres) {
            this.getMovies(this.props.page,this.props.filters.primary_release_year,this.props.filters.with_genres);
            this.props.onChangePage(1);
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
