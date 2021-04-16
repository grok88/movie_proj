import React, {Component} from 'react';
import {API, API_KEY_3, API_URL, MovieType} from '../../api/api';
import {FilterType} from '../App';

type MoviesContainerType = {
    filters: FilterType
    page: number
    onChangePage: (value: number) => void
    movies: Array<MovieType>
    getMovies: (link: string) => void
    session_id: null | string
}


function MoviesHOC<T>(WrappedComponent: React.ComponentType<T>) {
    return class MoviesContainer extends Component <MoviesContainerType, {}> {

        getMovies = (page: number, primary_release_year: string = '', genres: Array<string> = ['']) => {
            const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${this.props.filters.sort_by}&page=${page}&primary_release_year=${primary_release_year}&with_genres=${genres}`;
            this.props.getMovies(link);
        }

        changeFavorite = (media_type: string, favorite: boolean, media_id: number) => {
            debugger
            const addFavoriteUrl = `${API_URL}/account/10303391/favorite?api_key=${API_KEY_3}&session_id=${this.props.session_id}`;
            const body = {
                media_type: 'movie',
                media_id: media_id,
                favorite: favorite
            }
            API.addFavorite(addFavoriteUrl, body)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err);
                })
            console.log(media_type, favorite)
        }

        componentDidMount() {
            this.getMovies(this.props.page, this.props.filters.primary_release_year, this.props.filters.with_genres);
        }


        componentDidUpdate(prevProps: Readonly<MoviesContainerType>, prevState: Readonly<{ movies: Array<MovieType> }>, snapshot?: any) {
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
            // @ts-ignore
            return <WrappedComponent movies={movies} changeFavorite={this.changeFavorite}/>
        }
    }
}

export default MoviesHOC;