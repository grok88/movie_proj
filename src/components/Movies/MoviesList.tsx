// @ts-ignore
import React, {Component} from 'react';
import MovieItem from './MovieItem';
import {API_URL, API_KEY_3, MovieType, GetMovies} from '../../api/api';
import axios from 'axios';



export default class MovieList extends Component < {}, {movies:Array<MovieType>}>{
    constructor(props:{}) {
        super(props);

        this.state = {
            movies: []
        };
    }

    componentDidMount() {
        const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=popularity.desc`;

        axios.get<GetMovies>(link).then(res => {
            console.log(res.data)
            return res.data;
        })
            .then(data => {
                this.setState({
                    movies: data.results
                });
            });
    }

    render() {
        const {movies } = this.state;
        console.log(movies)
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
