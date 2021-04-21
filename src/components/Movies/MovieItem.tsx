import React from 'react';
import {API, API_KEY_3, API_URL, MovieType} from '../../api/api';
import {NavLink} from 'react-router-dom';


type MovieItemPropsType = {
    item: MovieType
    changeFavorite: (media_type: string, favorite: boolean, media_id: number) => void
    changeWatchlist: (media_type: string, watchlist: boolean, media_id: number) => void
}

export default class MovieItem extends React.Component<MovieItemPropsType, { favorite: boolean, bookmark: boolean }> {

    state = {
        favorite: false,
        bookmark: false
    }

    changeFavoriteHandler = () => {
        this.setState(prevState => ({
            favorite: !prevState.favorite
        }), () => {
            this.props.changeFavorite('movie', this.state.favorite, this.props.item.id);
        })
    }

    changeBookmarkHandler = () => {
        this.setState(prevState => ({
            bookmark: !prevState.bookmark
        }), () => {
            this.props.changeWatchlist('movie', this.state.bookmark, this.props.item.id);
        })
    }

    onShowFav = () => {
        const onShowFavUrl = `${API_URL}/account/10303391/favorite/movies?api_key=${API_KEY_3}&session_id=8a0f2e0d8b9017e414a643dc24886f4dd5ba0529&language=ru-RU`;
        API.getFavoriteList(onShowFavUrl)
            .then(res => {
                debugger
                console.log(res)
            });
    }
    onShowWatch = () => {
        const onShowFavUrl = `${API_URL}/account/10303391/watchlist/movies?api_key=${API_KEY_3}&session_id=8a0f2e0d8b9017e414a643dc24886f4dd5ba0529&language=ru-RU`;
        API.getWatchList(onShowFavUrl)
            .then(res => {
                debugger
                console.log(res)
            });
    }

    render() {
        const {item} = this.props;
        return (
            <div className="card" style={{width: '100%'}}>
                <NavLink to={`/movie/${item.id}`}>
                    <img
                        className="card-img-top card-img--height"
                        src={item.poster_path ||
                        item.backdrop_path ? `https://image.tmdb.org/t/p/w500${item.poster_path ||
                        item.backdrop_path}` : 'https://static.wikia.nocookie.net/nopixel/images/b/b4/Not-found-image-15383864787lu.jpg/revision/latest?cb=20200910062142'}
                        alt=""
                    />
                </NavLink>
                <div className="card-body">
                    <h6 className="card-title">{item.title}</h6>
                    {/*<div className="card-text"><b>Описание</b>: {item.overview}</div>*/}
                    <div className="card-text"><b>Рейтинг</b>: {item.vote_average}</div>
                    <div className="card-text">
                        <button onClick={this.onShowFav} className={'btn btn-success'}>Show favoriteList</button>
                        <button onClick={this.onShowWatch} className={'btn btn-success'}>Show WatchList</button>
                    </div>
                    <div className="card-text"><b>Favorite </b>
                        {this.state.favorite
                            ? <svg onClick={this.changeFavoriteHandler} style={{cursor: 'pointer'}}
                                   xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                   fill="currentColor"
                                   className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            : <svg onClick={this.changeFavoriteHandler} style={{cursor: 'pointer'}}
                                   xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                   fill="currentColor"
                                   className="bi bi-star" viewBox="0 0 16 16">
                                <path
                                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                            </svg>
                        }
                    </div>
                    <div className="card-text"><b>Watchlist </b>
                        {this.state.bookmark
                            ? <svg onClick={this.changeBookmarkHandler} style={{cursor: 'pointer'}}
                                   xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                   className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                                <path
                                    d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
                            </svg>
                            : <svg onClick={this.changeBookmarkHandler} style={{cursor: 'pointer'}}
                                   xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                   className="bi bi-bookmark" viewBox="0 0 16 16">
                                <path
                                    d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                            </svg>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
