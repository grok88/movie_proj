import React, {PureComponent} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {AddFavoriteBodyType, AddWatchlistBodyType, API_KEY_3, API_URL, GetMovieDetailsResp} from '../../../api/api';
import {AppRootStateType} from '../../../Store/store';
import {connect} from 'react-redux';
import {addFavorite, addWatchlist, getMovieDetails,} from '../../../Store/movieReducer';
import Poster from './Poster/Poster';
import TabMoviePage from './TabMoviePage/TabMoviePage';

type PathParamsType = {
    id: string
    movietype: string
}
type MoviePagePropsType = RouteComponentProps<PathParamsType> & MapStateToProps & MapDispatchToProps ;

class MoviePage extends PureComponent<MoviePagePropsType, { movie_id: string }> {
    state = {
        movie_id: this.props.match.params.id
    }

    componentDidMount() {
        const movie_id = this.props.match.params.id;
        const getMovieDetailsUrl = `${API_URL}/movie/${movie_id}?api_key=${API_KEY_3}&language=ru-RU`;
        this.props.getMovieDetails(getMovieDetailsUrl);
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

    componentDidUpdate(prevProps: Readonly<MoviePagePropsType>, prevState: Readonly<{}>, snapshot?: any) {
        const movie_id = this.props.match.params.id;
        if (movie_id !== this.state.movie_id) {
            const getMovieDetailsUrl = `${API_URL}/movie/${movie_id}?api_key=${API_KEY_3}&language=ru-RU`;
            this.props.getMovieDetails(getMovieDetailsUrl);
            this.setState({
                movie_id: this.props.match.params.id
            })
        }
    }

    render() {
        const {movieDetails, isAuth,} = this.props;
        const movie_id = this.props.match.params.id;
        console.log('MoviePage')

        let movietype = this.props.match.params.movietype;

        if (movietype === undefined) {
            movietype = '1';
        } else if (movietype === 'detail') {
            movietype = '1';
        } else if (movietype === 'videos') {
            movietype = '2';
        } else if (movietype === 'credits') {
            movietype = '3';
        }

        return (
            <div className={'container'}>
                <Poster movieDetails={movieDetails} isAuth={isAuth} changeFavorite={this.changeFavorite}
                        changeWatchlist={this.changeWatchlist}/>
                <TabMoviePage movie_id={movie_id} movieType={movietype}/>
            </div>
        );
    }
}


type MapStateToProps = {
    movieDetails: null | GetMovieDetailsResp
    isAuth: boolean
    account_id: number | null
    session_id: string | null

}
const mapStateToProps = (state: AppRootStateType): MapStateToProps => {
    return {
        movieDetails: state.moviePage.movieDetails,
        isAuth: state.app.isAuth,
        account_id: state.app.user && state.app.user.id,
        session_id: state.app.session_id,

    }
}

type MapDispatchToProps = {
    getMovieDetails: (link: string) => void;
    addFavorite: (link: string, body: AddFavoriteBodyType) => void
    addWatchlist: (link: string, body: AddWatchlistBodyType) => void
}


export default connect<MapStateToProps, MapDispatchToProps, {}, AppRootStateType>(mapStateToProps, {
    getMovieDetails,
    addFavorite,
    addWatchlist
})(withRouter(MoviePage));