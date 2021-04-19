import React, {Component} from 'react';
import {GetMovieDetailsResp} from '../../../../api/api';

type PosterPropsType = {
    movieDetails: null | GetMovieDetailsResp
}

class Poster extends Component<PosterPropsType, { favorite: boolean, bookmark: boolean }> {
    state = {
        favorite: false,
        bookmark: false
    }


    changeFavoriteHandler = () => {
        this.setState(prevState => ({
            favorite: !prevState.favorite
        }), () => {
            console.log(this.state.favorite)
            // this.props.changeFavorite('movie', this.state.favorite, this.props.item.id);
        })
    }
    changeBookmarkHandler = () => {
        this.setState(prevState => ({
            bookmark: !prevState.bookmark
        }))
    }

    render() {
        const {movieDetails} = this.props;
        const backdrop_url = `https://image.tmdb.org/t/p/w500/${movieDetails && movieDetails.backdrop_path}`
        return <div className="movie_page_main"
                    style={{backgroundImage: `url(${backdrop_url})`}}>
            <div className={'pt-3 pb-3 pl-4 pr-4 movie_page_container'}>
                <section className={'movie_page_section '}>
                    <div className="row mt-4">
                        <div className="col-3 movie_page_poster_block">
                            <div className="movie_page_poster_img">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movieDetails && movieDetails.poster_path}`}
                                    alt=""/>
                            </div>
                        </div>
                        <div className="col-md ">
                            <section className="movie_page_section_info">
                                <div className="movie_page_title">
                                    <h2>{movieDetails && movieDetails.title}</h2>
                                    <div className="movie_page_facts">
                                        {/*<span className="movie_page_certification">1</span>*/}
                                        <span
                                            className="movie_page_release">{movieDetails && movieDetails.release_date.replaceAll('-', '/')}</span>
                                        <span
                                            className="movie_page_genres">{movieDetails && movieDetails.genres.map(g =>
                                            <b key={g.id}>{g.name} </b>)}</span>
                                        <span
                                            className="movie_page_runtime">{movieDetails && movieDetails.runtime} m</span>
                                    </div>
                                    <div className="movie_page_favorite"><b>Favorite </b>
                                        {this.state.favorite
                                            ? <svg onClick={this.changeFavoriteHandler}
                                                   style={{cursor: 'pointer'}}
                                                   xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                   fill="currentColor"
                                                   className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                            : <svg onClick={this.changeFavoriteHandler}
                                                   style={{cursor: 'pointer'}}
                                                   xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                   fill="currentColor"
                                                   className="bi bi-star" viewBox="0 0 16 16">
                                                <path
                                                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                            </svg>
                                        }
                                    </div>
                                    <div className="movie_page_watchlist"><b>Watchlist </b>
                                        {this.state.bookmark
                                            ? <svg onClick={this.changeBookmarkHandler}
                                                   style={{cursor: 'pointer'}}
                                                   xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                   fill="currentColor"
                                                   className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
                                            </svg>
                                            : <svg onClick={this.changeBookmarkHandler}
                                                   style={{cursor: 'pointer'}}
                                                   xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                   fill="currentColor"
                                                   className="bi bi-bookmark" viewBox="0 0 16 16">
                                                <path
                                                    d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                                            </svg>
                                        }
                                    </div>
                                    <div className="movie_page_info">
                                        <h3 className={'movie_page_info_tagline'}>{movieDetails && movieDetails.tagline}</h3>
                                        <h3 className={'movie_page_info_review'}>Обзор</h3>
                                        <div className="movie_page_info_overview">
                                            <p>{movieDetails && movieDetails.overview}</p>
                                        </div>
                                        <div className={'movie_page_info_vote'}>
                                            Рейтинг пользователей: {movieDetails && movieDetails.vote_average}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    }
}

export default Poster;