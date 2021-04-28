import React, {Component} from 'react';
import {AddFavoriteBodyType, AddWatchlistBodyType, API_KEY_3, API_URL, MovieType} from '../../api/api';
import {FilterType} from '../App';


type MoviesContainerType = {
    filters: FilterType
    page: number
    onChangePage: (value: number) => void
    movies: Array<MovieType>
    getMovies: (link: string) => void
    session_id: null | string
    addFavorite: (link: string, body: AddFavoriteBodyType) => void
    addWatchlist: (link: string, body: AddWatchlistBodyType) => void
    account_id: number | null
    isAuth:boolean
}


function MoviesHOC<T>(WrappedComponent: React.ComponentType<T>) {
    return class MoviesContainer extends Component <MoviesContainerType, {}> {

        getMovies = (page: number, primary_release_year: string = '', genres: Array<string> = ['']) => {
            const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${this.props.filters.sort_by}&page=${page}&primary_release_year=${primary_release_year}&with_genres=${genres}`;
            this.props.getMovies(link);
        }

        changeFavorite = (media_type: string, favorite: boolean, media_id: number) => {
            const addFavoriteUrl = `${API_URL}/account/${this.props.account_id}/favorite?api_key=${API_KEY_3}&session_id=${this.props.session_id}`;
            const body = {
                media_type: 'movie',
                media_id: media_id,
                favorite
            }
            this.props.addFavorite(addFavoriteUrl, body);
        }
        changeWatchlist = (media_type: string, watchlist: boolean, media_id: number) => {
            console.log(media_type, watchlist, media_id)
            const addFavoriteUrl = `${API_URL}/account/${this.props.account_id}/watchlist?api_key=${API_KEY_3}&session_id=${this.props.session_id}`;
            const body = {
                media_type: 'movie',
                media_id: media_id,
                watchlist
            }
            this.props.addWatchlist(addFavoriteUrl, body);
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
            const {movies,account_id ,session_id,isAuth} = this.props;

            if (!movies.length) {
                return <h1>Movies aren't found</h1>
            }
            // @ts-ignore
            return <WrappedComponent movies={movies} changeFavorite={this.changeFavorite}
                                     changeWatchlist={this.changeWatchlist}
                                     account_id={account_id}
                                     session_id={session_id}
                                     isAuth={isAuth}
            />
        }
    }
}

export default MoviesHOC;