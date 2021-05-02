import React, {PureComponent} from 'react';
import {AddFavoriteBodyType, AddWatchlistBodyType, API_KEY_3, API_URL, GetMovies} from '../../../api/api';
import Cookies from 'universal-cookie';
import MovieItem from '../../Movies/MovieItem';

const cookies = new Cookies();

type FavoritePropsType = {
    account_id: number | null
    session_id: string | null
    isAuth: boolean
    getFavoriteList: (link: string) => void
    favoriteMovies: GetMovies | null
    addFavorite: (link: string, body: AddFavoriteBodyType) => void
    addWatchlist: (link: string, body: AddWatchlistBodyType) => void
    statusCode: number | null
    setRatingThunk: (link: string, body: { value: number }) => void
}


class Favorite extends PureComponent<FavoritePropsType> {
    componentDidMount() {
        const session_id = cookies.get('session_id');
        if (session_id) {
            const favUrl = `${API_URL}/account/${this.props.account_id}/favorite/movies?api_key=${API_KEY_3}&session_id=${session_id}&language=ru-RU`;
            this.props.getFavoriteList(favUrl);
        }
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

    componentDidUpdate(prevProps: Readonly<FavoritePropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.statusCode === 13 && this.props.statusCode !== prevProps.statusCode) {
            const session_id = cookies.get('session_id');
            if (session_id) {
                const favUrl = `${API_URL}/account/${this.props.account_id}/favorite/movies?api_key=${API_KEY_3}&session_id=${session_id}&language=ru-RU`;
                this.props.getFavoriteList(favUrl);
            }
        }
    }

    render() {
        const {favoriteMovies, isAuth, session_id, account_id,setRatingThunk} = this.props;
        if (!isAuth) {
            return (
                <div className={'container mt-3'}>
                    <h1>You are not authorisation, please logIn</h1>
                </div>
            );
        }

        return (
            <div className={'container'}>
                <div className={'row mt-3'}>
                    {
                        favoriteMovies && favoriteMovies.results.length
                            ? favoriteMovies.results.map(favorite => {
                                return <div key={favorite.id} className="col-6   col-md-4 col-lg-3 mb-4">
                                    <MovieItem item={favorite}
                                               changeFavorite={this.changeFavorite}
                                               changeWatchlist={this.changeWatchlist}
                                               account_id={account_id}
                                               session_id={session_id}
                                               isAuth={isAuth}
                                               setRatingThunk={setRatingThunk}
                                    />
                                </div>
                            })
                            : <h1>Favorite movies not found.</h1>
                    }
                </div>
            </div>
        );
    }
}

export default Favorite;